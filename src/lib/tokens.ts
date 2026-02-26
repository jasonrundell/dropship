import tokensFile from './common.tokens.json'

const Tokens = JSON.parse(JSON.stringify(tokensFile))

export function fontFamilyToCss(families: string[]): string {
  return families
    .map((f) => (f.includes(' ') ? `'${f}'` : f))
    .join(', ')
}

export default Tokens
