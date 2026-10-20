# FinanCalc — Calculadora financiera

Aplicación web educativa hecha con **React + Vite + JavaScript + CSS** (diseño mobile first).
Permite simular cuatro modalidades: **préstamo**, **interés simple**, **interés compuesto** y **ahorro**, con importes en pesos dominicanos (RD$).

## Requisitos

- Node.js (versión LTS)
- Visual Studio Code (recomendado)

## Instalación y ejecución

```bash
npm install
npm run dev
```

Vite mostrará una dirección local, normalmente http://localhost:5173.

Otros comandos:



## Estructura

```
src/
  main.jsx               Punto de entrada
  App.jsx                Estado y coordinación
  styles.css             Diseño mobile first
  components/
    Header.jsx           Encabezado
    CalculatorTabs.jsx   Selector de modalidad
    CalculatorForm.jsx   Formulario
    NumberField.jsx      Campo reutilizable (input controlado)
    ResultCard.jsx       Resultados
  utils/
    finance.js           Fórmulas y formato de moneda
    finance.test.js      Pruebas
```

Los cálculos viven en `utils/finance.js`, que no importa React: la lógica matemática está separada de los componentes visuales.

## Fórmulas

- **Interés simple:** interés = capital × tasa × años; total = capital + interés.
- **Interés compuesto / ahorro:** total = capital × (1 + tasa/12)^(12 × años), capitalización mensual y un único depósito.
- **Préstamo:** cuota = capital × i / [1 − (1 + i)^(−n)], con i = tasa/12 y n = años × 12 (redondeado). Si la tasa es 0, cuota = capital / n.

## Validaciones

Se exige capital y plazo mayores que cero y tasa no negativa; si no se cumple, se muestra un mensaje de error comprensible.

## Casos de prueba de la guía

| Caso | Entrada | Resultado esperado |
|---|---|---|
| Interés simple | P=1000, r=12%, t=2 | Interés RD$ 240; total RD$ 1240 |
| Compuesto | P=1000, r=0%, t=2 | Total RD$ 1000 |
| Préstamo | P=1200, r=0%, t=1 | Cuota RD$ 100 |
| Validación | P=-100, r=12%, t=2 | Mostrar error |
| Limpiar | Cambiar valores y limpiar | Restablecer campos |

## Aviso

Son simulaciones educativas. No incorporan seguros, impuestos, comisiones, cambios de tasa ni costos contractuales.
