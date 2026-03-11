import { useCallback, useEffect, useMemo, useState } from "react";

export const useCounter = () => {
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

    return {
        isRunning,
        duration,
        elapsed,
        handleStart,
        handleStop
    }
}