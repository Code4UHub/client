const modules = [
  {
    id: '1',
    name: 'Introducción a la programación',
    percentage: 75,
  },
  {
    id: '2',
    name: 'Problemas con cálculo',
    percentage: 50,
  },
  {
    id: '3',
    name: 'Programación modular',
    percentage: 15,
  },
  {
    id: '4',
    name: 'Estructuras de decisión',
    percentage: 10,
  },
];

export type ModuleList = typeof modules;

export const getDummyData = (): Promise<ModuleList> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(modules);
    }, 5000);
  });
