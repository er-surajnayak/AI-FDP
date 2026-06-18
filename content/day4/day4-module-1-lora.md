# Module 1 — Fine-Tuning with LoRA

> *"You don't re-educate a brilliant graduate to teach them one new thing. You hand them a few sticky notes. That's LoRA."*

---

## 2. Estimated Duration
**55 minutes** — 15 min on the big idea and the parameter math, 30 min walking the Colab notebook cell by cell, 10 min on what changed and the LoRA → QLoRA bridge.

## 3. Learning Objectives
- Explain **why** full fine-tuning is wasteful, and how LoRA trains a tiny "correction" instead of the whole model.
- Read a real **LoRA fine-tuning notebook** end to end — load, configure, attach, train, save, test.
- Understand **ΔW = B·A**, the meaning of **rank (r)** and **alpha**, and why only the adapters are saved.

## 4. Teaching Content

### The big picture: what are we trying to do?

There are three ways to make a model learn something new, and they form a ladder:

```text
Full Fine-Tuning
       ↓
     LoRA
       ↓
    QLoRA
```

We'll climb it in order. Full fine-tuning is the brute-force baseline; **LoRA** is the clever optimisation of it; **QLoRA** (next module) is an optimisation of LoRA.

Picture a brilliant **graduate student** — that's our pretrained LLM. They already know English, programming, science, mathematics. But there's one thing they've never seen:

```text
   Graduate Student   =   Pretrained LLM
   already knows:         English, code, science, maths
   doesn't know:          "ABC University's admission process"
```

We want to teach that one new thing **without making them relearn everything**. Re-educating the whole student to add one fact is absurd — and that's exactly what full fine-tuning does. LoRA is the sticky-note approach.

### Why not just fine-tune everything?

A single weight matrix in a transformer might be `4096 × 4096` — that's **16 million** numbers. A real model has hundreds of these. Full fine-tuning updates *all* of them: billions of parameters, a serious GPU, lots of time, and a fresh multi-gigabyte copy of the model every time you change anything.

LoRA's insight is that the *change* you need to teach a narrow new skill is small and simple — so you don't have to touch the giant matrix at all. The diagram above ("The big picture") shows the whole mechanism; here is the idea in words.

Instead of editing the frozen weight `W`, LoRA learns a **low-rank correction** built from two small matrices:

```text
ΔW = A × B          A = 4096 × 8        B = 8 × 4096
```

Train just `A` and `B`:

```text
65,536 parameters     instead of     16,000,000
```

At the end, the model behaves as if its weight were `W′ = W + ΔW`. The original `W` never changes — you've added sticky notes, not rewritten the textbook. Now let's see it in a real notebook.

### Cell 1 — Install the tools

```python
!pip install -q transformers datasets peft trl accelerate
```

Just like a classroom needs a teacher, whiteboard, and projector, fine-tuning needs a toolkit:

| Library        | Purpose               |
| -------------- | --------------------- |
| `transformers` | load the LLM          |
| `datasets`     | hold the training data|
| `peft`         | the LoRA implementation |
| `trl`          | the fine-tuning trainer |
| `accelerate`   | GPU support           |

### Cell 2 — Load the model and tokenizer

```python
from transformers import AutoTokenizer, AutoModelForCausalLM

model_name = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name, device_map="auto")
```

The **tokenizer** is a translator: the model doesn't read text, it reads numbers, so `"Hello"` becomes something like `[15043]`. The **model** is our experienced graduate — already trained on billions of words. And `device_map="auto"` quietly puts it on the GPU, because `CPU = slow, GPU = fast`.

### Cell 3 — Test *before* training

```python
prompt = "What is the admission process of ABC University?"
inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
output = model.generate(**inputs, max_new_tokens=100)
print(tokenizer.decode(output[0], skip_special_tokens=True))
```

This establishes a **baseline** — *what does the student know right now?* Since the model has never seen ABC University, it does what models do when they don't know: it produces a confident, generic, or outright **hallucinated** answer. Keep that reply; it's the "before" picture we'll compare against.

### Cell 4 — Create the dataset

```python
data = [
  {"instruction": "What is the admission process of ABC University?",
   "response":    "Students must apply online."},
  {"instruction": "What courses are offered?",
   "response":    "Engineering, Management and Science."},
]
```

