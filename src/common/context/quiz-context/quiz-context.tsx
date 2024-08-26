import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import {
  INITIAL_STATE,
  quizReducer,
  QuizActionType,
  stateInitializer,
} from './quiz-context-reducer.ts'
import { QUESTIONS } from 'common/data-source'
import {
  Answer,
  CurrentQuestion,
  Question,
  QuestionAnswerResult,
  QuizProgress,
  QuizStepState,
  UserAnswer,
} from 'common/types'
import { CurrentQuestionModel } from 'common/models'

export type QuizContextType = {
  step: QuizStepState
  decrementStep: () => void
  currentQuestion: Question
  submitAnswer: (answer: Answer, seconds: number) => void
  currentAnswer?: UserAnswer
  isCompleted: boolean
  restartQuiz: () => void
  quizProgress: QuizProgress
  answersList: QuestionAnswerResult[]
}

const INITIAL_VALUE: QuizContextType = {
  step: [0],
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
  answersList: [],
}

export const QuizContext = createContext<QuizContextType>(INITIAL_VALUE)

type QuizContextProviderProps = {
  children: ReactNode
}

const exists = (child: number | undefined) => child !== undefined

const hasMoreQuestions = (question: Question, answer: Answer) => {
  if (!question.conditionalQuestions) return false

  return question.conditionalQuestions[answer]
}

export const QuizContextProvider = ({ children }: QuizContextProviderProps) => {
  const [questions] = useState<Question[]>(QUESTIONS)

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

  const currentQuestion: CurrentQuestion = useMemo(
    () => CurrentQuestionModel(questions, answers, step),
    [step, answers, questions],
  )

  const decrementStep = useCallback(() => {
    dispatch({
      type: QuizActionType.DECREMENT_STEP,
      payload: currentQuestion.previousStep,
    })
  }, [dispatch, currentQuestion])

  const currentAnswer = useMemo(
    () => answers.find(({ questionId }) => questionId === currentQuestion.id),
    [answers, currentQuestion],
  )

  const submitAnswer = useCallback(
    (answer: Answer, seconds: number) => {
      const hasConditionalQuestions = hasMoreQuestions(currentQuestion, answer)

      dispatch({
        type: QuizActionType.SUBMIT_ANSWER,
        payload: {
          userAnswer: {
            answer,
            seconds,
            questionId: currentQuestion.id,
            parentQuestionId: currentQuestion.parentQuestionId,
          },
          clearOld: !hasConditionalQuestions,
        },
      })

      const [parent, child] = step

      if (hasConditionalQuestions) {
        dispatch({
          type: QuizActionType.INCREMENT_STEP,
          payload: [parent, 0],
        })
      } else {
        if (exists(child)) {
          dispatch({
            type: QuizActionType.INCREMENT_STEP,
            payload: currentQuestion.nextStep,
          })
        } else {
          const isLastAnswer = parent + 2 > QUESTIONS.length

          if (isLastAnswer) return

          dispatch({
            type: QuizActionType.INCREMENT_STEP,
            payload: [parent + 1],
          })
        }
      }
    },
    [dispatch, currentQuestion, step],
  )

  const isCompleted = useMemo(() => {
    if (answers.length === 0) return false

    const [parent] = step

    return (
      parent + 2 > QUESTIONS.length &&
      answers[answers.length - 1].questionId === currentQuestion.id
    )
  }, [step, answers, currentQuestion])

  const restartQuiz = useCallback(() => {
    dispatch({
      type: QuizActionType.RESTART_QUIZ,
    })
  }, [dispatch])

  const quizProgress = useMemo(() => {
    const { siblingQuestions = [] } = currentQuestion

    const baseQuestionsCount = QUESTIONS.length
    const answeredQuestionsCount = answers.length

    const previousAnsweredSiblings = answers.filter((answer) => {
      if (!answer.parentQuestionId) return false
      return answer.parentQuestionId !== currentQuestion.parentQuestionId
    })

    const total =
      baseQuestionsCount +
      siblingQuestions.length +
      previousAnsweredSiblings.length

    return {
      step: isCompleted ? answeredQuestionsCount : answeredQuestionsCount + 1,
      total: total,
    }
  }, [answers, currentQuestion, isCompleted])

  const answersList = useMemo(() => {
    if (!isCompleted) return []

    return answers.map((answer) => {
      const question = answer.parentQuestionId
        ? (questions.find(
            ({ id }) => id === answer.parentQuestionId,
          ) as Question)
        : (questions.find(({ id }) => id === answer.questionId) as Question)

      const conditionalQuestionsBlock = question.conditionalQuestions || {}
      const allChildren = Object.values(conditionalQuestionsBlock).flat()

      const childQuestion = allChildren.find(
        ({ id }) => id === answer.questionId,
      )

      return {
        answer: answer.answer,
        time: answer.seconds,
        question: answer.parentQuestionId
          ? childQuestion
            ? childQuestion.title
            : ''
          : question.title,
      }
    })
  }, [isCompleted, answers, questions])

  return (
    <QuizContext.Provider
      value={{
        step,
        decrementStep,
        currentQuestion,
        submitAnswer,
        currentAnswer,
        isCompleted,
        restartQuiz,
        quizProgress,
        answersList,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}
