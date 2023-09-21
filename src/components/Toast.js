import { useState, useEffect } from "react"


const Toast = ({ message, triggered })=> {
  // toast appears on click, then disappears after 3 seconds
  // toast appears on click, then disappears after 3 seconds
 
  const [showToast, setShowToast] = useState(false)
  const [timer, setTimer] = useState(null)
  // listen for triggered prop to change
  useEffect(() => {
    if (triggered) {
      setShowToast(true)
    }
  }, [triggered])

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 3000)
      setTimer(timer)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [showToast])

  return (
    <>
    {showToast && (
      <div className="toast">
        <p>{message}</p>
      </div>
    )}
    </>
  )
 
}