import { useCallback, useRef } from "react";
export default function useDebounce(func, delay, deps) {
    const timer = useRef();
    const cancel = useCallback(() => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
    }, []);

    const run = useCallback((...args) => {
        cancel();
        timer.current = window.setTimeout(() => {
            func(...args);
        }, delay);
    }, deps);
    return [run, cancel];
}
