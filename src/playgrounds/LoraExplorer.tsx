import { useEffect, useMemo, useRef, useState } from 'react';
import InteractiveLab from '../components/InteractiveLab';

const fmt = (n: number) => {
  if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return String(n);
};

// The training loop converges: a wrong, hallucinated answer → the taught one.
const EPOCHS = [
  { pred: 'Apply offline at the campus office.', loss: 2.4 },
  { pred: 'Apply offline… or maybe online.', loss: 1.5 },
  { pred: 'Apply online.', loss: 0.8 },
  { pred: 'Students apply online.', loss: 0.4 },
  { pred: 'Students must apply online.', loss: 0.12 },
];

export default function LoraExplorer() {
  const [dim, setDim] = useState(4096);
  const [rank, setRank] = useState(8);

  const full = dim * dim; // one weight matrix, full fine-tuning
  const lora = 2 * dim * rank; // A (d×r) + B (r×d)
  const pct = (lora / full) * 100;
  const reduction = full / lora;

  // ── training-loop animation ──
  const [epoch, setEpoch] = useState(-1);
  const [training, setTraining] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const train = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setTraining(true);
    setEpoch(-1);
    EPOCHS.forEach((_, i) => timers.current.push(setTimeout(() => setEpoch(i), (i + 1) * 700)));
    timers.current.push(setTimeout(() => setTraining(false), (EPOCHS.length + 1) * 700));
  };
  const cur = epoch >= 0 ? EPOCHS[epoch] : null;
  const maxLoss = EPOCHS[0].loss;

  const barFull = 100;
  const barLora = useMemo(() => Math.max(0.6, (lora / full) * 100), [lora, full]);

  return (
    <InteractiveLab
      name="Lab · LoRA Explorer"
      hint="See how little a model actually has to learn — then watch a tiny adapter train."
      note={<><b>The LoRA selling point in one screen.</b> Full fine-tuning updates every weight; LoRA freezes them and trains a tiny pair of matrices beside each one. The savings are not subtle.</>}
    >
      {/* ── Parameter explorer ── */}
      <div className="difp-sub">How many parameters actually train?</div>
      <div className="difp-row" style={{ gap: '1.6rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
        <div className="difp-slider" style={{ maxWidth: 260 }}>
          <label>Weight matrix size (d × d)</label>
          <input type="range" min={1024} max={8192} step={1024} value={dim} onChange={(e) => setDim(+e.target.value)} />
          <span className="difp-slider__val">{dim} × {dim}</span>
        </div>
        <div className="difp-slider" style={{ maxWidth: 260 }}>
          <label>LoRA rank (r)</label>
          <input type="range" min={1} max={128} step={1} value={rank} onChange={(e) => setRank(+e.target.value)} />
          <span className="difp-slider__val">r = {rank}</span>
        </div>
      </div>

      <div className="difp-lora__bars">
        <div className="difp-lora__barrow">
          <span className="difp-lora__blabel">Full fine-tuning</span>
          <span className="difp-lora__bar"><span style={{ width: `${barFull}%`, background: 'var(--c-pink)' }} /></span>
          <span className="difp-lora__bval">{fmt(full)}</span>
        </div>
        <div className="difp-lora__barrow">
          <span className="difp-lora__blabel">LoRA (A + B)</span>
          <span className="difp-lora__bar"><span style={{ width: `${barLora}%`, background: 'var(--c-green)' }} /></span>
          <span className="difp-lora__bval">{fmt(lora)}</span>
        </div>
      </div>

      <div className="difp-lora__stat">
        <div><b>{pct < 0.1 ? pct.toFixed(3) : pct.toFixed(2)}%</b><span>of the weights train</span></div>
        <div><b>{reduction >= 1000 ? fmt(reduction) : Math.round(reduction)}×</b><span>fewer parameters</span></div>
        <div><b>{fmt(full - lora)}</b><span>weights stay frozen</span></div>
      </div>
      <p className="difp-lab__hint" style={{ marginTop: '0.5rem' }}>
        W is <b>frozen</b> at {dim}×{dim}. LoRA only trains <b>A</b> ({dim}×{rank}) and <b>B</b> ({rank}×{dim}) — their product ΔW = B·A is the correction added back as W′ = W + ΔW.
      </p>

      {/* ── Training loop ── */}
      <div className="difp-sub" style={{ marginTop: '1.4rem' }}>Watch the adapter learn</div>
      <button className="difp-btn" style={{ marginBottom: '0.8rem' }} onClick={train} disabled={training}>
        {training ? 'Training…' : epoch >= 0 ? 'Train again ↺' : 'Run training →'}
      </button>

      {epoch >= 0 && (
        <div className="difp-lora__train">
          <div className="difp-lora__epoch">
            <span>Epoch {epoch + 1} / {EPOCHS.length}</span>
            <span className="difp-lora__loss">loss {cur!.loss.toFixed(2)}</span>
          </div>
          <div className="difp-lora__lossbar"><span style={{ width: `${(cur!.loss / maxLoss) * 100}%` }} /></div>
          <div className="difp-lora__io">
            <div className="difp-lora__q">Q: “What is the admission process of ABC University?”</div>
            <div className={`difp-lora__a ${epoch === EPOCHS.length - 1 ? 'good' : ''}`}>
              {cur!.pred}
              {epoch === EPOCHS.length - 1 && <span className="difp-lora__tick"> ✓ learned</span>}
            </div>
          </div>
        </div>
      )}
    </InteractiveLab>
  );
}
