export const apiUrl = "http://localhost:4000/api/wish"

export const postWish = async (name: string, wish: string) => {
  const res = await fetch(`${apiUrl}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, wish }),
  })

  if (!res.ok) {
    throw await res.json()
  }

  return res.json()
}

export const postProgress = async (name: string, wish: string) => {
  try {
    await fetch(`${apiUrl}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, wish}),
    })
  } catch (err) {
    console.log("err:", err)
  }
}
