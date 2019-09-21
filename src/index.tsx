import * as React from "react"
import ReactDOM from "react-dom"
import { Frame, useAnimation, transform } from "framer"

import "./styles.css"

const phoneWidth = 300
const screenWidth = phoneWidth - 40
const screenHeight = (screenWidth * 2436) / 1125

function MapScreen(props) {
  return (
    <Frame
      background="url(https://cdn.glitch.com/071e5391-90f7-476b-b96c-1f51f7106b0c%2Fgmap.jpg)"
      width={screenWidth}
      height={screenHeight}
      style={{ backgroundSize: "cover" }}
      scale={1}
      x={0 - screenWidth}
      borderRadius={25}
      animate={props.backScreenAnimation}
    />
  )
}

function TwitterScreen(props) {
  return (
    <Frame
      background="url(https://cdn.glitch.com/071e5391-90f7-476b-b96c-1f51f7106b0c%2Ftwitter-screenshot.jpg)"
      width={screenWidth}
      height={screenHeight}
      style={{ backgroundSize: "cover", transformOrigin: "bottom" }}
      borderRadius={25}
      // scale={0.5}
      drag="y"
      dragElastic={false}
      dragConstraints={{ top: -200, bottom: 0 }}
      animate={props.twitterScreenAnimation}
      // Drag definition
      onDrag={function handleDrag(e, info) {
        // console.log(info.point.y)
        let screenScale = transform(info.point.y, [0, -200], [1, 0.5])
        props.twitterScreenAnimation.start({
          scale: screenScale,
          transition: { duration: 0.1 }
        })
      }}
      onDragEnd={function(e, info) {
        console.log(info.point.y)
        if (info.point.y < -140) {
          props.twitterScreenAnimation.start({
            scale: 0.75,
            y: -70,
            x: 50,
            transition: { ease: "easeOut" }
          })
          props.backScreenAnimation.start({
            scale: 0.75,
            y: 0,
            x: 100 - screenWidth,
            transition: { ease: "easeOut" }
          })
        } else {
          props.twitterScreenAnimation.start({
            scale: 1,
            y: 0,
            x: 0,
            transition: { ease: "easeOut" }
          })
          props.backScreenAnimation.start({
            scale: 1,
            y: 0,
            x: -100 - screenWidth,
            transition: { ease: "easeOut" }
          })
        }
      }}
    />
  )
}

function App() {
  const twitterScreenAnimation = useAnimation()
  const backScreenAnimation = useAnimation()

  return (
    <div className="App">
      {/* Phone frame */}
      <Frame
        width={phoneWidth}
        height={(phoneWidth * 1023) / 510}
        borderRadius={30}
        center
        background="url(https://cdn.glitch.com/071e5391-90f7-476b-b96c-1f51f7106b0c%2F510px-IPhone_X_vector.svg.png)"
        style={{ backgroundSize: "cover" }}
      >
        {/* Screen enclosure */}
        <Frame
          background="transparent"
          width={screenWidth}
          height={screenHeight}
          left={(phoneWidth - screenWidth) / 2}
          top={20}
          overflow="hidden"
          borderRadius={25}
        >
          <MapScreen backScreenAnimation={backScreenAnimation} />
          <TwitterScreen
            twitterScreenAnimation={twitterScreenAnimation}
            backScreenAnimation={backScreenAnimation}
          />
        </Frame>
      </Frame>
    </div>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
