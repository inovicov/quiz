import { QuizScreen } from './screens'
import { QuizContextProvider } from 'common/context'

const App = () => {
  return (
    <>
      <QuizContextProvider>
        <QuizScreen />
      </QuizContextProvider>
    </>
  )
}

export default App
