import NumberField from './NumberField.jsx';

export default function CalculatorForm({ values, onFieldChange, onSubmit, onReset, type }) {
  return (
    <form onSubmit={onSubmit} className="panel form">
      <h2>Datos de la simulación</h2>
      <NumberField
        id="principal"
        label="Capital inicial (RD$)"
        value={values.principal}
        onChange={(v) => onFieldChange('principal', v)}
      />
      <NumberField
        id="rate"
        label="Tasa de interés anual (%)"
        value={values.rate}
        onChange={(v) => onFieldChange('rate', v)}
      />
      <NumberField
        id="years"
        label="Plazo (años)"
        value={values.years}
        onChange={(v) => onFieldChange('years', v)}
        hint={
          type === 'loan'
            ? 'Ejemplo: 1.5 equivale a 18 meses.'
            : 'Puedes utilizar decimales, por ejemplo 2.5 años.'
        }
      />
      <div className="actions">
        <button className="primary" type="submit">Calcular</button>
        <button className="secondary" type="button" onClick={onReset}>Limpiar</button>
      </div>
    </form>
  );
}
