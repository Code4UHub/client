import { QuestionOption, TestCase } from 'types/CreateQuestion/CreateQuestion';

export const formatCreateQuestionBody = (
  generalConfig: { [key: string]: any },
  options: (TestCase | QuestionOption)[],
  answer: number,
  firstName: string,
  lastName: string
) => {
  if (generalConfig.questionType === 'mcq') {
    return {
      type: 'closed',
      module_id: parseInt(generalConfig.module.id, 10),
      difficulty_id: parseInt(generalConfig.difficulty.id, 10),
      question: {
        id: null,
        author: `${firstName} ${lastName}`,
        title: generalConfig.title,
        description: generalConfig.description,
        topic: null,
        difficulty: generalConfig.difficulty.value,
        answer,
        hints: true,
        options: (options as QuestionOption[]).map(
          ({ option, explanation }) => ({ text: option, explanation })
        ),
      },
    };
  }
  return {
    type: 'open',
    module_id: parseInt(generalConfig.module.id, 10),
    difficulty_id: parseInt(generalConfig.difficulty.id, 10),
    question: {
      id: null,
      author: `${firstName} ${lastName}`,
      title: generalConfig.title,
      description: generalConfig.description,
      topic: null,
      difficulty: generalConfig.difficulty.value,
      tests: options as TestCase[],
    },
  };
};
