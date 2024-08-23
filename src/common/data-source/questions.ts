import { Question } from 'common/types'
import { QuestionType } from 'common/enums'

const questionsData: Question[] = [
  {
    id: 1,
    type: QuestionType.SINGLE,
    title: 'Question 1?',
    subTitle: 'Question 1?',
    answerOptions: ['yes', 'no'],
  },
  {
    id: 2,
    type: QuestionType.SINGLE,
    title: 'Question 2?',
    answerOptions: ['yes', 'no'],
  },
]

export default questionsData
