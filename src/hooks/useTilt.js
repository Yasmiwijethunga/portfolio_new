import { useState } from 'react'

const useTilt = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const ref = useState(null)[1]

  const handleMouseMove = (e) => {
    const element = e.currentTarget
    const rect = element.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotationX = (y - centerY) / 10
    const rotationY = (centerX - x) / 10

    setRotation({
      x: rotationX,
      y: rotationY,
    })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
  }

  return {
    handlers: { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave },
    rotation,
    ref,
  }
}

export default useTilt
