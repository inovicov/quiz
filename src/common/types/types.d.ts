import { QuestionType } from 'common/enums'

export type Question = {
  id: number
  title: string
  subTitle?: string
  type: QuestionType
  answerOptions?: Answer[]
}

export type Answer = string

export type UserAnswer = {
  answer: string
  questionId: number
}

export type QuizProgress = {
  step: number
  total: number
}
