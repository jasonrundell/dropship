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
  width: '200px',
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
      {Object.entries(Tokens).map(([key, value]) => (
        <TokenCard key={key}>
          <TokenName>{key}</TokenName>
          {key === 'colors' && typeof value === 'object' ? (
            Object.entries(value).map(([colorKey, colorValue]) => (
              <div key={colorKey}>
                <TokenValue>
                  {colorKey}: {colorValue}
                </TokenValue>
                <ColorBox color={colorValue as string} />
              </div>
            ))
          ) : (
            <TokenValue>{JSON.stringify(value, null, 2)}</TokenValue>
          )}
        </TokenCard>
      ))}
    </Container>
  )
}

export default TokensDisplay
