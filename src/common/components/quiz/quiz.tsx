import { QuestionItem, QuizHeader } from './components'
import { Card } from 'antd'
import { useContext } from 'react'
import { QuizContext } from 'common/context'
import { QuizResult } from './components'

const Quiz = () => {
  const { isCompleted } = useContext(QuizContext)

  return (
    <>
      <Card style={{ maxWidth: 500 }}>
        <QuizHeader />
        {isCompleted ? <QuizResult /> : <QuestionItem />}
      </Card>
    </>
  )
}

export default Quiz
