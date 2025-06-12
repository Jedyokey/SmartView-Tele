import React from "react"
import { useTranslation } from "react-i18next"
import "./LoadingSpinner.css"

const LoadingSpinner = () => {
  const { t, i18n } = useTranslation()
  
  // Use translation if available, otherwise fallback to English
  const loadingText = i18n.isInitialized 
    ? t("common.loadingApp") 
    : "Loading SmartView Télé..."

  return (
    <div className="loading-spinner-container">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <div className="loading-text">{loadingText}</div>
      </div>
    </div>
  )
}

export default LoadingSpinner
