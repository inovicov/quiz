import { QuizProgress } from '../quiz-progress'
import { Button, Col, Row, Typography, Space } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
const { Title } = Typography

const QuizHeader = () => (
  <>
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Row align="middle" justify="space-between">
        <Col>
          <Button type="text" icon={<LeftOutlined />} />
        </Col>
        <Col>
          <Title level={4} style={{ margin: 0 }}>
            Goals
          </Title>
        </Col>
        <Col>1/10</Col>
      </Row>
      <QuizProgress />
    </Space>
  </>
)

export default QuizHeader
