import { styled } from '@pigment-css/react'
import Tokens from '../../../lib/tokens'

interface HeadingProps {
  /** Level of the heading */
  level?: 1 | 2 | 3 | 4 | 5 | 6
  /** Optional id */
  id?: string
  /** Children of the heading */
  children: React.ReactNode
}

const headingStyles = (level: 1 | 2 | 3 | 4 | 5 | 6) => ({
  fontSize: `${Tokens.sizes.headings[`h${level}`].$value.value}${Tokens.sizes.headings[`h${level}`].$value.unit}`,
  lineHeight: `${Tokens.sizes.headings[`h${level}`].$value.value}${Tokens.sizes.headings[`h${level}`].$value.unit}`,
  margin: 0
})

const StyledHeading = styled('h1')<{ level: 1 | 2 | 3 | 4 | 5 | 6 }>({
  variants: [
    {
      props: {
        level: 1
      },
      style: headingStyles(1)
    },
    {
      props: {
        level: 2
      },
      style: headingStyles(2)
    },
    {
      props: {
        level: 3
      },
      style: headingStyles(3)
    },
    {
      props: {
        level: 4
      },
      style: headingStyles(4)
    },
    {
      props: {
        level: 5
      },
      style: headingStyles(5)
    },
    {
      props: {
        level: 6
      },
      style: headingStyles(6)
    }
  ]
})

const Heading = ({ level = 1, id, children, ...props }: HeadingProps) => {
  return (
    <StyledHeading as={`h${level}`} level={level} id={id} {...props}>
      {children}
    </StyledHeading>
  )
}

export default Heading
