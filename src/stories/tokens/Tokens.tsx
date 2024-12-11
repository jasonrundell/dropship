import React from 'react'
import styled from '@emotion/styled'
import Tokens from '../../lib/tokens'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`

const TokenCard = styled.div`
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const ColorBox = styled.div<{ color: string }>`
  background: ${(props) => props.color};
  height: 25px;
  width: 25px;
  border-radius: 4px;
  margin-bottom: 8px;
`

const TokenName = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 8px 0;
`

const TokenValue = styled.pre`
  background: #fff;
  padding: 8px;
  border-radius: 4px;
  font-size: 0.9rem;
  overflow: auto;
`

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
