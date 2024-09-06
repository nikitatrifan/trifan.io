import './App.css'


function App() {
  const currentYear = (new Date()).getFullYear()

  return (
    <>
      <img className="profile-pic" src="/profilepic.jpg" alt="Shot in New York"/>

      <h1>
        Nikita Trifan, a developer
      </h1>

      <p>
        Instant interfaces designed to scale
      </p>

      <h2>Work</h2>
      <p>I've done a variety of projects, from AI powered mobile apps and Blockchain interfaces to world-class
        collaboration tools and DevTools. <i>(Reach out for a walkthrough)</i>
      </p>

      <h2>Magazine</h2>
      <ul>
        <li><a href="https://medium.com/@nikitatrifan/as-a-user-i-do-not-want-to-wait-c280e21373b6">As a user, I don't
          want to wait</a></li>
        <li>Perceived performance is all that matters <i>(Coming soon)</i></li>
        <li>I got you the fastest animation library for React <i>(Coming soon)</i></li>
        <li>A tiny routing solution to abstract layout animations in React <i>(Coming soon)</i></li>
        <li>Who ate my App Store lunch? <i>(Coming soon)</i></li>
        <li>Brave & bold request making for interface performance <i>(Coming soon)</i></li>
        <li><a href="https://medium.com/@nikitatrifan/is-my-state-in-react-going-to-cost-me-714fdd192ba7">Is my state in
          React going to cost me?</a></li>
      </ul>

      <h2>Open source</h2>
      <ul>
        <li><a href="https://github.com/trifanio/react-hinge">React Hinge</a> - The fastest way to animate components in
          React
        </li>
        <li><i>(Coming soon)</i> A tiny router solution for layout animations in React</li>
      </ul>

      <h2>Connect</h2>

      <a href="javascript:;">nikita(at)trifan.io</a>

      <p>Austin Texas, {currentYear}</p>
    </>
  )
}

export default App
