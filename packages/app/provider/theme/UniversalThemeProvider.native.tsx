import { useForceUpdate } from '@my/ui'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ThemeProviderProps, useThemeSetting as next_useThemeSetting } from '@tamagui/next-theme'
import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Appearance } from 'react-native'

export const ThemeContext = createContext<
  (ThemeProviderProps & { current?: string | null }) | null
>(null)

type ThemeName = 'light' | 'dark' | 'system'

export const UniversalThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [current, setCurrent] = useState<ThemeName>('system')

  useLayoutEffect(() => {
    async function main() {
      const persistedTheme = await AsyncStorage.getItem('@preferred_theme')
      if (persistedTheme && persistedTheme) {
        setCurrent(persistedTheme as ThemeName)
      }
    }
    main()
  }, [])

  useEffect(() => {
    async function main() {
      await AsyncStorage.setItem('@preferred_theme', current)
    }
    main()
  }, [current])

  const set = (val: string) => {
    setCurrent(val as ThemeName)
  }
  const forceUpdate = useForceUpdate()
  return (
    <ThemeContext.Provider
      value={{
        themes: ['light', 'dark'],
        onChangeTheme: (next) => {
          setCurrent(next as any)
          forceUpdate()
        },
        current,
        systemTheme: Appearance.getColorScheme() as string,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeSetting: typeof next_useThemeSetting = () => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useThemeSetting should be used within the context provider.')
  }

  const outputContext: ReturnType<typeof next_useThemeSetting> = {
    ...context,
    systemTheme: context.systemTheme as 'light' | 'dark',
    themes: context.themes!,
    current: context.current ?? 'system',
    resolvedTheme: context.current === 'system' ? context.systemTheme : context.current ?? 'system',
    set: (value) => {
      context.onChangeTheme?.(value)
    },
    toggle: () => {
      const map = {
        light: 'dark',
        dark: 'system',
        system: 'light',
      }
      context.onChangeTheme?.(map[context.current ?? 'system'])
    },
  }

  return outputContext
}

export const useRootTheme = () => {
  const context = useThemeSetting()

  return [context.current === 'system' ? context.systemTheme : context.current, context.set]
}
