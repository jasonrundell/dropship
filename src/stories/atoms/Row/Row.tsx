import styled from '@emotion/styled'

export interface RowProps {
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

const Row = ({
  justify = 'start',
  align = 'start',
  children,
  ...props
}: RowProps) => {
  const StyledRow = styled.div`
    display: flex;
    flex-flow: row wrap;
    ${justify ? `justify-content: ${justify};` : ''}
    ${align ? `align-items: ${align};` : ''}
  `
  return <StyledRow {...props}>{children}</StyledRow>
}

export default Row
