import React from 'react';
import GoToActivityCard from 'components/GoToActivityCard/GoToActivityCard';

type Props = {
  className?: string;
};

export default function ContinueActivityCard({ className }: Props) {
  return (
    <GoToActivityCard
      className={className}
      cardTitle="Continúa donde te quedaste..."
      moduleName="Módulo 4: Estructuras de decisión"
      activityName="4.1 Expresiones Lógicas: Desafío Fácil"
      activityProgress="2 / 7 preguntas"
      actionLabel="Continuar"
      to="/"
    />
  );
}

ContinueActivityCard.defaultProps = {
  className: '',
};
