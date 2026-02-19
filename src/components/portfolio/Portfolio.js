import React from 'react';
import useTranslation from '../../hooks/useTranslation';
import ProjectCard from '../projectCard/ProjectCard';
import './Portfolio.css';

function Portfolio() {
  const texts = useTranslation('Portfolio');

  const projects = [
    { 
        title: "Voice Converter", 
        img: "/resources/visuels/VoiceConverterVisuel.jpg", 
        link: "https://www.xandimmersion.com/tools",
        tags: ["C++", "Unreal", "API RESTful", "Deep Learning"],
        summary: texts.VC_1,
        details: <>{texts.VC_2} <br/> {texts.VC_3}</>
    },
    { 
        title: "Ethermon", 
        img: "/resources/visuels/EthermonVisuel.png", 
        link: "https://github.com/LegerTristan/Ethermon",
        tags: ["C#", "Solidity", "Hardhat", "Unity"],
        summary: texts.ETH_1,
        details: <>{texts.ETH_2} <br/> {texts.ETH_3}</>
    },
    { 
        title: "Diagen", 
        video: "/resources/videos/EvilLordPresentation.mp4",
        link: "https://www.xandimmersion.com/tools",
        tags: ["C++", "Unreal", "Deep Learning"],
        summary: texts.DIA_1,
        details: <>{texts.DIA_2} <br/> {texts.DIA_3}</>
    },
    {
        title: "Geppetto", 
        video: "/resources/videos/GeppettoPresentation.mp4",
        link: "https://www.xandimmersion.com/tools",
        tags: ["C++", "Unreal", "UI/UX"],
        summary: texts.GEP_1,
        details: <>{texts.GEP_2} <br/> {texts.GEP_3}</>
    },
    { 
        title: "Outroad Fury", 
        video: "/resources/videos/OutroadFuryTrailer.mp4",
        link: "https://store.steampowered.com/app/2981030/OutRoad_Fury/",
        tags: ["C++", "Unreal", "AI"],
        summary: texts.OF_1,
        details: <>{texts.OF_2} <br/> {texts.OF_3}</>
    },
    { 
        title: "Unity Binded Graphics", 
        img: "/resources/visuels/UBGVisuel.jpg", 
        link: "https://github.com/LegerTristan/UnityBindedGraphics",
        tags: ["C#", "Unity", "Tool"],
        summary: texts.UBG_1,
        details: <>{texts.UBG_2} <br/> {texts.UBG_3}</>
    },
    { 
        title: "Texture Combiner", 
        img: "/resources/visuels/TextureCombinerVisuel.png", 
        link: "https://github.com/LegerTristan/TextureCombiner", 
        tags: ["C#", "WPF", "Tool"],
        summary: texts.TC_1,
        details: <>{texts.TC_2} <br/> {texts.TC_3}</>
    },
    { 
        title: "AmongDefense", 
        img: "/resources/visuels/AmongDefenseVisuel.png", 
        tags: ["C#", "Unity", "AR"],
        summary: texts.AD_1,
        details: <>{texts.AD_2} <br/> {texts.AD_3}</>
    },
    { 
        title: "Stress Test Pathfinding", 
        img: "/resources/visuels/STPVisuel.png", 
        link: "https://github.com/LegerTristan/StressTestPathfinding", 
        tags: ["C#", "Unity"],
        summary: texts.STP_1,
        details: <>{texts.STP_2} <br/> {texts.STP_3}</>
    },
    { 
        title: "Dwarfender", 
        img: "/resources/visuels/DwarfenderVisuel.png", 
        video: "/resources/videos/DwarfenderTrailer.mp4", 
        link: "https://store.steampowered.com/app/2386590/Dwarfender/", 
        tags: ["C++", "Unreal", "UI/UX"],
        summary: texts.D_1,
        details: <>{texts.D_2} <br/> {texts.D_3}</>
    },
    { 
        title: "Canon", 
        img: "/resources/visuels/CanonVisuel.png", 
        link: "https://github.com/LegerTristan/Cannon", 
        tags: ["C++", "SFML"],
        summary: texts.C_1,
        details: <>{texts.C_2} <br/> {texts.C_3}</>
    },
    { 
        title: "SYRA", 
        img: "/resources/visuels/SYRAVisuel.jpg", 
        tags: ["C#", "Unity", "AR"],
        summary: texts.SYRA_1,
        details: <>{texts.SYRA_2} <br/> {texts.SYRA_3}</>
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
            tags={proj.tags}
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