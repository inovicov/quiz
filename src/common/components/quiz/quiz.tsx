import { QuestionItem, QuizHeader } from './components'
import { Card } from 'antd'

const Quiz = () => (
  <>
    <Card style={{ maxWidth: 500 }}>
      <QuizHeader />
      <QuestionItem />
    </Card>
  </>
)

export default Quiz
