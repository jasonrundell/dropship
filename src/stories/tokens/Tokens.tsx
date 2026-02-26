import React from 'react'
import { styled } from '@pigment-css/react'
import Tokens, { fontFamilyToCss } from '../../lib/tokens'

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
            colors.primary.$value.hex: {Tokens.colors.primary.$value.hex}
          </TokenValue>
          <ColorBox color={Tokens.colors.primary.$value.hex as string} />
        </div>
        <div>
          <TokenValue>
            colors.primaryVariant.$value.hex: {Tokens.colors.primaryVariant.$value.hex}
          </TokenValue>
          <ColorBox color={Tokens.colors.primaryVariant.$value.hex as string} />
        </div>
        <div>
          <TokenValue>
            colors.secondary.$value.hex: {Tokens.colors.secondary.$value.hex}
          </TokenValue>
          <ColorBox color={Tokens.colors.secondary.$value.hex as string} />
        </div>
        <div>
          <TokenValue>
            colors.secondaryVariant.$value.hex:{' '}
            {Tokens.colors.secondaryVariant.$value.hex}
          </TokenValue>
          <ColorBox color={Tokens.colors.secondaryVariant.$value.hex as string} />
        </div>
        <div>
          <TokenValue>
            colors.accent.$value.hex: {Tokens.colors.accent.$value.hex}
          </TokenValue>
          <ColorBox color={Tokens.colors.accent.$value.hex as string} />
        </div>
        <div>
          <TokenValue>
            colors.background.$value.hex: {Tokens.colors.background.$value.hex}
          </TokenValue>
          <ColorBox color={Tokens.colors.background.$value.hex as string} />
        </div>
        <div>
          <TokenValue>
            colors.surface.$value.hex: {Tokens.colors.surface.$value.hex}
          </TokenValue>
          <ColorBox color={Tokens.colors.surface.$value.hex as string} />
        </div>
        <div>
          <TokenValue>
            colors.error.$value.hex: {Tokens.colors.error.$value.hex}
          </TokenValue>
          <ColorBox color={Tokens.colors.error.$value.hex as string} />
        </div>
        <div>
          <TokenValue>
            colors.onPrimary.$value.hex: {Tokens.colors.onPrimary.$value.hex}
          </TokenValue>
          <ColorBox color={Tokens.colors.onPrimary.$value.hex as string} />
        </div>
        <div>
          <TokenValue>
            colors.onSecondary.$value.hex: {Tokens.colors.onSecondary.$value.hex}
          </TokenValue>
          <ColorBox color={Tokens.colors.onSecondary.$value.hex as string} />
        </div>
        <div>
          <TokenValue>
            colors.onBackground.$value.hex: {Tokens.colors.onBackground.$value.hex}
          </TokenValue>
          <ColorBox color={Tokens.colors.onBackground.$value.hex as string} />
        </div>
        <div>
          <TokenValue>
            colors.onSurface.$value.hex: {Tokens.colors.onSurface.$value.hex}
          </TokenValue>
          <ColorBox color={Tokens.colors.onSurface.$value.hex as string} />
        </div>
        <div>
          <TokenValue>
            colors.onError.$value.hex: {Tokens.colors.onError.$value.hex}
          </TokenValue>
          <ColorBox color={Tokens.colors.onError.$value.hex as string} />
        </div>
        <div>
          <TokenValue>
            colors.textPrimary.$value.hex: {Tokens.colors.textPrimary.$value.hex}
          </TokenValue>
          <ColorBox color={Tokens.colors.textPrimary.$value.hex as string} />
        </div>
        <div>
          <TokenValue>
            colors.textSecondary.$value.hex: {Tokens.colors.textSecondary.$value.hex}
          </TokenValue>
          <ColorBox color={Tokens.colors.textSecondary.$value.hex as string} />
        </div>
        <div>
          <TokenValue>
            colors.border.$value.hex: {Tokens.colors.border.$value.hex}
          </TokenValue>
          <ColorBox color={Tokens.colors.border.$value.hex as string} />
        </div>
        <div>
          <TokenValue>colors.link.$value.hex: {Tokens.colors.link.$value.hex}</TokenValue>
          <ColorBox color={Tokens.colors.link.$value.hex as string} />
        </div>
        <div>
          <TokenValue>
            colors.muted.$value.hex: {Tokens.colors.muted.$value.hex}
          </TokenValue>
          <ColorBox color={Tokens.colors.muted.$value.hex as string} />
        </div>
        <div>
          <TokenValue>
            colors.success.$value.hex: {Tokens.colors.success.$value.hex}
          </TokenValue>
          <ColorBox color={Tokens.colors.success.$value.hex as string} />
        </div>
        <div>
          <TokenValue>
            colors.warning.$value.hex: {Tokens.colors.warning.$value.hex}
          </TokenValue>
          <ColorBox color={Tokens.colors.warning.$value.hex as string} />
        </div>
      </TokenCard>
      <TokenCard>
        <TokenName>Sizes</TokenName>
        <div>
          <TokenValue>
            sizes.xsmall.$value.value: {Tokens.sizes.xsmall.$value.value}
          </TokenValue>
          <TokenValue>sizes.xsmall.$value.unit: {Tokens.sizes.xsmall.$value.unit}</TokenValue>
        </div>
        <div>
          <TokenValue>sizes.small.$value.value: {Tokens.sizes.small.$value.value}</TokenValue>
          <TokenValue>sizes.small.$value.unit: {Tokens.sizes.small.$value.unit}</TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.medium.$value.value: {Tokens.sizes.medium.$value.value}
          </TokenValue>
          <TokenValue>sizes.medium.$value.unit: {Tokens.sizes.medium.$value.unit}</TokenValue>
        </div>
        <div>
          <TokenValue>sizes.large.$value.value: {Tokens.sizes.large.$value.value}</TokenValue>
          <TokenValue>sizes.large.$value.unit: {Tokens.sizes.large.$value.unit}</TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.xlarge.$value.value: {Tokens.sizes.xlarge.$value.value}
          </TokenValue>
          <TokenValue>sizes.xlarge.$value.unit: {Tokens.sizes.xlarge.$value.unit}</TokenValue>
        </div>
        <TokenName>Line heights</TokenName>
        <div>
          <TokenValue>
            sizes.lineHeight.$value.value: {Tokens.sizes.lineHeight.$value.value}
          </TokenValue>
          <TokenValue>
            sizes.lineHeight.$value.unit: {Tokens.sizes.lineHeight.$value.unit}
          </TokenValue>
        </div>
        <TokenName>Breakpoints</TokenName>
        <div>
          <TokenValue>
            sizes.breakpoints.small.$value.value:{' '}
            {Tokens.sizes.breakpoints.small.$value.value}
          </TokenValue>
          <TokenValue>
            sizes.breakpoints.small.$value.unit: {Tokens.sizes.breakpoints.small.$value.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.breakpoints.medium.$value.value:{' '}
            {Tokens.sizes.breakpoints.medium.$value.value}
          </TokenValue>
          <TokenValue>
            sizes.breakpoints.medium.$value.unit:{' '}
            {Tokens.sizes.breakpoints.medium.$value.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.breakpoints.large.$value.value:{' '}
            {Tokens.sizes.breakpoints.large.$value.value}
          </TokenValue>
          <TokenValue>
            sizes.breakpoints.large.$value.unit: {Tokens.sizes.breakpoints.large.$value.unit}
          </TokenValue>
        </div>
        <TokenName>Padding</TokenName>
        <div>
          <TokenValue>
            sizes.padding.xsmall.$value.value: {Tokens.sizes.padding.xsmall.$value.value}
          </TokenValue>
          <TokenValue>
            sizes.padding.xsmall.$value.unit: {Tokens.sizes.padding.xsmall.$value.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.padding.small.$value.value: {Tokens.sizes.padding.small.$value.value}
          </TokenValue>
          <TokenValue>
            sizes.padding.small.$value.unit: {Tokens.sizes.padding.small.$value.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.padding.medium.$value.value: {Tokens.sizes.padding.medium.$value.value}
          </TokenValue>
          <TokenValue>
            sizes.padding.medium.$value.unit: {Tokens.sizes.padding.medium.$value.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.padding.large.$value.value: {Tokens.sizes.padding.large.$value.value}
          </TokenValue>
          <TokenValue>
            sizes.padding.large.$value.unit: {Tokens.sizes.padding.large.$value.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.padding.xlarge.$value.value: {Tokens.sizes.padding.xlarge.$value.value}
          </TokenValue>
          <TokenValue>
            sizes.padding.xlarge.$value.unit: {Tokens.sizes.padding.xlarge.$value.unit}
          </TokenValue>
        </div>
        <TokenName>Font Sizes</TokenName>
        <div>
          <TokenValue>
            sizes.fonts.small.$value.value: {Tokens.sizes.fonts.small.$value.value}
          </TokenValue>
          <TokenValue>
            sizes.fonts.small.$value.unit: {Tokens.sizes.fonts.small.$value.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.fonts.medium.$value.value: {Tokens.sizes.fonts.medium.$value.value}
          </TokenValue>
          <TokenValue>
            sizes.fonts.medium.$value.unit: {Tokens.sizes.fonts.medium.$value.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.fonts.large.$value.value: {Tokens.sizes.fonts.large.$value.value}
          </TokenValue>
          <TokenValue>
            sizes.fonts.large.$value.unit: {Tokens.sizes.fonts.large.$value.unit}
          </TokenValue>
        </div>
        <TokenName>Headings</TokenName>
        <div>
          <TokenValue>
            sizes.headings.h1.$value.value: {Tokens.sizes.headings.h1.$value.value}
          </TokenValue>
          <TokenValue>
            sizes.headings.h1.$value.unit: {Tokens.sizes.headings.h1.$value.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.headings.h2.$value.value: {Tokens.sizes.headings.h2.$value.value}
          </TokenValue>
          <TokenValue>
            sizes.headings.h2.$value.unit: {Tokens.sizes.headings.h2.$value.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.headings.h3.$value.value: {Tokens.sizes.headings.h3.$value.value}
          </TokenValue>
          <TokenValue>
            sizes.headings.h3.$value.unit: {Tokens.sizes.headings.h3.$value.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.headings.h4.$value.value: {Tokens.sizes.headings.h4.$value.value}
          </TokenValue>
          <TokenValue>
            sizes.headings.h4.$value.unit: {Tokens.sizes.headings.h4.$value.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.headings.h5.$value.value: {Tokens.sizes.headings.h5.$value.value}
          </TokenValue>
          <TokenValue>
            sizes.headings.h5.$value.unit: {Tokens.sizes.headings.h5.$value.unit}
          </TokenValue>
        </div>
        <div>
          <TokenValue>
            sizes.headings.h6.$value.value: {Tokens.sizes.headings.h6.$value.value}
          </TokenValue>
          <TokenValue>
            sizes.headings.h6.$value.unit: {Tokens.sizes.headings.h6.$value.unit}
          </TokenValue>
        </div>
      </TokenCard>
      <TokenCard>
        <TokenName>Font Families</TokenName>
        <TokenValue>fonts.body.$value: {fontFamilyToCss(Tokens.fonts.body.$value)}</TokenValue>
        <TokenValue>
          fonts.heading.$value: {fontFamilyToCss(Tokens.fonts.heading.$value)}
        </TokenValue>
        <TokenValue>
          fonts.monospace.$value: {fontFamilyToCss(Tokens.fonts.monospace.$value)}
        </TokenValue>
        <TokenValue>
          fonts.quotes.$value: {fontFamilyToCss(Tokens.fonts.quotes.$value)}
        </TokenValue>
      </TokenCard>
    </Container>
  )
}

export default TokensDisplay
