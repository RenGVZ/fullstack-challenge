export const apiUrl = "http://localhost:4000/api"

export const postWish = async (name: string, wish: string) => {
  const res = await fetch(`${apiUrl}/wish`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, wish }),
  })

  if (!res.ok) {
    throw await res.json()
  }

  return res.json()
}
