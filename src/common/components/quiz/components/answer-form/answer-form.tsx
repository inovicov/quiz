import { Button, Form, Input, Radio, Space } from 'antd'
import {
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Question } from 'common/types'
import { QuizContext } from 'common/context'
import { QuestionType } from 'common/enums'
import { useInterval } from 'common/hooks'
import { ManOutlined, WomanOutlined } from '@ant-design/icons'

const { TextArea } = Input

type AnswerFormProperties = {
  question: Question
}

type AnswerFormValue = {
  answer: string
}
const optionIcons: Record<string, ReactNode> = {
  male: <ManOutlined />,
  female: <WomanOutlined />,
}
const pickIcon = (option: string) => optionIcons[option]

const AnswerForm: FC<AnswerFormProperties> = ({ question }) => {
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const { submitAnswer, currentAnswer } = useContext(QuizContext)

  const seconds = useInterval()

  const [form] = Form.useForm()

  const { id, answerOptions = [], type } = question

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
      submitAnswer(answer, seconds)
    },
    [submitAnswer, seconds],
  )

  const formFields = useMemo(() => {
    if (type === QuestionType.SINGLE) {
      return (
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
      )
    }
    if (type === QuestionType.SELECT) {
      return (
        <Form.Item name="answer" rules={[{ required: true }]}>
          <Radio.Group>
            <Space direction="vertical">
              {answerOptions?.map((answerOption) => (
                <Radio key={answerOption} value={answerOption}>
                  {pickIcon(answerOption)} {answerOption}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>
      )
    }
    if (type === QuestionType.TEXT) {
      return (
        <Form.Item name="answer" rules={[{ required: true }]}>
          <TextArea rows={4} />
        </Form.Item>
      )
    }
  }, [answerOptions, type])

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
