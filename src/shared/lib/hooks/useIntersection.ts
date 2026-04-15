import { useEffect, useRef } from 'react'

export const useIntersection = (
  callback: () => void,
  enabled: boolean
) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!enabled) return
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback()
        }
      },
      {
        rootMargin: '200px', // 🔥 заранее подгружаем
      }
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [callback, enabled])

  return ref
}