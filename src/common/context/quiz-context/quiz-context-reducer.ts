import { UserAnswer } from 'common/types'

export enum QuizActionType {
  INCREMENT_STEP = 'INCREMENT_STEP',
  DECREMENT_STEP = 'DECREMENT_STEP',
  SUBMIT_ANSWER = 'SUBMIT_ANSWER',
  RESTART_QUIZ = 'RESTART_QUIZ',
}

type QuizAction =
  | IncrementStepAction
  | DecrementStepAction
  | SubmitAnswerAction
  | RestartQuizAction

export type IncrementStepAction = {
  type: QuizActionType.INCREMENT_STEP
}

export type DecrementStepAction = {
  type: QuizActionType.DECREMENT_STEP
}

export type SubmitAnswerAction = {
  type: QuizActionType.SUBMIT_ANSWER
  payload: UserAnswer
}

export type RestartQuizAction = {
  type: QuizActionType.RESTART_QUIZ
}

export type QuizState = {
  step: number
  answers: UserAnswer[]
}

export const INITIAL_STATE: QuizState = {
  step: 0,
  answers: [],
}

export const quizReducer = (
  state: QuizState = INITIAL_STATE,
  action: QuizAction,
) => {
  const { type: actionType } = action

  switch (actionType) {
    case QuizActionType.INCREMENT_STEP:
      return {
        ...state,
        step: state.step + 1,
      }
    case QuizActionType.DECREMENT_STEP:
      return {
        ...state,
        step: state.step - 1,
      }
    case QuizActionType.SUBMIT_ANSWER:
      return {
        ...state,
        answers: [
          ...state.answers.filter(
            ({ questionId }) => questionId !== action.payload.questionId,
          ),
          action.payload,
        ],
      }
    case QuizActionType.RESTART_QUIZ:
      return INITIAL_STATE
    default:
      return state
  }
}
