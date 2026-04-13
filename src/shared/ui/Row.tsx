import type { ReactNode, CSSProperties } from 'react'

type Justify =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'

type Align =
  | 'start'
  | 'center'
  | 'end'
  | 'stretch'

type Props = {
  children: ReactNode
  justify?: Justify
  align?: Align
  gap?: number
  style?: CSSProperties
}

const justifyMap: Record<Justify, CSSProperties['justifyContent']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
}

const alignMap: Record<Align, CSSProperties['alignItems']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
}

export const Row = ({
  children,
  justify = 'start',
  align = 'center',
  gap = 12,
  style,
}: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: justifyMap[justify],
        alignItems: alignMap[align],
        gap,
        ...style,
      }}
    >
      {children}
    </div>
  )
}