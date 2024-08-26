import { Button, Space, Typography } from 'antd'
import { RedoOutlined } from '@ant-design/icons'
import { useContext } from 'react'
import { QuizContext } from 'common/context'
const { Title } = Typography

const secondsToTimestamp = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  const paddedHours = String(hours).padStart(2, '0')
  const paddedMinutes = String(minutes).padStart(2, '0')
  const paddedSeconds = String(secs).padStart(2, '0')

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`
}

const QuizResult = () => {
  const { restartQuiz, answersList } = useContext(QuizContext)

  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Title level={4}>Quiz completed!</Title>
        <Title level={5} style={{ margin: 0 }}>
          Here are the results:
        </Title>

        <ul>
          {answersList.map(({ answer, question, time }, index) => {
            return (
              <li key={index}>
                <div>
                  <b>{question}</b>
                </div>
                <div>Answer: {answer}</div>
                <div>Time spent: {secondsToTimestamp(time)}</div>
                <br />
              </li>
            )
          })}
        </ul>
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
