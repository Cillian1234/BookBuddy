import { useState } from 'react'
import DengBack from './assets/Images by AJ/DengBackpack.png'
import DengRead from './assets/Images by AJ/DengReadingBook.jpg'
import '../main.css'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Navbar />
      <div>
        <a href="https://en.wikipedia.org/wiki/Moo_Deng" target="_blank">
          <img src={DengRead} className="logo" alt="Hippo reading" />
        </a>
        <a href="https://www.reddit.com/r/vegan/comments/1fsb3cm/moo_deng/" target="_blank">
          <img src={DengBack} className="logo react" alt="Hippo with backpack" />
        </a>
      </div>
      <h1>Book Buddy!</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          The beginning.
        </p>
        <p>
            Only edit files within <code>src</code> or <code>public</code> for the moment
        </p>
      </div>
    </>
  )
}

export default App
