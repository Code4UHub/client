import { StudentModule, Module } from 'types/Module/Module';

export const data: (StudentModule | Module)[] = [
  {
    title: 'Introducción a la programación',
    isOpen: true,
    percentage: 90,
  },
  {
    title: 'Problemas con cálculos',
    isOpen: true,
    percentage: 59,
  },
  {
    title: 'Programación modular',
    isOpen: true,
    percentage: 25,
  },
  {
    title: 'Estructuras de decisión',
    isOpen: false,
  },
  {
    title: 'Estructuras de repetición',
    isOpen: false,
  },
  {
    title: 'Datos estructurados',
    isOpen: false,
  },
  {
    title: 'Archivos',
    isOpen: false,
  },
];
