import styled from '@emotion/styled'
import Tokens from '../../../lib/tokens'

export interface HeadingProps {
  /** Level of the heading */
  level?: 1 | 2 | 3 | 4 | 5 | 6
  /** Label of the heading */
  label: string
  /** Optional id */
  id?: string
}

const headingStyles = (level: 1 | 2 | 3 | 4 | 5 | 6) => `
  font-size: ${Tokens.sizes.headings[`h${level}` as keyof typeof Tokens.sizes.headings]}rem;
  line-height: ${Tokens.sizes.headings[`h${level}` as keyof typeof Tokens.sizes.headings]}rem;
  margin-top: 0;
  margin-bottom: ${Tokens.sizes.headings[`h${level}` as keyof typeof Tokens.sizes.headings]}rem;
`

const StyledHeading = styled.h1<{ level: 1 | 2 | 3 | 4 | 5 | 6 }>`
  ${({ level }) => headingStyles(level)}
`

const Heading = ({ level = 1, label, id, ...props }: HeadingProps) => {
  return (
    <StyledHeading as={`h${level}`} level={level} id={id} {...props}>
      {label}
    </StyledHeading>
  )
}

export default Heading
