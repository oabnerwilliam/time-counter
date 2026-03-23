import { Button } from "../components/ui/button"
import { useCounter } from "./hooks/use-counter"
import { formatTime } from "./utils/constants"

export const Counter = () => {
  const {
    isRunning,
    isStopped,
    duration,
    elapsed,
    handleStart,
    handlePause,
    handleStop,
    handleReset,
  } = useCounter()

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-5">
      <div className="flex gap-4">
        {isRunning ? (
          <>
            <Button
              className="text-2xl px-6 py-6 bg-white text-black hover:bg-gray-100 transition-all duration-300"
              onClick={handlePause}
            >
              Pausar
            </Button>
            <Button
              className="text-2xl px-6 py-6 text-white hover:bg-gray-100 hover:text-black transition-all duration-300"
              onClick={handleStop}
            >
              Parar
            </Button>
          </>
        ) : isStopped ? (
          <Button
            className="text-2xl px-6 py-6 text-white hover:bg-gray-100 hover:text-black transition-all duration-300"
            onClick={handleReset}
          >
            Reiniciar
          </Button>
        ) : duration > 0 ? (
          <>
            <Button
              className="text-2xl px-6 py-6 bg-white text-black hover:bg-gray-100 transition-all duration-300"
              onClick={handleStart}
            >
              Retomar
            </Button>
            <Button
              className="text-2xl px-6 py-6 text-white hover:bg-gray-100 hover:text-black transition-all duration-300"
              onClick={handleReset}
            >
              Resetar
            </Button>
          </>
        ) : (
          <Button
            className="text-2xl px-6 py-6 bg-white text-black hover:bg-gray-100 transition-all duration-300"
            onClick={handleStart}
          >
            Iniciar cronômetro
          </Button>
        )}
      </div>
      <p className="text-5xl font-bold">{formatTime(elapsed)}</p>
    </div>
  )
}
