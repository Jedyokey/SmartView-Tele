import { useRef, useEffect } from "react"
import { FaTimes } from "react-icons/fa"
import "./VideoPlayer.css"

const VideoPlayer = ({ video, playState, setPlayState }) => {
  const videoRef = useRef(null)
  const playerRef = useRef(null)

  useEffect(() => {
    // Handle video play/pause based on state
    if (playState) {
      videoRef.current?.play().catch((err) => {
        console.error("Video play failed:", err)
        // Some browsers require user interaction before playing
        // We'll keep the player open so user can click play manually
      })

      // Prevent body scrolling when video is open
      document.body.style.overflow = "hidden"
    } else {
      videoRef.current?.pause()
      document.body.style.overflow = ""
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = ""
    }
  }, [playState])

  const handleClose = (e) => {
    // Close when clicking outside the video or on the close button
    if (e.target === playerRef.current || e.target.classList.contains("close-btn") || e.target === e.currentTarget) {
      setPlayState(false)
    }
  }

  // Handle ESC key to close video
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && playState) {
        setPlayState(false)
      }
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [playState, setPlayState])

  return (
    <div className={`video-player ${playState ? "" : "hide"}`} ref={playerRef} onClick={handleClose}>
      <button className="close-button" onClick={() => setPlayState(false)} aria-label="Close video">
        <FaTimes />
      </button>
      <video
        ref={videoRef}
        src={video}
        controls
        controlsList="nodownload"
        onClick={(e) => e.stopPropagation()} // Prevent clicks on video from closing
      />
    </div>
  )
}

export default VideoPlayer
