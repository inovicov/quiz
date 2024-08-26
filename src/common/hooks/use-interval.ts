import { useEffect, useState } from 'react'

export const useInterval = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return count
}
