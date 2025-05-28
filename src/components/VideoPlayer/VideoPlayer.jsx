import React from "react";
import { useRef, useEffect } from "react"
import { FaTimes } from "react-icons/fa"
import "./VideoPlayer.css"

const VideoPlayer = ({ video, playState, setPlayState }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    if (playState) {
      videoRef.current?.play().catch((err) => {
        console.error("Autoplay blocked:", err)
      })
      document.body.style.overflow = "hidden"
    } else {
      videoRef.current?.pause()
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [playState])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setPlayState(false)
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [setPlayState])

  const handleOverlayClick = (e) => {
    // Close if clicked on the overlay (not video-wrapper)
    // OR if clicked on an element with class "close-button"
    const clickedOverlay = e.target.classList.contains("video-player")
    const clickedCloseBtn = e.target.closest(".close-button")
    if (clickedOverlay || clickedCloseBtn) {
      setPlayState(false)
    }
  }

  return (
    <div
      className={`video-player ${playState ? "" : "hide"}`}
      onClick={handleOverlayClick}
    >
      <button
        className="close-button"
        aria-label="Close video"
      >
        <FaTimes />
      </button>

      <div className="video-wrapper">
        <video
          ref={videoRef}
          src={video}
          controls
          controlsList="nodownload"
        />
      </div>
    </div>
  )
}

export default VideoPlayer
