import type { ComponentPropsWithRef, ReactNode } from 'react'

import * as styles from './Card.css'

export type CardProps = Omit<ComponentPropsWithRef<'div'>, 'title'> & {
  /** Imagery or any visual block. Rendered into the `media` slot. */
  media?: ReactNode
  /** The card's heading. Rendered into the `title` slot. */
  title?: ReactNode
  /** Controls, links, or buttons. Rendered into the `actions` slot. */
  actions?: ReactNode
  /** The card's body copy. Rendered into the `body` slot. */
  children?: ReactNode
  /** Element to render for the title. Defaults to `h3`. */
  titleAs?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

/**
 * A card with four named slots: media, title, body, and actions.
 *
 * The component decides *what* is on the card and in what reading order. The
 * active theme decides *where* each slot sits, via the `layout.cardAreas`
 * token. Every slot also carries a `data-part` attribute, which is a stable
 * public hook for a theme that needs to reach past the tokens with its own CSS.
 *
 * Slots are omitted from the DOM entirely when not supplied, so an absent slot
 * leaves no empty grid cell behind. A card with no media drops the templated
 * layout altogether and stacks, since the layout tokens exist to place media
 * relative to text.
 */
const Card = ({
  media,
  title,
  actions,
  children,
  titleAs: TitleTag = 'h3',
  ...props
}: CardProps) => (
  <div
    className={styles.card({ hasMedia: media !== undefined })}
    data-part="card"
    {...props}
  >
    {media !== undefined && (
      <div className={styles.media} data-part="card-media">
        {media}
      </div>
    )}
    {title !== undefined && (
      <TitleTag className={styles.title} data-part="card-title">
        {title}
      </TitleTag>
    )}
    {children !== undefined && (
      <div className={styles.body} data-part="card-body">
        {children}
      </div>
    )}
    {actions !== undefined && (
      <div className={styles.actions} data-part="card-actions">
        {actions}
      </div>
    )}
  </div>
)

export default Card
