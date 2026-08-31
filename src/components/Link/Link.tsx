import { link } from './Link.css'

export interface LinkProps {
  /** URL of the link */
  href: string
  /** Label of the link */
  label: string
  /** Target of the link */
  target?: string
  /** Rel of the link */
  rel?: string
  /** Function to call when the link is clicked */
  onClick?: () => void
}

const Link = ({
  href = '#',
  label = 'Click here to visit',
  target = '',
  rel = '',
  onClick = undefined,
  ...props
}: LinkProps) => {
  return (
    <a
      className={link}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      {...props}
    >
      {label}
    </a>
  )
}

export default Link
