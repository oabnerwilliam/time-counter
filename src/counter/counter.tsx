import { useCallback, useEffect, useMemo, useState } from "react";

const formatTime = (ms: number | null) => {
    if (!ms) return `0h 0m 0s`

    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    return `${hours}h ${minutes % 60}m ${seconds % 60}s`
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
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
            <button onClick={isRunning ? handleStop : handleStart} className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-all duration-300 text-2xl">{isRunning ? 'Parar cronômetro' : 'Iniciar cronômetro'}</button>
            <p className="text-2xl font-bold">{isRunning ? formatTime(elapsed) : formatTime(duration)}</p>
        </div>
    );
};
