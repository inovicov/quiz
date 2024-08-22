import { Space, Typography } from 'antd'
import { AnswerForm } from '../answer-form'

const { Title } = Typography

const QuestionItem = () => (
  <>
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <div>
        <Title level={4}>Question title?</Title>
        <Title level={5} style={{ margin: 0 }}>
          Question subtitle
        </Title>
      </div>
      <AnswerForm />
    </Space>
  </>
)

export default QuestionItem
