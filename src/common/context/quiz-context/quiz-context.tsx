import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import {
  INITIAL_STATE,
  quizReducer,
  QuizActionType,
  stateInitializer,
} from './quiz-context-reducer.ts'
import { QUESTIONS } from 'common/data-source'
import { Answer, Question, QuizProgress, UserAnswer } from 'common/types'

export type QuizContextType = {
  step: number
  incrementStep: () => void
  decrementStep: () => void
  currentQuestion: Question
  submitAnswer: (answer: Answer) => void
  currentAnswer?: UserAnswer
  isCompleted: boolean
  restartQuiz: () => void
  quizProgress: QuizProgress
}

const INITIAL_VALUE: QuizContextType = {
  step: 0,
  incrementStep: () => ({}),
  decrementStep: () => ({}),
  currentQuestion: QUESTIONS[0],
  submitAnswer: () => ({}),
  currentAnswer: undefined,
  isCompleted: false,
  restartQuiz: () => ({}),
  quizProgress: {
    step: 0,
    total: QUESTIONS.length,
  },
}

export const QuizContext = createContext<QuizContextType>(INITIAL_VALUE)

type QuizContextProviderProps = {
  children: ReactNode
}

export const QuizContextProvider = ({ children }: QuizContextProviderProps) => {
  const [state, dispatch] = useReducer(
    quizReducer,
    INITIAL_STATE,
    stateInitializer,
  )

  const { step, answers } = state

  useEffect(() => {
    localStorage.setItem('step', JSON.stringify(step))
    localStorage.setItem('answers', JSON.stringify(answers))
  }, [step, answers])

  const incrementStep = useCallback(() => {
    dispatch({
      type: QuizActionType.INCREMENT_STEP,
    })
  }, [dispatch])

  const decrementStep = useCallback(() => {
    dispatch({
      type: QuizActionType.DECREMENT_STEP,
    })
  }, [dispatch])

  const currentQuestion = useMemo(() => {
    if (!QUESTIONS[step]) return QUESTIONS[0]
    return QUESTIONS[step]
  }, [step])
  const currentAnswer = useMemo(
    () => answers.find(({ questionId }) => questionId === currentQuestion.id),
    [answers, currentQuestion],
  )

  const submitAnswer = useCallback(
    (answer: Answer) => {
      dispatch({
        type: QuizActionType.SUBMIT_ANSWER,
        payload: {
          answer,
          questionId: currentQuestion.id,
        },
      })
      const isLastAnswer = step + 2 > QUESTIONS.length

      if (!isLastAnswer) {
        dispatch({
          type: QuizActionType.INCREMENT_STEP,
        })
      }
    },
    [currentQuestion, dispatch, step],
  )

  const isCompleted = useMemo(() => {
    if (answers.length === 0) return false

    return (
      step + 2 > QUESTIONS.length &&
      answers[answers.length - 1].questionId === currentQuestion.id
    )
  }, [step, answers, currentQuestion])

  const restartQuiz = useCallback(() => {
    dispatch({
      type: QuizActionType.RESTART_QUIZ,
    })
  }, [dispatch])

  const quizProgress = useMemo(
    () => ({
      step: step + 1,
      total: QUESTIONS.length,
    }),
    [step],
  )

  return (
    <QuizContext.Provider
      value={{
        step,
        incrementStep,
        decrementStep,
        currentQuestion,
        submitAnswer,
        currentAnswer,
        isCompleted,
        restartQuiz,
        quizProgress,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}
