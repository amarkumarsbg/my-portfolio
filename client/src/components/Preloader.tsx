import { useState, useEffect } from 'react'

export function Preloader() {
  const [loading, setLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1500)
    const removeTimer = setTimeout(() => setLoading(false), 2000)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!loading) return null

  return (
    <div className={`preloader ${fadeOut ? 'preloader--fade' : ''}`}>
      <div className="preloader-content">
        <div className="preloader-logo">
          <span className="preloader-bracket">&lt;</span>
          AD
          <span className="preloader-bracket"> /&gt;</span>
        </div>
        <div className="preloader-bar">
          <div className="preloader-bar-fill" />
        </div>
      </div>
    </div>
  )
}
