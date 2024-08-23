import { QuizProgress } from '../quiz-progress'
import { Button, Col, Row, Typography, Space } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useContext, useMemo } from 'react'
import { QuizContext } from 'common/context'
const { Title } = Typography

const QuizHeader = () => {
  const { step, decrementStep, isCompleted, quizProgress } =
    useContext(QuizContext)

  const backButton = useMemo(() => {
    const disabled = step === 0 || isCompleted

    return (
      <Button
        type="text"
        icon={<LeftOutlined />}
        disabled={disabled}
        onClick={decrementStep}
      />
    )
  }, [step, isCompleted])

  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Row align="middle" justify="space-between">
          <Col>{backButton}</Col>
          <Col>
            <Title level={4} style={{ margin: 0 }}>
              Goals
            </Title>
          </Col>
          <Col>
            {quizProgress.step}/{quizProgress.total}
          </Col>
        </Row>
        <QuizProgress />
      </Space>
    </>
  )
}

export default QuizHeader
