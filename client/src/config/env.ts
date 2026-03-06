export const config = {
  apiUrl: import.meta.env.VITE_API_URL || '/api',
  isProd: import.meta.env.PROD,
  isDev: import.meta.env.DEV,
}
