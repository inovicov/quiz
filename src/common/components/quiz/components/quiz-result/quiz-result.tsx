import { Button, Space, Typography } from 'antd'
import { RedoOutlined } from '@ant-design/icons'
import { useContext } from 'react'
import { QuizContext } from 'common/context'
const { Title } = Typography

const QuizResult = () => {
  const { restartQuiz } = useContext(QuizContext)

  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Title level={4}>Quiz completed!</Title>
        <Button
          size="large"
          block
          icon={<RedoOutlined />}
          onClick={restartQuiz}
        >
          Restart
        </Button>
      </Space>
    </>
  )
}

export default QuizResult
