'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  onError?: (error: any) => void
  onLoad?: () => void
}

export function SplineScene({ scene, className, onError, onLoad }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onError={(event: any) => onError?.(event)}
        onLoad={() => onLoad?.()}
      />
    </Suspense>
  )
}