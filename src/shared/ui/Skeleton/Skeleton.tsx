import styles from './Skeleton.module.css'
import type { CSSProperties } from 'react'

type Props = {
  width?: string | number
  height?: string | number
  style?: CSSProperties
  className?: string
}

export const Skeleton = ({
  width = '100%',
  height = 16,
  style,
  className,
}: Props) => {
  return (
    <div
      className={`${styles.skeleton} ${className ?? ''}`}
      style={{
        width,
        height,
        ...style,
      }}
    />
  )
}