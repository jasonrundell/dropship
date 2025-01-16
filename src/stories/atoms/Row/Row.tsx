import { styled } from '@pigment-css/react'

interface RowProps {
  /** Justify content of the row */
  justify?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  /** Children of Row */
  children: React.ReactNode
}

const StyledRow = styled('div')<RowProps>({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: ({ justify }) => justify || 'start',
  alignItems: ({ align }) => align || 'start'
})

const Row = ({
  justify = 'start',
  align = 'start',
  children,
  ...props
}: RowProps) => {
  return (
    <StyledRow justify={justify} align={align} {...props}>
      {children}
    </StyledRow>
  )
}

export default Row
