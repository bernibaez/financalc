import { money } from '../utils/finance.js';

export default function ResultCard({ result }) {
  if (!result) {
    return (
      <section className="panel empty" aria-live="polite">
        <div className="empty-icon">▤</div>
        <h2>Tu resultado aparecerá aquí</h2>
        <p>Completa los campos y pulsa Calcular.</p>
      </section>
    );
  }

  return (
    <section className="panel results" aria-live="polite">
      <h2>Resultado de tu simulación</h2>
      <div className="hero-result">
        <span>{result.mainLabel}</span>
        <strong>{money(result.main)}</strong>
      </div>
      <div className="metric">
        <span>Monto total</span>
        <strong>{money(result.total)}</strong>
      </div>
      <div className="metric">
        <span>Intereses generados / pagados</span>
        <strong>{money(result.interest)}</strong>
      </div>
      <p className="disclaimer">
        Simulación educativa. No incluye comisiones, impuestos, seguros ni otros cargos.
      </p>
    </section>
  );
}
