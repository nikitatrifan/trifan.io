import { useState } from 'react'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  const currentYear = (new Date()).getFullYear()

  return (
    <>
      <img className="profile-pic" src="/profilepic.jpg" alt="" />

      <h1>
        Nikita Trifan, a developer
      </h1>

      <p>
        I build instant interfaces designed to scale
      </p>

      <h2>Work</h2>
      <ul>
        <li>Unfazed, spiritual awakening through the power of AI <i>(Coming soon)</i></li>
        <li>Hashout, the future of remote work, decentralized <i>(Coming soon)</i></li>
        <li>Junoswap, a hackathon turned into a top-tier product in space <i>(Coming soon)</i></li>
        <li>Frame.io, a world-class video collaboration platform <i>(Coming soon)</i></li>
        <li>US Mobile, the best carrier product in the nation <i>(Coming soon)</i></li>
        <li>EXP digital, an international product studio <i>(Coming soon)</i></li>
      </ul>

      <h2>Magazine</h2>
      <ul>
        <li><a href="https://medium.com/@nikitatrifan/as-a-user-i-do-not-want-to-wait-c280e21373b6">As a user, I don't want to wait</a></li>
        <li>I built the fastest yet smallest animation library for React <i>(Coming soon)</i></li>
        <li>Perceived performance is all that matters <i>(Coming soon)</i></li>
        <li>A tiny routing solution to abstract layout animations in React <i>(Coming soon)</i></li>
        <li>Who ate my App Store lunch? <i>(Coming soon)</i></li>
        <li>Brave & bold request making for interface performance <i>(Coming soon)</i></li>
        <li><a href="https://medium.com/@nikitatrifan/is-my-state-in-react-going-to-cost-me-714fdd192ba7">Is my state in React going to cost me?</a></li>
      </ul>

      <h2>Open source</h2>
      <ul>
        <li><i>(Coming soon)</i> Fastest yet smallest animation library in React</li>
        <li><i>(Coming soon)</i> A tiny router solution for layout animations in React</li>
      </ul>

      <h2>Connect</h2>

      <a href="javascript:;">nikita(at)trifan.io</a>

      <p>Austin Texas, {currentYear}</p>
    </>
  )
}

export default App
