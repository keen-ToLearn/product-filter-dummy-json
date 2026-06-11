import { useRef } from 'react'

export const useDebounce = () => {
    const timer = useRef<ReturnType<typeof setTimeout>>(null)

    const resetTimer = () => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
    }

    const debouncer = <T extends (...args: any[]) => void>(
        methodToDebounce: T,
        timeout: number,
        ...args: Parameters<T>
    ) => {
        resetTimer()

        timer.current = setTimeout(() => {
            methodToDebounce(...args)
            resetTimer()
        }, timeout)
    }

    return debouncer;
}