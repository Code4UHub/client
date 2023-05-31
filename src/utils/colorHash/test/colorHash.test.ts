import { colorHash } from '../colorHash';

// For the first version of Code4U, this is a fixed function that should not be modified
// Therefore, the values should be the same over modifications
describe('Color hash value', () => {
  const m1: string = 'Bases de Datos Avanzadas';
  const m2: string = 'Programación Orientada a Objetos';
  const m3: string = 'Requerimientos de Software';
  test(m1, () => {
    expect(colorHash(m1)).toBe('#d7e6d1');
  });
  test(m2, () => {
    expect(colorHash(m2)).toBe('#b3f7ec');
  });
  test(m3, () => {
    expect(colorHash(m3)).toBe('#cedcd5');
  });
});
