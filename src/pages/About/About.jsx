import React, { lazy, Suspense } from 'react';
import smartview_video from "../../assets/smartview_video.mov";
import { FaPlay } from 'react-icons/fa';
import { useTVContext } from '../../context/TVContext';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import "./About.css";

// Lazy load heavy components
const VideoPlayer = lazy(() => import('../../components/VideoPlayer/VideoPlayer'));

const About = ({ playState, setPlayState }) => {
  const { translations } = useTVContext();
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
            src="https://i.pinimg.com/736x/d8/17/29/d8172984bb54dc8af11165c7e7bae97e.jpg" alt="Our company history" 
            className="about-image" 
            loading="lazy"  // Native lazy loading
            decoding="async" // Better performance
          />
        </div>
      </section>

      <section className="about-section mission-section">
        <div className="image-container">
          <img 
            src="https://i.pinimg.com/736x/91/bb/91/91bb917f284d871088a8467df0949046.jpg" alt="Our mission" 
            className="about-image" 
            loading="lazy"  // Native lazy loading
            decoding="async" // Better performance
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
              src="https://i.pinimg.com/736x/91/bb/91/91bb917f284d871088a8467df0949046.jpg" alt="SmartView Télé video preview" 
              className="video-thumbnail" 
              loading="lazy"  // Native lazy loading
              decoding="async" // Better performance
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
              video={smartview_video} 
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
