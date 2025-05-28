import "./LanguageLoader.css"

const LanguageLoader = ({ targetLanguage, currentLanguage }) => {
  // Get loading messages based on target language
  const getLoadingMessage = () => {
    if (targetLanguage === "fr") {
      return {
        primary: "Chargement du contenu français...",
        secondary: "Veuillez patienter",
      }
    } else {
      return {
        primary: "Loading English content...",
        secondary: "Please wait",
      }
    }
  }

  const messages = getLoadingMessage()

  return (
    <div className="language-loader-overlay">
      <div className="language-loader-content">
        {/* Custom spinner with language indicator */}
        <div className="language-spinner-container">
          <div className="language-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="language-indicator">{targetLanguage?.toUpperCase()}</div>
          </div>
        </div>

        {/* Loading text */}
        <div className="language-loading-text">
          <h3 className="loading-primary">{messages.primary}</h3>
          <p className="loading-secondary">{messages.secondary}</p>
        </div>

        {/* Progress bar */}
        <div className="language-progress-container">
          <div className="language-progress-bar">
            <div className="language-progress-fill"></div>
          </div>
        </div>

        {/* Language transition indicator */}
        <div className="language-transition">
          <span className="current-lang">{currentLanguage?.toUpperCase()}</span>
          <div className="transition-arrow">
            <span>→</span>
          </div>
          <span className="target-lang">{targetLanguage?.toUpperCase()}</span>
        </div>
      </div>
    </div>
  )
}

export default LanguageLoader
