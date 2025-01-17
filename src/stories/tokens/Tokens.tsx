import React from 'react'
import { styled } from '@pigment-css/react'
import Tokens from '../../lib/tokens'

const Container = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px'
})

const TokenCard = styled('div')({
  background: '#f9f9f9',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '16px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
})

const ColorBox = styled('div')<{ color: string }>({
  background: (props) => props.color,
  height: '25px',
  width: '25px',
  borderRadius: '4px',
  marginBottom: '8px'
})

const TokenName = styled('h3')({
  fontSize: '1.2rem',
  margin: '0 0 8px 0'
})

const TokenValue = styled('pre')({
  background: '#fff',
  padding: '8px',
  borderRadius: '4px',
  fontSize: '0.9rem',
  overflow: 'auto'
})

const TokensDisplay: React.FC = () => {
  return (
    <Container>
      <TokenCard>
        <TokenName>Colors</TokenName>
        <div>
          <TokenValue>
            colors.primary.value: {Tokens.colors.primary.value}
          </TokenValue>
          <ColorBox color={Tokens.colors.primary.value as string} />
        </div>
        <div>
          <TokenValue>
            colors.primaryVariant.value: {Tokens.colors.primaryVariant.value}
          </TokenValue>
          <ColorBox color={Tokens.colors.primaryVariant.value as string} />
        </div>
        <div>
          <TokenValue>
            colors.secondary.value: {Tokens.colors.secondary.value}
          </TokenValue>
          <ColorBox color={Tokens.colors.secondary.value as string} />
        </div>
        <div>
          <TokenValue>
            colors.secondaryVariant.value:{' '}
            {Tokens.colors.secondaryVariant.value}
          </TokenValue>
          <ColorBox color={Tokens.colors.secondaryVariant.value as string} />
        </div>
        <div>
          <TokenValue>
            colors.accent.value: {Tokens.colors.accent.value}
          </TokenValue>
          <ColorBox color={Tokens.colors.accent.value as string} />
        </div>
        <div>
          <TokenValue>
            colors.background.value: {Tokens.colors.background.value}
          </TokenValue>
          <ColorBox color={Tokens.colors.background.value as string} />
        </div>
        <div>
          <TokenValue>
            colors.surface.value: {Tokens.colors.surface.value}
          </TokenValue>
          <ColorBox color={Tokens.colors.surface.value as string} />
        </div>
        <div>
          <TokenValue>
            colors.error.value: {Tokens.colors.error.value}
          </TokenValue>
          <ColorBox color={Tokens.colors.error.value as string} />
        </div>
        <div>
          <TokenValue>
            colors.onPrimary.value: {Tokens.colors.onPrimary.value}
          </TokenValue>
          <ColorBox color={Tokens.colors.onPrimary.value as string} />
        </div>
        <div>
          <TokenValue>
            colors.onSecondary.value: {Tokens.colors.onSecondary.value}
          </TokenValue>
          <ColorBox color={Tokens.colors.onSecondary.value as string} />
        </div>
        <div>
          <TokenValue>
            colors.onBackground.value: {Tokens.colors.onBackground.value}
          </TokenValue>
          <ColorBox color={Tokens.colors.onBackground.value as string} />
        </div>
        <div>
          <TokenValue>
            colors.onSurface.value: {Tokens.colors.onSurface.value}
          </TokenValue>
          <ColorBox color={Tokens.colors.onSurface.value as string} />
        </div>
        <div>
          <TokenValue>
            colors.onError.value: {Tokens.colors.onError.value}
          </TokenValue>
          <ColorBox color={Tokens.colors.onError.value as string} />
        </div>
        <div>
          <TokenValue>
            colors.textPrimary.value: {Tokens.colors.textPrimary.value}
          </TokenValue>
          <ColorBox color={Tokens.colors.textPrimary.value as string} />
        </div>
        <div>
          <TokenValue>
            colors.textSecondary.value: {Tokens.colors.textSecondary.value}
          </TokenValue>
          <ColorBox color={Tokens.colors.textSecondary.value as string} />
        </div>
        <div>
          <TokenValue>
            colors.border.value: {Tokens.colors.border.value}
          </TokenValue>
          <ColorBox color={Tokens.colors.border.value as string} />
        </div>
        <div>
          <TokenValue>colors.link.value: {Tokens.colors.link.value}</TokenValue>
          <ColorBox color={Tokens.colors.link.value as string} />
        </div>
        <div>
          <TokenValue>
            colors.muted.value: {Tokens.colors.muted.value}
          </TokenValue>
          <ColorBox color={Tokens.colors.muted.value as string} />
        </div>
        <div>
          <TokenValue>
            colors.success.value: {Tokens.colors.success.value}
          </TokenValue>
          <ColorBox color={Tokens.colors.success.value as string} />
        </div>
        <div>
          <TokenValue>
            colors.warning.value: {Tokens.colors.warning.value}
          </TokenValue>
          <ColorBox color={Tokens.colors.warning.value as string} />
        </div>
      </TokenCard>
      <TokenCard>
        <TokenName>Sizes</TokenName>
        <div>
          <TokenValue>
            sizes.xsmall.value: {Tokens.sizes.xsmall.value}
          </TokenValue>
          <TokenValue>sizes.xsmall.unit: {Tokens.sizes.xsmall.unit}</TokenValue>
        </div>
        <div>
          <TokenValue>sizes.small.value: {Tokens.sizes.small.value}</TokenValue>
          <TokenValue>sizes.small.unit: {Tokens.sizes.small.unit}</TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.medium.value: {Tokens.sizes.medium.value}
          </TokenValue>
          <TokenValue>sizes.medium.unit: {Tokens.sizes.medium.unit}</TokenValue>
        </div>
        <div>
          <TokenValue>sizes.large.value: {Tokens.sizes.large.value}</TokenValue>
          <TokenValue>sizes.large.unit: {Tokens.sizes.large.unit}</TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.xlarge.value: {Tokens.sizes.xlarge.value}
          </TokenValue>
          <TokenValue>sizes.xlarge.unit: {Tokens.sizes.xlarge.unit}</TokenValue>
        </div>
        <TokenName>Line heights</TokenName>
        <div>
          <TokenValue>
            sizes.lineHeight.value: {Tokens.sizes.lineHeight.value}
          </TokenValue>
          <TokenValue>
            sizes.lineHeight.unit: {Tokens.sizes.lineHeight.unit}
          </TokenValue>
        </div>
        <TokenName>Breakpoints</TokenName>
        <div>
          <TokenValue>
            sizes.breakpoints.small.value:{' '}
            {Tokens.sizes.breakpoints.small.value}
          </TokenValue>
          <TokenValue>
            sizes.breakpoints.small.unit: {Tokens.sizes.breakpoints.small.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.breakpoints.medium.value:{' '}
            {Tokens.sizes.breakpoints.small.value}
          </TokenValue>
          <TokenValue>
            sizes.breakpoints.medium.unit:{' '}
            {Tokens.sizes.breakpoints.medium.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.breakpoints.large.value:{' '}
            {Tokens.sizes.breakpoints.small.value}
          </TokenValue>
          <TokenValue>
            sizes.breakpoints.large.unit: {Tokens.sizes.breakpoints.large.unit}
          </TokenValue>
        </div>
        <TokenName>Padding</TokenName>
        <div>
          <TokenValue>
            sizes.padding.xsmall.value: {Tokens.sizes.padding.xsmall.value}
          </TokenValue>
          <TokenValue>
            sizes.padding.xsmall.unit: {Tokens.sizes.padding.xsmall.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.padding.small.value: {Tokens.sizes.padding.small.value}
          </TokenValue>
          <TokenValue>
            sizes.padding.small.unit: {Tokens.sizes.padding.small.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.padding.medium.value: {Tokens.sizes.padding.medium.value}
          </TokenValue>
          <TokenValue>
            sizes.padding.medium.unit: {Tokens.sizes.padding.medium.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.padding.large.value: {Tokens.sizes.padding.large.value}
          </TokenValue>
          <TokenValue>
            sizes.padding.large.unit: {Tokens.sizes.padding.large.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.padding.xlarge.value: {Tokens.sizes.padding.xlarge.value}
          </TokenValue>
          <TokenValue>
            sizes.padding.xlarge.unit: {Tokens.sizes.padding.xlarge.unit}
          </TokenValue>
        </div>
        <TokenName>Fonts</TokenName>
        <div>
          <TokenValue>
            sizes.fonts.small.value: {Tokens.sizes.fonts.small.value}
          </TokenValue>
          <TokenValue>
            sizes.fonts.small.unit: {Tokens.sizes.fonts.small.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.fonts.medium.value: {Tokens.sizes.fonts.medium.value}
          </TokenValue>
          <TokenValue>
            sizes.fonts.medium.unit: {Tokens.sizes.fonts.medium.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.fonts.large.value: {Tokens.sizes.fonts.large.value}
          </TokenValue>
          <TokenValue>
            sizes.fonts.large.unit: {Tokens.sizes.fonts.large.unit}
          </TokenValue>
        </div>
        <TokenName>Headings</TokenName>
        <div>
          <TokenValue>
            sizes.headings.h1.value: {Tokens.sizes.headings.h1.value}
          </TokenValue>
          <TokenValue>
            sizes.headings.h1.unit: {Tokens.sizes.headings.h1.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.headings.h2.value: {Tokens.sizes.headings.h2.value}
          </TokenValue>
          <TokenValue>
            sizes.headings.h2.unit: {Tokens.sizes.headings.h2.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.headings.h3.value: {Tokens.sizes.headings.h3.value}
          </TokenValue>
          <TokenValue>
            sizes.headings.h3.unit: {Tokens.sizes.headings.h3.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.headings.h4.value: {Tokens.sizes.headings.h4.value}
          </TokenValue>
          <TokenValue>
            sizes.headings.h4.unit: {Tokens.sizes.headings.h4.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.headings.h5.value: {Tokens.sizes.headings.h5.value}
          </TokenValue>
          <TokenValue>
            sizes.headings.h5.unit: {Tokens.sizes.headings.h5.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.headings.h6.value: {Tokens.sizes.headings.h6.value}
          </TokenValue>
          <TokenValue>
            sizes.headings.h6.unit: {Tokens.sizes.headings.h6.unit}
          </TokenValue>
        </div>
      </TokenCard>
      <TokenCard>
        <TokenName>Fonts</TokenName>
        <TokenValue>fonts.body.family: {Tokens.fonts.body.family}</TokenValue>
        <TokenValue>
          fonts.heading.family: {Tokens.fonts.heading.family}
        </TokenValue>
        <TokenValue>
          fonts.monospace.family: {Tokens.fonts.monospace.family}
        </TokenValue>
        <TokenValue>
          fonts.quotes.family: {Tokens.fonts.quotes.family}
        </TokenValue>
      </TokenCard>
    </Container>
  )
}

export default TokensDisplay
