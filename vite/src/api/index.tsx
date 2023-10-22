import { apiUrl } from '../config'

export const postWish = async (name: string, wish: string) => {
  const res = await fetch(`${apiUrl}/wish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, wish })
  })

  if (!res.ok) {
    throw new Error('Failed to post wish')
  }
  return res.json()
}