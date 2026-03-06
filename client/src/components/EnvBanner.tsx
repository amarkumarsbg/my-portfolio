import { config } from '../config/env'

export function EnvBanner() {
  if (config.isProd) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#f59e0b',
        color: '#000',
        textAlign: 'center',
        padding: '0.25rem',
        fontSize: '0.8rem',
        zIndex: 9999,
      }}
    >
      Development / Staging
    </div>
  )
}
