import { Assignment } from 'types/Assignment/Assignment';

export const questionData: Assignment = [
  {
    id: 'TC1028_23_OM_1',
    type: 'closed',
    author: 'Administrador',
    title: 'Expresión matemática a resolver de acuerdo a Python',
    description: '¿Cuál es el resultado de la siguiente expresión? (8 // 3)',
    topic: '2.3 Expresiones aritméticas.',
    difficulty: 'Fácil',
    answer: 3,
    hints: true,
    options: [
      {
        text: '2.60',
        explanation:
          'Incorrecto. Recuerda que es una división entera y no devuelve el resultado con decimales',
      },
      {
        text: '1',
        explanation:
          'Incorrecto. Checar que fallo en la division o funcion del código',
      },
      {
        text: '2.66',
        explanation:
          'Incorrecto. Recuerda que es una división entera y no devuelve el resultado con decimales',
      },
      {
        text: '2',
        explanation: 'Correcto. El resultado no va con decimales',
      },
    ],
  },
  {
    id: 'TC1028_23_OM_2',
    type: 'open',
    author: 'Administrador',
    title: 'Calculating the area of a triangle',
    description:
      'Write a function that calculates the area of a triangle given its base and height.',
    topic: 'Geometry',
    difficulty: 'Fácil',
    driver: 'calculate_area(b,h)',
  },
  {
    id: 'TC4567_12_DM_3',
    type: 'closed',
    author: 'Teacher',
    title: 'Calculating a simple expression in Python',
    description: 'What is the result of the expression (5 + 2) * 3?',
    topic: '2.3 Arithmetic expressions',
    difficulty: 'Fácil',
    answer: 3,
    hints: true,
    options: [
      {
        text: '19',
        explanation: 'Incorrect. Please re-check the order of operations',
      },
      {
        text: '22',
        explanation: 'Incorrect. Please re-check the order of operations',
      },
      {
        text: '15',
        explanation: 'Incorrect. Please re-check the order of operations',
      },
      {
        text: '21',
        explanation: 'Correct. The expression evaluates to (5+2)*3 = 21',
      },
    ],
  },
  {
    id: 'TC7890_56_OM_4',
    type: 'closed',
    author: 'Instructor',
    title: 'Solving a simple equation with Python',
    description: 'What is the value of x in the equation x + 8 = 20?',
    topic: '2.4 Solving equations',
    difficulty: 'Fácil',
    answer: 2,
    hints: true,
    options: [
      {
        text: '10',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '11',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '12',
        explanation: 'Correct. The value of x in the equation x+8=20 is 12',
      },
      {
        text: '13',
        explanation: 'Incorrect. Please re-check your calculation',
      },
    ],
  },
  {
    id: 'TC2345_78_DM_5',
    type: 'closed',
    author: 'Professor',
    title: 'Calculating the remainder of a division with Python',
    description: 'What is the remainder when 21 is divided by 5 using Python?',
    topic: '2.5 Modulus operator',
    difficulty: 'Medio',
    answer: 3,
    hints: true,
    options: [
      {
        text: '2',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '3',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '4',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '1',
        explanation: 'Correct. The remainder when 21 is divided by 5 is 1',
      },
    ],
  },
  {
    id: 'TC1028_23_OM_6',
    type: 'closed',
    author: 'Administrador',
    title: 'Expresión matemática a resolver de acuerdo a Python',
    description: '¿Cuál es el resultado de la siguiente expresión? (8 // 3)',
    topic: '2.3 Expresiones aritméticas.',
    difficulty: 'Fácil',
    answer: 3,
    hints: true,
    options: [
      {
        text: '2.60',
        explanation:
          'Incorrecto. Recuerda que es una división entera y no devuelve el resultado con decimales',
      },
      {
        text: '1',
        explanation:
          'Incorrecto. Checar que fallo en la division o funcion del código',
      },
      {
        text: '2.66',
        explanation:
          'Incorrecto. Recuerda que es una división entera y no devuelve el resultado con decimales',
      },
      {
        text: '2',
        explanation: 'Correcto. El resultado no va con decimales',
      },
    ],
  },
  {
    id: 'TC4567_12_DM_7',
    type: 'closed',
    author: 'Teacher',
    title: 'Calculating a simple expression in Python',
    description: 'What is the result of the expression (5 + 2) * 3?',
    topic: '2.3 Arithmetic expressions',
    difficulty: 'Fácil',
    answer: 3,
    hints: true,
    options: [
      {
        text: '19',
        explanation: 'Incorrect. Please re-check the order of operations',
      },
      {
        text: '22',
        explanation: 'Incorrect. Please re-check the order of operations',
      },
      {
        text: '15',
        explanation: 'Incorrect. Please re-check the order of operations',
      },
      {
        text: '21',
        explanation: 'Correct. The expression evaluates to (5+2)*3 = 21',
      },
    ],
  },
  {
    id: 'TC7890_56_OM_8',
    type: 'closed',
    author: 'Instructor',
    title: 'Solving a simple equation with Python',
    description: 'What is the value of x in the equation x + 8 = 20?',
    topic: '2.4 Solving equations',
    difficulty: 'Fácil',
    answer: 2,
    hints: true,
    options: [
      {
        text: '10',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '11',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '12',
        explanation: 'Correct. The value of x in the equation x+8=20 is 12',
      },
      {
        text: '13',
        explanation: 'Incorrect. Please re-check your calculation',
      },
    ],
  },
  {
    id: 'TC2345_78_DM_9',
    type: 'closed',
    author: 'Professor',
    title: 'Calculating the remainder of a division with Python',
    description: 'What is the remainder when 21 is divided by 5 using Python?',
    topic: '2.5 Modulus operator',
    difficulty: 'Medio',
    answer: 3,
    hints: true,
    options: [
      {
        text: '2',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '3',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '4',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '1',
        explanation: 'Correct. The remainder when 21 is divided by 5 is 1',
      },
    ],
  },
  {
    id: 'TC1028_23_OM_10',
    type: 'closed',
    author: 'Administrador',
    title: 'Expresión matemática a resolver de acuerdo a Python',
    description: '¿Cuál es el resultado de la siguiente expresión? (8 // 3)',
    topic: '2.3 Expresiones aritméticas.',
    difficulty: 'Fácil',
    answer: 3,
    hints: true,
    options: [
      {
        text: '2.60',
        explanation:
          'Incorrecto. Recuerda que es una división entera y no devuelve el resultado con decimales',
      },
      {
        text: '1',
        explanation:
          'Incorrecto. Checar que fallo en la division o funcion del código',
      },
      {
        text: '2.66',
        explanation:
          'Incorrecto. Recuerda que es una división entera y no devuelve el resultado con decimales',
      },
      {
        text: '2',
        explanation: 'Correcto. El resultado no va con decimales',
      },
    ],
  },
  {
    id: 'TC4567_12_DM_11',
    type: 'closed',
    author: 'Teacher',
    title: 'Calculating a simple expression in Python',
    description: 'What is the result of the expression (5 + 2) * 3?',
    topic: '2.3 Arithmetic expressions',
    difficulty: 'Fácil',
    answer: 3,
    hints: true,
    options: [
      {
        text: '19',
        explanation: 'Incorrect. Please re-check the order of operations',
      },
      {
        text: '22',
        explanation: 'Incorrect. Please re-check the order of operations',
      },
      {
        text: '15',
        explanation: 'Incorrect. Please re-check the order of operations',
      },
      {
        text: '21',
        explanation: 'Correct. The expression evaluates to (5+2)*3 = 21',
      },
    ],
  },
  {
    id: 'TC7890_56_OM_12',
    type: 'closed',
    author: 'Instructor',
    title: 'Solving a simple equation with Python',
    description: 'What is the value of x in the equation x + 8 = 20?',
    topic: '2.4 Solving equations',
    difficulty: 'Fácil',
    answer: 2,
    hints: true,
    options: [
      {
        text: '10',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '11',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '12',
        explanation: 'Correct. The value of x in the equation x+8=20 is 12',
      },
      {
        text: '13',
        explanation: 'Incorrect. Please re-check your calculation',
      },
    ],
  },
  {
    id: 'TC2345_78_DM_13',
    type: 'closed',
    author: 'Professor',
    title: 'Calculating the remainder of a division with Python',
    description: 'What is the remainder when 21 is divided by 5 using Python?',
    topic: '2.5 Modulus operator',
    difficulty: 'Medio',
    answer: 3,
    hints: true,
    options: [
      {
        text: '2',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '3',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '4',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '1',
        explanation: 'Correct. The remainder when 21 is divided by 5 is 1',
      },
    ],
  },
  {
    id: 'TC1028_23_OM_14',
    type: 'closed',
    author: 'Administrador',
    title: 'Expresión matemática a resolver de acuerdo a Python',
    description: '¿Cuál es el resultado de la siguiente expresión? (8 // 3)',
    topic: '2.3 Expresiones aritméticas.',
    difficulty: 'Fácil',
    answer: 3,
    hints: true,
    options: [
      {
        text: '2.60',
        explanation:
          'Incorrecto. Recuerda que es una división entera y no devuelve el resultado con decimales',
      },
      {
        text: '1',
        explanation:
          'Incorrecto. Checar que fallo en la division o funcion del código',
      },
      {
        text: '2.66',
        explanation:
          'Incorrecto. Recuerda que es una división entera y no devuelve el resultado con decimales',
      },
      {
        text: '2',
        explanation: 'Correcto. El resultado no va con decimales',
      },
    ],
  },
  {
    id: 'TC4567_12_DM_15',
    type: 'closed',
    author: 'Teacher',
    title: 'Calculating a simple expression in Python',
    description: 'What is the result of the expression (5 + 2) * 3?',
    topic: '2.3 Arithmetic expressions',
    difficulty: 'Fácil',
    answer: 3,
    hints: true,
    options: [
      {
        text: '19',
        explanation: 'Incorrect. Please re-check the order of operations',
      },
      {
        text: '22',
        explanation: 'Incorrect. Please re-check the order of operations',
      },
      {
        text: '15',
        explanation: 'Incorrect. Please re-check the order of operations',
      },
      {
        text: '21',
        explanation: 'Correct. The expression evaluates to (5+2)*3 = 21',
      },
    ],
  },
  {
    id: 'TC7890_56_OM_16',
    type: 'closed',
    author: 'Instructor',
    title: 'Solving a simple equation with Python',
    description: 'What is the value of x in the equation x + 8 = 20?',
    topic: '2.4 Solving equations',
    difficulty: 'Fácil',
    answer: 2,
    hints: true,
    options: [
      {
        text: '10',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '11',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '12',
        explanation: 'Correct. The value of x in the equation x+8=20 is 12',
      },
      {
        text: '13',
        explanation: 'Incorrect. Please re-check your calculation',
      },
    ],
  },
  {
    id: 'TC2345_78_DM_17',
    type: 'closed',
    author: 'Professor',
    title: 'Calculating the remainder of a division with Python',
    description: 'What is the remainder when 21 is divided by 5 using Python?',
    topic: '2.5 Modulus operator',
    difficulty: 'Medio',
    answer: 3,
    hints: true,
    options: [
      {
        text: '2',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '3',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '4',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '1',
        explanation: 'Correct. The remainder when 21 is divided by 5 is 1',
      },
    ],
  },
  {
    id: 'TC1028_23_OM_18',
    type: 'closed',
    author: 'Administrador',
    title: 'Expresión matemática a resolver de acuerdo a Python',
    description: '¿Cuál es el resultado de la siguiente expresión? (8 // 3)',
    topic: '2.3 Expresiones aritméticas.',
    difficulty: 'Fácil',
    answer: 3,
    hints: true,
    options: [
      {
        text: '2.60',
        explanation:
          'Incorrecto. Recuerda que es una división entera y no devuelve el resultado con decimales',
      },
      {
        text: '1',
        explanation:
          'Incorrecto. Checar que fallo en la division o funcion del código',
      },
      {
        text: '2.66',
        explanation:
          'Incorrecto. Recuerda que es una división entera y no devuelve el resultado con decimales',
      },
      {
        text: '2',
        explanation: 'Correcto. El resultado no va con decimales',
      },
    ],
  },
  {
    id: 'TC4567_12_DM_19',
    type: 'closed',
    author: 'Teacher',
    title: 'Calculating a simple expression in Python',
    description: 'What is the result of the expression (5 + 2) * 3?',
    topic: '2.3 Arithmetic expressions',
    difficulty: 'Fácil',
    answer: 3,
    hints: true,
    options: [
      {
        text: '19',
        explanation: 'Incorrect. Please re-check the order of operations',
      },
      {
        text: '22',
        explanation: 'Incorrect. Please re-check the order of operations',
      },
      {
        text: '15',
        explanation: 'Incorrect. Please re-check the order of operations',
      },
      {
        text: '21',
        explanation: 'Correct. The expression evaluates to (5+2)*3 = 21',
      },
    ],
  },
  {
    id: 'TC7890_56_OM_20',
    type: 'closed',
    author: 'Instructor',
    title: 'Solving a simple equation with Python',
    description: 'What is the value of x in the equation x + 8 = 20?',
    topic: '2.4 Solving equations',
    difficulty: 'Fácil',
    answer: 2,
    hints: true,
    options: [
      {
        text: '10',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '11',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '12',
        explanation: 'Correct. The value of x in the equation x+8=20 is 12',
      },
      {
        text: '13',
        explanation: 'Incorrect. Please re-check your calculation',
      },
    ],
  },
  {
    id: 'TC2345_78_DM_21',
    type: 'closed',
    author: 'Professor',
    title: 'Calculating the remainder of a division with Python',
    description: 'What is the remainder when 21 is divided by 5 using Python?',
    topic: '2.5 Modulus operator',
    difficulty: 'Medio',
    answer: 3,
    hints: true,
    options: [
      {
        text: '2',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '3',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '4',
        explanation: 'Incorrect. Please re-check your calculation',
      },
      {
        text: '1',
        explanation: 'Correct. The remainder when 21 is divided by 5 is 1',
      },
    ],
  },
];
