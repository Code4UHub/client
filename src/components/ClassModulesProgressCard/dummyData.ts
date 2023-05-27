const modules = [
  {
    id: '1',
    name: 'Introducción a la programación',
    percentage: 75,
    students: 24,
  },
  {
    id: '2',
    name: 'Problemas con cálculo',
    percentage: 50,
    students: 16,
  },
  {
    id: '3',
    name: 'Programación modular',
    percentage: 12.5,
    students: 4,
  },
  {
    id: '4',
    name: 'Estructuras de decisión',
    percentage: 25,
    students: 8,
  },
];

export type ModuleList = typeof modules;

export const getDummyData = (): Promise<ModuleList> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(modules);
    }, 5000);
  });
