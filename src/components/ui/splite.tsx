'use client'

import { Suspense, lazy, useState } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  onError?: (error: any) => void
  onLoad?: () => void
}

export function SplineScene({ scene, className, onError, onLoad }: SplineSceneProps) {
  const [hasError, setHasError] = useState(false)

  const handleError = (error: any) => {
    console.error('Spline loading error:', error)
    setHasError(true)
    onError?.(error)
  }

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black/10 rounded-lg">
        <span className="text-sm text-muted-foreground">3D model unavailable</span>
      </div>
    )
  }

  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-rental-blue border-t-transparent animate-spin" />
        </div>
      }
    >
      <div className="relative w-full h-full">
        <Spline
          scene={scene}
          className={className}
          onError={handleError}
          onLoad={() => onLoad?.()}
        />
      </div>
    </Suspense>
  )
}