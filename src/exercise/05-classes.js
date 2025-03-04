// useRef and useEffect: DOM interaction
// 💯 (alternate) migrate from classes
// http://localhost:3000/isolated/exercise/05-classes.js

import React from 'react'
import VanillaTilt from 'vanilla-tilt'

// class Tilt extends React.Component {
//   tiltRef = React.createRef()
//   componentDidMount() {
//     const tiltNode = this.tiltRef.current
//     const vanillaTiltOptions = {
//       max: 25,
//       speed: 400,
//       glare: true,
//       'max-glare': 0.5,
//     }
//     VanillaTilt.init(tiltNode, vanillaTiltOptions)
//   }
//   componentWillUnmount() {
//     this.tiltRef.current.vanillaTilt.destroy()
//   }
//   render() {
//     return (
//       <div ref={this.tiltRef} className="tilt-root">
//         <div className="tilt-child">{this.props.children}</div>
//       </div>
//     )
//   }
// }

function Tilt({children}) {
  const tiltRef = React.useRef()

  React.useEffect(() => {
    const tiltNode = tiltRef.current
    const vanillaTiltOptions = {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    }
    VanillaTilt.init(tiltNode, vanillaTiltOptions)
    return () => tiltNode.vanillaTilt.destroy()
  }, [])

  return (
    <div ref={tiltRef} className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
