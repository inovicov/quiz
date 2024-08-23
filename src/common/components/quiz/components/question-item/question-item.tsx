import { Space, Typography } from 'antd'
import { AnswerForm } from '../answer-form'
import { useContext } from 'react'
import { QuizContext } from 'common/context'

const { Title } = Typography

const QuestionItem = () => {
  const { currentQuestion } = useContext(QuizContext)

  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <div>
          <Title level={4}>{currentQuestion.title}</Title>
          {currentQuestion.subTitle && (
            <Title level={5} style={{ margin: 0 }}>
              Question subtitle
            </Title>
          )}
        </div>
        <AnswerForm question={currentQuestion} />
      </Space>
    </>
  )
}

export default QuestionItem
