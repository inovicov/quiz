import { QuestionType } from 'common/enums'

export type Question = {
  id: number
  title: string
  subTitle?: string
  type: QuestionType
  answerOptions?: Answer[]
  conditionalQuestions?: ConditionalQuestionsBlock
}

export type CurrentQuestion = Question & {
  nextStep: QuizStepState
  previousStep: QuizStepState
  parentQuestionId?: number
  siblingQuestions?: Question[]
}

export type ConditionalQuestionsBlock = Record<Answer, Question[]>

export type Answer = string

export type UserAnswer = {
  answer: string
  questionId: number
  parentQuestionId?: number
  seconds: number
}

export type QuizProgress = {
  step: number
  total: number
}

export type QuizStepState = [number] | [number, number]

export type QuestionAnswerResult = {
  answer: string
  question: string
  time: number
}
