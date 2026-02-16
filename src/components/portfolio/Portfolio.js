import React, { useState, useEffect, useContext } from 'react';
import LanguageContext from '../languagesDropdown/LanguagesContext';
import ProjectCard from '../projectCard/ProjectCard';
import './Portfolio.css';

function Portfolio() {
  const { currentLanguage } = useContext(LanguageContext);
  const [texts, setTexts] = useState(Array(100).fill({}));

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "resources/json/Portfolio.json")
    .then(response => response.json())
    .then(data => setTexts(data[currentLanguage.value]))
    .catch(error => console.error(error));
  }, [currentLanguage]);

  const projects = [
    { 
        title: "Voice Converter", 
        img: "/resources/visuels/VoiceConverterVisuel.jpg", 
        link: "https://www.xandimmersion.com/tools",
        summary: texts[18]?.text,
        details: <>{texts[19]?.text} <br/> {texts[20]?.text}</>
    },
    { 
        title: "Ethermon", 
        img: "/resources/visuels/EthermonVisuel.png", 
        summary: texts[33]?.text,
        details: <>{texts[34]?.text} <br/> {texts[35]?.text}</>
    },
    { 
        title: "Diagen", 
        video: "/resources/videos/EvilLordPresentation.mp4",
        link: "https://www.xandimmersion.com/tools",
        summary: texts[21]?.text,
        details: <>{texts[22]?.text} <br/> {texts[23]?.text}</>
    },
    {
        title: "Geppetto", 
        video: "/resources/videos/GeppettoPresentation.mp4",
        link: "https://www.xandimmersion.com/tools",
        summary: texts[24]?.text,
        details: <>{texts[25]?.text} <br/> {texts[26]?.text}</>
    },
    { 
        title: "Outroad Fury", 
        video: "/resources/videos/OutroadFuryTrailer.mp4",
        link: "https://store.steampowered.com/app/2981030/OutRoad_Fury/",
        summary: texts[12]?.text,
        details: <>{texts[13]?.text} <br/> {texts[14]?.text}</>
    },
    { 
        title: "Unity Binded Graphics", 
        img: "/resources/visuels/UBGVisuel.jpg", 
        link: "https://github.com/LegerTristan/UnityBindedGraphics",
        summary: texts[27]?.text,
        details: <>{texts[28]?.text} <br/> {texts[29]?.text}</>
    },
    { 
        title: "Texture Combiner", 
        img: "/resources/visuels/TextureCombinerVisuel.png", 
        link: "https://github.com/LegerTristan/TextureCombiner", 
        summary: texts[30]?.text,
        details: <>{texts[31]?.text} <br/> {texts[32]?.text}</>
    },
    { 
        title: "AmongDefense", 
        img: "/resources/visuels/AmongDefenseVisuel.png", 
        summary: texts[3]?.text,
        details: <>{texts[4]?.text} <br/> {texts[5]?.text}</>
    },
    { 
        title: "Stress Test Pathfinding", 
        img: "/resources/visuels/STPVisuel.png", 
        link: "https://github.com/LegerTristan/StressTestPathfinding", 
        summary: texts[0]?.text,
        details: <>{texts[1]?.text} <br/> {texts[2]?.text}</>
    },
    { 
        title: "Dwarfender", 
        img: "/resources/visuels/DwarfenderVisuel.png", 
        video: "/resources/videos/DwarfenderTrailer.mp4", 
        link: "https://store.steampowered.com/app/2386590/Dwarfender/", 
        summary: texts[6]?.text,
        details: <>{texts[7]?.text} <br/> {texts[8]?.text}</>
    },
    { 
        title: "Canon", 
        img: "/resources/visuels/CanonVisuel.png", 
        link: "https://github.com/LegerTristan/Cannon", 
        summary: texts[15]?.text,
        details: <>{texts[16]?.text} <br/> {texts[17]?.text}</>
    },
    { 
        title: "SYRA", 
        img: "/resources/visuels/SYRAVisuel.jpg", 
        summary: texts[9]?.text,
        details: <>{texts[10]?.text} <br/> {texts[11]?.text}</>
    },
  ];

  return (
    <section className="portfolioSection">
      <div className="portfolio-grid">
        {projects.map((proj, index) => (
          <ProjectCard 
            key={index}
            title={proj.title}
            imgSrc={proj.img}
            videoSrc={proj.video}
            summary={proj.summary}
            details={proj.details}
            joinRef={proj.link}
          />
        ))}
      </div>
    </section>
  );
}

export default Portfolio;