This is the teaching material — a tiny **question bank plus answer key**, exactly the notes a teacher prepares before class.

### Cell 5 — Format the dataset

```python
def format_example(example):
    text = f"""### Instruction:
{example['instruction']}
### Response:
{example['response']}
"""
    return {"text": text}
```

Models learn **patterns**, so instead of loose question-and-answer text, we give every example the same structure — a clear `### Instruction:` then `### Response:`. Think well-organised notes instead of a pile of loose papers; the consistent shape is what the model latches onto.

### Cell 6 — A quick word on the LoRA mechanism

Before configuring it, hold the picture in mind: the big `W` stays **frozen**, and LoRA learns `ΔW = A × B` beside it. Train ~65K parameters, not 16M. With that, the configuration cell reads like plain English.

### Cell 7 — Configure LoRA

```python
from peft import LoraConfig

lora_config = LoraConfig(
    r=8,
    lora_alpha=16,
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM",
)
```

Three dials matter here:

- **`r = 8` (rank)** controls the adapter's *size* — think notebook pages. A small notebook is `r = 4`; a big one is `r = 64`. More rank means more learning capacity, but more memory.
- **`lora_alpha = 16`** controls the adapter's *influence* — like a teacher's microphone volume. Turn it up and the LoRA correction has a stronger effect on the output.
- **`lora_dropout = 0.05`** randomly ignores 5% of the adapter connections during training, which discourages the model from simply memorising and helps it generalise.

### Cell 8 — Attach LoRA

```python
from peft import get_peft_model
model = get_peft_model(model, lora_config)
```

This is the magic cell. Before, you had a plain `LLM`; after, you have `LLM + LoRA adapters`. Inside each transformer layer, the original weight sits **frozen** while a small **trainable** adapter rides alongside it:

```text
   Original weight  →  frozen
   LoRA adapter     →  trainable
```

### Cell 9 — Show the trainable parameters

```python
model.print_trainable_parameters()
# Trainable: ~2M   Total: 1.1B   (~0.2%)
```

This is LoRA's headline. The model has **1.1 billion** parameters, and you're training roughly **two million** of them — about **0.2%**. Almost everything stays frozen; a sliver does the learning.

### Cell 10 — Training arguments

```python
from transformers import TrainingArguments

training_args = TrainingArguments(
    output_dir="./lora-output",
    per_device_train_batch_size=2,
    num_train_epochs=5,
    learning_rate=2e-4,
    logging_steps=1,
)
```

These are the classroom rules. **`num_train_epochs=5`** means the model reads the notebook five times. **`learning_rate=2e-4`** controls how much it corrects itself after each mistake — when the teacher says *"that's wrong,"* how big an adjustment should the student make? Too big and it overshoots; too small and it barely learns.

### Cell 11 — The trainer

```python
from trl import SFTTrainer

trainer = SFTTrainer(
    model=model,
    train_dataset=dataset,
    args=training_args,
)
```

The trainer *is* the teacher. It asks the questions, checks the answers, calculates how wrong they were (the **loss**), and updates the LoRA adapters accordingly.

### Cell 12 — Train

```python
trainer.train()
```

This is where learning happens, one loop at a time:

```text
Question → Prediction → Compare with answer → Error → Update LoRA → repeat
```

Early on, the model predicts *"Apply offline,"* the correct answer is *"Apply online,"* the error is high, and the adapter adjusts. A few rounds later it predicts *"Apply online,"* the error is low — learning happened. The lab below lets you watch exactly this loop converge.

### Cell 13 — Save the model

```python
model.save_pretrained("abc_university_lora")
tokenizer.save_pretrained("abc_university_lora")
```

A crucial point for any faculty member: you are **not** saving the entire 1.1B-parameter model. You're saving **only the LoRA adapters** — the sticky notes, not the textbook. That's why a fine-tune is a few megabytes instead of several gigabytes, and why you can keep dozens of them.

### Cell 14 — Test *after* training

```python
prompt = "What is the admission process of ABC University?"
inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
output = model.generate(**inputs, max_new_tokens=100)
print(tokenizer.decode(output[0], skip_special_tokens=True))
```

