import { useCallback, useEffect, useMemo, useState } from "react"

export const useCounter = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [isStopped, setIsStopped] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [now, setNow] = useState(Date.now())
  const [accumulatedDuration, setAccumulatedDuration] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const elapsed = useMemo(() => {
    if (!isRunning || !startTime) return accumulatedDuration
    return accumulatedDuration + (now - startTime)
  }, [isRunning, startTime, now, accumulatedDuration])

  const handleStart = useCallback(() => {
    const currentNow = Date.now()
    setNow(currentNow)

    if (isStopped) {
      setAccumulatedDuration(0)
      setIsStopped(false)
    }

    setStartTime(currentNow)
    setIsRunning(true)
  }, [isStopped])

  const handlePause = useCallback(() => {
    if (!startTime || !isRunning) return

    const diff = Date.now() - startTime
    setAccumulatedDuration((prev) => prev + diff)
    setStartTime(null)
    setIsRunning(false)
    setIsStopped(false)
  }, [startTime, isRunning])

  const handleStop = useCallback(() => {
    if (isRunning && startTime) {
      const diff = Date.now() - startTime
      setAccumulatedDuration((prev) => prev + diff)
    }
    setStartTime(null)
    setIsRunning(false)
    setIsStopped(true)
  }, [isRunning, startTime])

  const handleReset = useCallback(() => {
    setStartTime(null)
    setIsRunning(false)
    setIsStopped(false)
    setAccumulatedDuration(0)
    setNow(Date.now())
  }, [])

  return {
    isRunning,
    isStopped,
    duration: elapsed,
    elapsed,
    handleStart,
    handlePause,
    handleStop,
    handleReset,
  }
}
