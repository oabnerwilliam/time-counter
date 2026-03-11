import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../components/ui/button";

const formatTime = (ms: number | null) => {
    if (!ms) return `00:00:00`

    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    return `${hours.toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}`
}

export const Counter = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [now, setNow] = useState(Date.now());
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const elapsed = useMemo(() => startTime ? now - startTime : 0, [startTime, now])

    const handleStart = useCallback(() => {
        const now = Date.now();
        setNow(now);
        setStartTime(now);
        setIsRunning(true);
    }, []);

    const handleStop = useCallback(() => {
        if (!startTime) return

        const diff = Date.now() - startTime
        setDuration(diff)
        setIsRunning(false);
    }, [startTime]);

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-5">
            <Button className="text-2xl px-6 py-6 bg-white text-black hover:bg-gray-200 transition-all duration-300" onClick={isRunning ? handleStop : handleStart}>{isRunning ? 'Parar cronômetro' : 'Iniciar cronômetro'}</Button>
            <p className="text-5xl font-bold">{isRunning ? formatTime(elapsed) : formatTime(duration)}</p>
        </div>
    );
};