Ask the very same question again. Where the "before" answer was a hallucination, the "after" answer is the one you taught: **"Students must apply online."** Same model, same prompt — the only difference is the tiny adapter.

### What actually changed?

Not the whole LLM. Only this:

```text
   New weight  W′ = W + ΔW       where   ΔW = A × B
```

The frozen pretrained weights, plus a small learned correction. That single equation is the whole of LoRA.

### The complete flow

```text
Pretrained LLM → freeze original weights → attach LoRA adapters
   → train only the adapters → save only the adapters → fine-tuned model
```

And the comparison that makes faculty sit up:

| Method           | Trainable parameters                          |
| ---------------- | --------------------------------------------- |
| Full fine-tuning | 100%                                          |
| LoRA             | ~0.1%–1%                                       |
| QLoRA            | ~0.1%–1% (but the base model is 4-bit compressed) |

The one-line takeaway: **LoRA doesn't retrain the model — it learns a small correction layer (ΔW) added to the frozen pretrained weights. QLoRA does the same thing on a compressed 4-bit version of the model, making it cheaper still.** That bridge is exactly where the next module begins.

## 6. Analogies

- **The graduate student.** A pretrained model is a brilliant graduate who knows almost everything — except your one local fact. You don't send them back to school; you teach the single new thing and leave the rest untouched.

- **Sticky notes, not a rewrite.** Full fine-tuning rewrites the entire textbook to add one correction. LoRA slaps a few sticky notes on the relevant pages. The book is unchanged; the notes carry the new knowledge — and you only ever save the notes.

- **Notebook size and microphone volume.** Rank `r` is how many pages the adapter's notebook has (capacity); `alpha` is how loud the adapter speaks (influence). Small notebook, right volume, and a narrow skill is learned cheaply.

## 7. Faculty Examples 🏫
- Fine-tune a small open model on a **department FAQ or course handbook** so it answers student questions in your institution's exact terms — trainable on a free Colab GPU.
- Adapt a base model to a **specific syllabus or marking scheme**, so its explanations and feedback stay inside your course's scope and vocabulary.
- Keep one base model and a shelf of **per-course adapters**, swapping the few-megabyte sticky notes instead of hosting many full models.

## 8. Research Examples 🔬
- Adapt a base model to a **lab's domain terminology and writing style** using a modest corpus, without a GPU cluster or a multi-gigabyte checkpoint.
- **Share a fine-tune as a tiny adapter file** with collaborators, who load it on top of the same public base model — reproducible and lightweight.
- Train **separate adapters for separate tasks or datasets** from the same frozen model, comparing them cleanly because only the adapter differs.

## 9. Industry Examples 💼
- Maintain **one base model with many client- or task-specific adapters**, cheap to train and trivial to store, swapped per request.
- Customise tone, format, or domain knowledge for a product **without the cost and risk of touching the full model weights**.
- Iterate quickly: a new adapter trains in minutes-to-hours on modest hardware, so a customisation can ship the same day.

## 13. Hands-on Activity ✋

Sit with the parameter math, because it's the heart of the method. A `4096 × 4096` weight holds about 16.7 million numbers. LoRA replaces the *update* to that weight with two slim matrices — `A` of shape `4096 × 8` and `B` of shape `8 × 4096` — totalling `2 × 4096 × 8 = 65,536` trainable numbers. That's roughly **0.4%** of the full matrix, and the gap only widens across a whole model.

Why can such a tiny correction be enough? Because the *change* needed to learn a narrow new behaviour is itself simple — mathematically, it's *low-rank*. You're not teaching the model language from scratch; you're nudging a model that already knows almost everything toward one small new pattern. A low-rank nudge is plenty, which is exactly why LoRA works as well as it does while training a rounding error's worth of parameters.

## 14. Demonstration Ideas

The single most convincing moment is `print_trainable_parameters()`. On screen, a 1.1-billion-parameter model reports that only about two million parameters — **0.2%** — will actually train. Everything else is frozen. That one line reframes fine-tuning from "an expensive, GPU-cluster affair" into "something a faculty member can run in a free notebook."

