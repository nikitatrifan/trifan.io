"use client";
import { useState, useEffect } from 'react'

export const useIsRenderingOnServerSide = () => {
  const [isRenderingOnServerSide, setIsRenderingOnServerSide] = useState(true)

  useEffect(() => {
    setIsRenderingOnServerSide(false)
  }, [])

  return isRenderingOnServerSide
}
