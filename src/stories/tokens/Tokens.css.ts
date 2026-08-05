import { style } from '@vanilla-extract/css'

export const container = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px'
})

export const tokenCard = style({
  background: '#f9f9f9',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '16px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
})

export const colorBox = style({
  height: '25px',
  width: '25px',
  borderRadius: '4px',
  marginBottom: '8px'
})

export const tokenName = style({
  fontSize: '1.2rem',
  margin: '0 0 8px 0'
})

export const tokenValue = style({
  background: '#fff',
  padding: '8px',
  borderRadius: '4px',
  fontSize: '0.9rem',
  overflow: 'auto'
})
