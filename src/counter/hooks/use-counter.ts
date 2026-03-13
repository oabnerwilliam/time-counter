import { useCallback, useEffect, useMemo, useState } from "react";

export const useCounter = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [now, setNow] = useState(Date.now());
    const [accumulatedDuration, setAccumulatedDuration] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const elapsed = useMemo(() => {
        if (!isRunning || !startTime) return accumulatedDuration;
        return accumulatedDuration + (now - startTime);
    }, [isRunning, startTime, now, accumulatedDuration])

    const handleStart = useCallback(() => {
        const now = Date.now();
        setNow(now);
        setStartTime(now);
        setIsRunning(true);
    }, []);

    const handlePause = useCallback(() => {
        if (!startTime || !isRunning) return;

        const diff = Date.now() - startTime;
        setAccumulatedDuration(prev => prev + diff);
        setStartTime(null);
        setIsRunning(false);
    }, [startTime, isRunning]);

    const handleStop = useCallback(() => {
        if (isRunning && startTime) {
            const diff = Date.now() - startTime;
            setAccumulatedDuration(prev => prev + diff);
        }
        setStartTime(null);
        setIsRunning(false);
        setAccumulatedDuration(0);
    }, [isRunning, startTime]);

    return {
        isRunning,
        duration: elapsed,
        elapsed,
        handleStart,
        handlePause,
        handleStop
    }
}