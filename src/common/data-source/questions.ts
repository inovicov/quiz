import { Question } from 'common/types'
import { QuestionType } from 'common/enums'

const questionsData: Question[] = [
  {
    id: 1,
    type: QuestionType.SELECT,
    title: 'What is your gender assigned at birth?',
    subTitle: 'Select gender',
    answerOptions: ['male', 'female'],
    conditionalQuestions: {
      female: [
        {
          id: 2,
          type: QuestionType.SINGLE,
          title: 'Are you currently pregnant?',
          answerOptions: ['yes', 'no'],
        },
      ],
    },
  },
  {
    id: 3,
    type: QuestionType.TEXT,
    title: 'Do you have any known allergies?',
  },
]

export default questionsData
