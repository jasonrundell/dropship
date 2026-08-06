import { useEffect, useState } from 'react'

import Landing from './site/Landing'
import { DEFAULT_THEME } from './lib/theme.css'
import { THEME_NAMES } from './lib/schema'
import type { ThemeName } from './lib/schema'

const STORAGE_KEY = 'dropship-theme'

const isThemeName = (value: unknown): value is ThemeName =>
  typeof value === 'string' &&
  (THEME_NAMES as readonly string[]).includes(value)

/** Reads the visitor's last choice, falling back to the default design. */
const storedTheme = (): ThemeName => {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return isThemeName(stored) ? stored : DEFAULT_THEME
}

const App = () => {
  const [theme, setTheme] = useState<ThemeName>(storedTheme)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return <Landing theme={theme} onSelectTheme={setTheme} />
}

export default App
