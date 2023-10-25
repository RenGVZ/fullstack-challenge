import WishForm from "./components/WishForm"
import "../styles/style.css"

const App = () => {
  return (
    <>
      <header>
        <h1>A letter to Santa</h1>
      </header>
      <WishForm />

      <footer>
        Made with
        <a href="https://glitch.com">Glitch</a>!
      </footer>
      <div
        className="glitchButton"
        style={{ position: "fixed", top: "20px", right: "20px" }}
      ></div>
    </>
  )
}

export default App
