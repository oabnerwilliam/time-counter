import { Button } from "../components/ui/button";
import { useCounter } from "./hooks/use-counter";
import { formatTime } from "./utils/constants";

export const Counter = () => {
    const { isRunning, duration, elapsed, handleStart, handleStop } = useCounter();

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-5">
            <Button className="text-2xl px-6 py-6 bg-white text-black hover:bg-gray-100 transition-all duration-300" onClick={isRunning ? handleStop : handleStart}>{isRunning ? 'Parar cronômetro' : 'Iniciar cronômetro'}</Button>
            <p className="text-5xl font-bold">{isRunning ? formatTime(elapsed) : formatTime(duration)}</p>
        </div>
    );
};
