'use client'

import {
    globalCss,
    useThemeClassName,
    useSetDefaultThemeConfig,
    lightThemeConfig,
} from 'junoblocks'
import { useEffect } from 'react'

const applyGlobalStyles = globalCss({
  body: {
    backgroundColor: '$backgroundColors$base',
  },
})

export const useApplyThemeConfiguration = () => {
  // outdated ts checks
  // @ts-ignore
  useSetDefaultThemeConfig(lightThemeConfig)

  const themeClassName = useThemeClassName()

  /* apply theme class on body also */
  useEffect(() => {
    document.body.classList.add(themeClassName)
    applyGlobalStyles()
    return () => {
      document.body.classList.remove(themeClassName)
    }
  }, [themeClassName])
}
