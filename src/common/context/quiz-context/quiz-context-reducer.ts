import { QuizStepState, UserAnswer } from 'common/types'

export enum QuizActionType {
  INCREMENT_STEP = 'INCREMENT_STEP',
  DECREMENT_STEP = 'DECREMENT_STEP',
  SUBMIT_ANSWER = 'SUBMIT_ANSWER',
  RESTART_QUIZ = 'RESTART_QUIZ',
  SET_ANSWERS = 'SET_ANSWERS',
}

type QuizAction =
  | IncrementStepAction
  | DecrementStepAction
  | SubmitAnswerAction
  | RestartQuizAction
  | SetAnswersAction

export type IncrementStepAction = {
  type: QuizActionType.INCREMENT_STEP
  payload: QuizStepState
}

export type DecrementStepAction = {
  type: QuizActionType.DECREMENT_STEP
  payload: QuizStepState
}

export type SetAnswersAction = {
  type: QuizActionType.SET_ANSWERS
  payload: UserAnswer[]
}

export type SubmitAnswerAction = {
  type: QuizActionType.SUBMIT_ANSWER
  payload: {
    userAnswer: UserAnswer
    clearOld: boolean
  }
}

export type RestartQuizAction = {
  type: QuizActionType.RESTART_QUIZ
}

export type QuizState = {
  step: QuizStepState
  answers: UserAnswer[]
}

export const INITIAL_STATE: QuizState = {
  step: [0],
  answers: [],
}

export const stateInitializer = () => {
  const savedStep = localStorage.getItem('step')
  const savedAnswers = localStorage.getItem('answers')

  const stepValue = savedStep ? JSON.parse(savedStep) : INITIAL_STATE.step
  const answersValue = savedAnswers
    ? JSON.parse(savedAnswers)
    : INITIAL_STATE.answers

  return {
    ...INITIAL_STATE,
    step: stepValue,
    answers: answersValue,
  }
}

const submitAnswer = (
  state: QuizState,
  action: SubmitAnswerAction,
): QuizState => {
  const {
    payload: { userAnswer, clearOld },
  } = action

  const items = state.answers.filter(
    ({ questionId }) => questionId !== userAnswer.questionId,
  )
  const filteredItems = clearOld
    ? items.filter(
        ({ parentQuestionId }) => parentQuestionId !== userAnswer.questionId,
      )
    : items

  return {
    ...state,
    answers: [...filteredItems, userAnswer],
  }
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
        step: action.payload as QuizStepState,
      }
    case QuizActionType.DECREMENT_STEP:
      return {
        ...state,
        step: action.payload as QuizStepState,
      }
    case QuizActionType.SET_ANSWERS:
      return {
        ...state,
        answers: action.payload,
      }
    case QuizActionType.SUBMIT_ANSWER:
      return submitAnswer(state, action)
    case QuizActionType.RESTART_QUIZ:
      return INITIAL_STATE
    default:
      return state
  }
}