The second is the before-and-after. Ask *"What is the admission process of ABC University?"* before training and the model invents a plausible, wrong answer. Run five short epochs — watching the predicted answer drift from *"Apply offline"* toward *"Students must apply online"* as the loss falls — then ask again. Same model, same prompt, but now it answers correctly, and the entire learned difference is a few-megabyte adapter file you could email.

## 15. Quiz Questions ❓

**Q1 (MCQ).** In LoRA, what actually gets trained?
- A) Every weight in the model, just more slowly
- B) **A small pair of low-rank matrices (the adapter), while the original weights stay frozen** ✅
- C) The tokenizer's vocabulary
- D) Only the final output layer
*Explanation:* LoRA freezes the pretrained weights and trains only the small matrices A and B, whose product ΔW = B·A is added as a correction.

**Q2 (MCQ).** A weight matrix is 4096 × 4096 (about 16M parameters). With LoRA rank r = 8, roughly how many parameters does LoRA train for it?
- A) About 16 million (all of them)
- B) About 4 million
- C) **About 65,000 (2 × 4096 × 8)** ✅
- D) Exactly 8
*Explanation:* LoRA adds A (4096×8) and B (8×4096), so 2 × 4096 × 8 = 65,536 trainable parameters — a fraction of a percent of the full matrix.

**Q3 (Conceptual).** What does the rank `r` control, and what is the trade-off in raising it? *Answer:* Rank controls the adapter's capacity — how much it can learn ("notebook size"). A higher r can capture more complex changes but uses more memory and trains more parameters; for narrow tasks a small r is usually enough, so bigger isn't automatically better.

**Q4 (MCQ).** When you save a LoRA fine-tune, what is written to disk?
- A) A fresh full copy of the 1.1B-parameter model
- B) **Only the small LoRA adapters (a few megabytes)** ✅
- C) The training dataset
- D) Nothing — LoRA can't be saved
*Explanation:* Only the adapters are saved — the "sticky notes," not the whole "textbook" — which is why a fine-tune is megabytes, not gigabytes.

**Q5 (Conceptual).** Explain `W′ = W + ΔW` and `ΔW = B·A` in plain words. *Answer:* The original pretrained weight W is frozen. LoRA learns a small low-rank correction ΔW, formed by multiplying two slim trainable matrices B and A. At inference the model behaves as if its weight were W plus that correction — so the base knowledge is untouched and the adapter carries the new behaviour.

**Q6 (MCQ).** How does QLoRA differ from plain LoRA?
- A) It trains all the model's parameters
- B) It removes the need for a dataset
- C) **It uses the same adapter idea, but on a base model compressed to 4-bit, cutting memory further** ✅
- D) It replaces the tokenizer
*Explanation:* QLoRA keeps LoRA's frozen-base-plus-small-adapter approach but quantises the frozen base model to 4-bit, so the same fine-tune fits on much smaller hardware.

## 16. Common Misconceptions ⚠️
- **"LoRA retrains the whole model."** It doesn't. The pretrained weights are frozen; LoRA trains only a small adapter — typically 0.1–1% of the parameters. The base model's knowledge is never overwritten.
- **"LoRA edits the original weights."** No — the original W stays frozen. LoRA learns a separate correction ΔW that is *added* on top (W′ = W + ΔW), which is why you can remove or swap an adapter and get the base model back.
- **"A higher rank is always better."** More rank means more capacity *and* more memory, with diminishing returns. Narrow tasks often learn fine at r = 8 or even less; raising r blindly just costs more.
- **"To share a fine-tune you must share the full model."** You share only the adapter — a few megabytes — and the recipient loads it on top of the same public base model.

## 17. Key Takeaways
- **Full fine-tuning updates 100% of the weights; LoRA updates ~0.1–1%** by freezing the base and training a tiny adapter.
- LoRA learns **ΔW = B·A**, a low-rank correction, and the model acts as **W′ = W + ΔW** — the original weights never change.
- **Rank `r`** sets the adapter's capacity and **`alpha`** sets its influence; small values go a long way for narrow tasks.
- **Only the adapters are saved** — megabytes of "sticky notes," not a gigabyte "textbook" — so you can keep and swap many.
- **QLoRA is LoRA on a 4-bit-compressed base model** — the same correction-layer idea, made cheaper to run, and exactly where the next module picks up.
