import React from "react"
import { useTVContext } from "../../context/TVContext"
import "./LanguageToggle.css"

const LanguageToggle = () => {
  const { language, switchLanguageWithLoading, languageLoading } = useTVContext()

  const changeLanguage = (lang) => {
    if (lang !== language && !languageLoading) {
      // Keep your original localStorage key
      localStorage.setItem("preferredLanguage", lang)
      switchLanguageWithLoading(lang)
    }
  }

  return (
    <div className="language-toggle">
      <button
        className={`language-btn ${language === "en" ? "active" : ""} ${languageLoading ? "loading" : ""}`}
        onClick={() => changeLanguage("en")}
        aria-label="Switch to English"
        disabled={languageLoading}
      >
        EN
      </button>
      <span className="separator">|</span>
      <button
        className={`language-btn ${language === "fr" ? "active" : ""} ${languageLoading ? "loading" : ""}`}
        onClick={() => changeLanguage("fr")}
        aria-label="Switch to French"
        disabled={languageLoading}
      >
        FR
      </button>
    </div>
  )
}

export default LanguageToggle
