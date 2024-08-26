import {
  CurrentQuestion,
  Question,
  QuizStepState,
  UserAnswer,
} from 'common/types'
import questions from 'common/data-source/questions.ts'

const isParent = (step: QuizStepState) => {
  const [, child] = step

  return child === undefined
}

const findAnswerByQuestion = (question: Question, answers: UserAnswer[]) => {
  return answers.find(({ questionId }) => questionId === question.id)
}

const getPreviousFromParent = (
  answers: UserAnswer[],
  step: QuizStepState,
): QuizStepState => {
  const [parent] = step

  if (parent === 0) return [0]

  const previousQuestion = questions[parent - 1]
  const previousAnswer = findAnswerByQuestion(previousQuestion, answers)
  const conditionalQuestionsBlock = previousQuestion.conditionalQuestions || {}
  const conditionalQuestions = !previousAnswer
    ? []
    : conditionalQuestionsBlock[previousAnswer.answer] || []

  const previousChild = conditionalQuestions.length - 1

  return previousChild >= 0 ? [parent - 1, previousChild] : [parent - 1]
}

const getSiblingsFromChild = (
  conditionalQuestions: Question[],
  step: QuizStepState,
) => {
  const [parent, child = 0] = step

  const nextChild =
    child + 1 < conditionalQuestions.length ? child + 1 : undefined
  const nextParent = nextChild ? parent : parent + 1

  const previousChild = child - 1

  return {
    nextStep: nextChild
      ? ([nextParent, nextChild] as QuizStepState)
      : ([nextParent] as QuizStepState),
    previousStep:
      previousChild >= 0
        ? ([parent, previousChild] as QuizStepState)
        : ([parent] as QuizStepState),
  }
}

export default (
  questions: Question[],
  answers: UserAnswer[],
  step: QuizStepState,
): CurrentQuestion => {
  const [parent, child] = step

  if (isParent(step)) {
    const question = questions[parent]

    return {
      ...question,
      nextStep: [parent + 1],
      previousStep: getPreviousFromParent(answers, step),
    }
  } else {
    const parentQuestion = questions[parent]
    const parentAnswer = findAnswerByQuestion(parentQuestion, answers)
    const conditionalQuestionsBlock = parentQuestion.conditionalQuestions || {}
    const conditionalQuestions = !parentAnswer
      ? []
      : conditionalQuestionsBlock[parentAnswer.answer]

    const question = conditionalQuestions[child as number]

    const { nextStep, previousStep } = getSiblingsFromChild(
      conditionalQuestions,
      step,
    )

    return {
      ...question,
      nextStep,
      previousStep,
      parentQuestionId: parentQuestion.id,
      siblingQuestions: conditionalQuestions,
    }
  }
}
