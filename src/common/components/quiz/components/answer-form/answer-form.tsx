import { Button, Radio, Space } from 'antd'
import { useMemo } from 'react'

const AnswerForm = () => {
  const formFields = useMemo(
    () => (
      <Radio.Group>
        <Space direction="vertical">
          <Radio value={1}>Yes</Radio>
          <Radio value={2}>No</Radio>
        </Space>
      </Radio.Group>
    ),
    [],
  )
  const submitButton = useMemo(
    () => (
      <Button type="primary" size="large" block>
        Next
      </Button>
    ),
    [],
  )
  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        {formFields}
        {submitButton}
      </Space>
    </>
  )
}

export default AnswerForm
