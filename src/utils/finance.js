// Todas las tasas se expresan como porcentaje anual (ej.: 12 significa 12%).
export const money = (amount) =>
  new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' }).format(amount);

export function calculate(type, principal, annualRate, years) {
  const P = Number(principal);
  const r = Number(annualRate) / 100;
  const t = Number(years);

  if (![P, r, t].every(Number.isFinite) || P <= 0 || r < 0 || t <= 0) {
    throw new Error('Introduce un capital y plazo mayores que cero y una tasa no negativa.');
  }

  if (type === 'simple') {
    const interest = P * r * t;
    return { main: interest, mainLabel: 'Interés generado', total: P + interest, interest };
  }

  if (type === 'compound' || type === 'savings') {
    // Capitalización mensual, sin aportes adicionales.
    const total = P * Math.pow(1 + r / 12, 12 * t);
    return {
      main: total,
      mainLabel: type === 'savings' ? 'Ahorro proyectado' : 'Monto futuro',
      total,
      interest: total - P,
    };
  }

  if (type === 'loan') {
    const months = Math.round(t * 12);
    if (months < 1) throw new Error('El plazo debe ser de al menos un mes.');
    const monthlyRate = r / 12;
    const payment =
      monthlyRate === 0
        ? P / months
        : (P * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    const total = payment * months;
    return { main: payment, mainLabel: 'Cuota mensual', total, interest: total - P };
  }

  throw new Error('Selecciona un cálculo válido.');
}
