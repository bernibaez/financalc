import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import CalculatorTabs from './components/CalculatorTabs.jsx';
import CalculatorForm from './components/CalculatorForm.jsx';
import ResultCard from './components/ResultCard.jsx';
import { calculate } from './utils/finance.js';

const initial = { principal: '100000', rate: '12', years: '2' };

export default function App() {
  const [type, setType] = useState('loan');
  const [values, setValues] = useState({ ...initial });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'FinanCalc | Calculadora financiera';
  }, []);

  const changeType = (next) => {
    setType(next);
    setResult(null);
    setError('');
  };

  const changeField = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setResult(null);
    setError('');
  };

  const submit = (event) => {
    event.preventDefault();
    try {
      setResult(calculate(type, values.principal, values.rate, values.years));
      setError('');
    } catch (err) {
      setResult(null);
      setError(err.message);
    }
  };

  const reset = () => {
    setValues({ ...initial });
    setResult(null);
    setError('');
  };

  return (
    <>
      <Header />
      <main className="shell">
        <div className="intro">
          <span className="eyebrow">HERRAMIENTAS FINANCIERAS</span>
          <h1>Calcula con confianza</h1>
          <p>Explora tus préstamos, intereses y ahorros en segundos.</p>
        </div>
        <CalculatorTabs value={type} onChange={changeType} />
        {error && <p className="error" role="alert">{error}</p>}
        <div className="layout">
          <CalculatorForm
            type={type}
            values={values}
            onFieldChange={changeField}
            onSubmit={submit}
            onReset={reset}
          />
          <ResultCard result={result} />
        </div>
      </main>
      <footer className="shell footer">
        FinanCalc · Proyecto educativo desarrollado con React JS
      </footer>
    </>
  );
}
