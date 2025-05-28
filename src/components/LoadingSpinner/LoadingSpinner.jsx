import React from "react"
import "./LoadingSpinner.css"

const LoadingSpinner = () => {
  // We don't use the t function here since translations might not be loaded yet
  return (
    <div className="loading-spinner-container">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading SmartView Télé...</div>
      </div>
    </div>
  )
}

export default LoadingSpinner
