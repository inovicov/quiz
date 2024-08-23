import { Button, Form, Radio, Space } from 'antd'
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Question } from 'common/types'
import { QuizContext } from 'common/context'

type AnswerFormProperties = {
  question: Question
}

type AnswerFormValue = {
  answer: string
}

const AnswerForm: FC<AnswerFormProperties> = ({ question }) => {
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const { submitAnswer, currentAnswer } = useContext(QuizContext)

  const [form] = Form.useForm()

  const { id, answerOptions = [] } = question

  const values = Form.useWatch([], form)

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmitDisabled(false))
      .catch(() => setSubmitDisabled(true))
  }, [form, values])

  useEffect(() => {
    if (id) {
      form.resetFields()
    }
  }, [id, form])

  const initialValues: AnswerFormValue = useMemo(() => {
    if (currentAnswer) {
      return {
        answer: currentAnswer.answer,
      }
    }
    return { answer: '' }
  }, [currentAnswer])

  const handleSubmit = useCallback(
    ({ answer }: AnswerFormValue) => {
      submitAnswer(answer)
    },
    [submitAnswer],
  )

  const formFields = useMemo(
    () => (
      <Form.Item name="answer" rules={[{ required: true }]}>
        <Radio.Group>
          <Space direction="vertical">
            {answerOptions?.map((answerOption) => (
              <Radio key={answerOption} value={answerOption}>
                {answerOption}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>
    ),
    [answerOptions],
  )
  const submitButton = useMemo(
    () => (
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        block
        disabled={submitDisabled}
      >
        Next
      </Button>
    ),
    [submitDisabled],
  )
  return (
    <>
      <Form
        form={form}
        name="question-form"
        initialValues={initialValues}
        autoComplete="off"
        onFinish={handleSubmit}
      >
        {formFields}
        {submitButton}
      </Form>
    </>
  )
}

export default AnswerForm
