import { styled } from '@pigment-css/react'
import Tokens from '../../../lib/tokens'

interface HeadingProps {
  /** Level of the heading */
  level?: 1 | 2 | 3 | 4 | 5 | 6
  /** Label of the heading */
  label: string
  /** Optional id */
  id?: string
}

const headingStyles = (level: 1 | 2 | 3 | 4 | 5 | 6) => ({
  fontSize: `${Tokens.sizes.headings[`h${level}`]}rem`,
  lineHeight: `${Tokens.sizes.headings[`h${level}`]}rem`,
  marginTop: '0',
  marginBottom: `${Tokens.sizes.headings[`h${level}`]}rem`
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

const Heading = ({ level = 1, label, id, ...props }: HeadingProps) => {
  return (
    <StyledHeading as={`h${level}`} level={level} id={id} {...props}>
      {label}
    </StyledHeading>
  )
}

export default Heading
