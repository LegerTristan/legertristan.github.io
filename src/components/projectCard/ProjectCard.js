import React, { useRef, useState } from 'react';
import './ProjectCard.css';

function ProjectCard({ title, imgSrc, videoSrc, summary, details, joinRef }) {
  const videoRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <article className="project-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="project-visual-container">
        {videoSrc ? (
          <>
            <video ref={videoRef} src={videoSrc} loop muted playsInline />
            <div className="video-icon">
                <img src={process.env.PUBLIC_URL + "/resources/icons/iconVideo.png"} alt="Video" />
            </div>
          </>
        ) : (
          <img src={imgSrc} alt={title} />
        )}
        <div className="project-title-overlay">
          <h3>{title}</h3>
        </div>
      </div>

      <div className="project-info">
        <p className="project-summary">{summary}</p>
        
        <div className={`project-details ${isExpanded ? 'expanded' : ''}`}>
          {details}
        </div>
        
        <div className="project-actions">
          <button className="details-btn" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Réduire' : 'Détails'}
          </button>
          {joinRef && (
            <a href={joinRef} target="_blank" rel="noopener noreferrer" className="project-link">
              Lien
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;