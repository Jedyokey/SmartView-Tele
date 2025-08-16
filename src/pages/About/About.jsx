import React, { lazy, Suspense } from 'react';
import { FaPlay } from 'react-icons/fa';
import { useTVContext } from '../../context/TVContext';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import "./About.css";

// Lazy load heavy components with error handling
const VideoPlayer = lazy(() => import('../../components/VideoPlayer/VideoPlayer').catch(() => {
  // Fallback if VideoPlayer fails to load
  return { default: () => <div>Video player unavailable</div> };
}));

const About = ({ playState, setPlayState }) => {
  const { translations } = useTVContext();

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    console.warn('Image failed to load:', e.target.src);
  };

  // Simple fallback content
  if (!translations || !translations.about) {
    return (
      <div className="about-container">
        <div className="about-hero">
          <div className="hero-content">
            <h1>About SmartView Télé</h1>
            <p>Connecting the world through innovative technology</p>
          </div>
        </div>
        <section className="about-section story-section">
          <div className="section-content">
            <h2>Our Story</h2>
            <p>Founded in 2022, SmartView Télé began with a simple mission: to provide cutting-edge telecommunications products that enhance people's lives.</p>
          </div>
        </section>
      </div>
    );
  }

  const t = translations.about;

  return (
    <div className="about-container">
      <div className="about-hero">
        <div className="hero-content">
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
      </div>

      <section className="about-section story-section">
        <div className="section-content">
          <h2>{t.ourStory}</h2>
          <p>{t.storyText1}</p>
          <p>{t.storyText2}</p>
        </div>
        <div className="image-container">
          <img 
            src="https://res.cloudinary.com/dip0otvct/image/upload/f_auto,q_auto/v1749913084/About_-_Our_Story_bthrky.jpg" 
            alt="Our company history" 
            className="about-image" 
            loading="lazy"
            decoding="async"
            onError={handleImageError}
          />
        </div>
      </section>

      <section className="about-section mission-section">
        <div className="image-container">
          <img 
            src="https://res.cloudinary.com/dip0otvct/image/upload/f_auto,q_auto/v1749913106/About_-_Our_Mission_bjlhib.jpg" 
            alt="Our mission" 
            className="about-image" 
            loading="lazy"
            decoding="async"
            onError={handleImageError}
          />
        </div>
        <div className="section-content">
          <h2>{t.ourMission}</h2>
          <p>{t.missionText}</p>
          <ul>
            {t.missionPoints.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-section video-section">
        <h2>{t.videoTitle}</h2>
        <p>{t.videoText}</p>
        
        <div className="video-container">
          <div className="video-placeholder" onClick={() => setPlayState(true)}>
            <img 
              src="https://res.cloudinary.com/dip0otvct/image/upload/f_auto,q_auto/v1749913127/About_-_Video_Thumbnail_ibeolm.jpg" 
              alt="SmartView Télé video preview" 
              className="video-thumbnail" 
              loading="lazy"
              decoding="async"
              onError={handleImageError}
            />
            <div 
              className="play-button" 
              aria-label="Play Video"
              role="button"
              onClick={(e) => { 
                e.stopPropagation(); 
                setPlayState(true); 
              }}
            >
              <FaPlay />
            </div>
            <p>{t.videoLabel}</p>
          </div>
        </div>
        <Suspense fallback={<LoadingSpinner />}>
          {playState && (
            <VideoPlayer 
              playState={playState} 
              setPlayState={setPlayState} 
            />
          )}
        </Suspense>
      </section>

      <section className="about-section values-section">
        <h2>{t.ourValues}</h2>
        <div className="values-grid">
          {Object.entries(t.values).map(([key, value]) => (
            <div key={key} className="value-card">
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
