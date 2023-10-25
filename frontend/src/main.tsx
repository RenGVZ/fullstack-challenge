import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import SuccessPage from "./pages/SuccessPage"
import ErrorPage from "./pages/ErrorPage"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/success",
    element: <SuccessPage />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
