import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculate } from './finance.js';

const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} no es igual a ${b}`);

test('Interés simple: P=1000, r=12%, t=2', () => {
  const res = calculate('simple', 1000, 12, 2);
  close(res.interest, 240);
  close(res.total, 1240);
});

test('Interés compuesto con tasa 0%: total = capital', () => {
  const res = calculate('compound', 1000, 0, 2);
  close(res.total, 1000);
  close(res.interest, 0);
});

test('Préstamo con tasa 0%: cuota = capital / meses', () => {
  const res = calculate('loan', 1200, 0, 1);
  close(res.main, 100);
});

test('Préstamo con interés: el total supera al capital', () => {
  const res = calculate('loan', 100000, 12, 2);
  assert.ok(res.main > 0 && res.total > 100000);
});

test('Validación: capital negativo lanza error', () => {
  assert.throws(() => calculate('simple', -100, 12, 2));
});

test('Validación: tasa negativa, plazo cero y campos vacíos lanzan error', () => {
  assert.throws(() => calculate('loan', 1000, -1, 2));
  assert.throws(() => calculate('loan', 1000, 12, 0));
  assert.throws(() => calculate('loan', '', 12, 2));
});

test('Tipo desconocido lanza error', () => {
  assert.throws(() => calculate('otro', 1000, 12, 2));
});
