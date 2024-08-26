import { Progress } from 'antd'
import { useContext, useMemo } from 'react'
import { QuizContext } from 'common/context'

const QuizProgress = () => {
  const { quizProgress, isCompleted } = useContext(QuizContext)
  const { step, total } = quizProgress

  const percent = useMemo(() => {
    const currentStep = isCompleted ? step : step - 1
    const result = currentStep / (total / 100)

    return +result.toFixed()
  }, [step, total, isCompleted])
  return <Progress percent={percent} />
}

export default QuizProgress
