import React, { useState, useEffect, useContext } from 'react'
import LanguageContext from '../languagesDropdown/LanguagesContext';
import Popup from '../popups/Popup';
import './Portfolio.css';

function Portfolio() {
  const { currentLanguage } = useContext(LanguageContext);
  const [texts, setTexts] = useState(Array(100).fill({}));
  const [selectedLineIndex, setSelectedLineIndex] = useState(null);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "resources/json/Portfolio.json")
    .then(response => response.json())
    .then(data => setTexts(data[currentLanguage.value]))
    .catch(error => console.error(error));
  }, [currentLanguage]);

  return (
      <section className="portfolioSection">
        <div className={`line ${selectedLineIndex === 1 ? 'Active' : ''}`}>
          <Popup title={"Unity Binded \nGraphics"} imgSrc={"/resources/visuels/UBGVisuel.jpg"} imgAlt={"Visual of Unity Binded Graphics"} videoSrc={null} 
            onPopupActivate={() => setSelectedLineIndex(1)} onPopupDeactivate={() => setSelectedLineIndex(0)} joinRef={null}>
            <p>
              {texts[28].text}<br/>
              {texts[29].text}<br/>
              {texts[30].text}
            </p>
          </Popup>
           
          <Popup title={"AmongDefense"} imgSrc={"/resources/visuels/AmongDefenseVisuel.png"} imgAlt={"Visual of AmongDefense"} videoSrc={null} 
          onPopupActivate={() => setSelectedLineIndex(1)} onPopupDeactivate={() => setSelectedLineIndex(0)} joinRef={null}>
            <p>
              {texts[3].text}<br/>
              {texts[4].text}<br/>
              {texts[5].text}
            </p> 
          </Popup>

          <Popup title={"Dwarfender"} imgSrc={"/resources/visuels/DwarfenderVisuel.png"} imgAlt={"Visual of Dwarfender"} videoSrc={"/resources/videos/DwarfenderTrailer.mp4"}
           onPopupActivate={() => setSelectedLineIndex(1)} onPopupDeactivate={() => setSelectedLineIndex(0)} joinRef={"https://store.steampowered.com/app/2386590/Dwarfender/"}>
            <p>
              {texts[6].text}<br />
              {texts[7].text}<br/>
              {texts[8].text}
            </p> 
          </Popup>
        </div>

        <div className={`line ${selectedLineIndex === 2 ? 'Active' : ''}`}>
          <Popup title={"Stress Test\nPathfinding"} imgSrc={"/resources/visuels/STPVisuel.png"} imgAlt={"Visual of Stress Test Pathfinding"} videoSrc={null} 
            onPopupActivate={() => setSelectedLineIndex(1)} onPopupDeactivate={() => setSelectedLineIndex(0)} joinRef={"https://github.com/LegerTristan/StressTestPathfinding"}>
            <p>
              {texts[0].text}<br/>
              {texts[1].text}<br/>
              {texts[2].text}
            </p>
          </Popup>

          <Popup title={"BowlingVR"} imgSrc={"/resources/visuels/BowlingVRVisuel.png"} imgAlt={"Visual of BowlingVR"} videoSrc={null} 
          onPopupActivate={() => setSelectedLineIndex(2)} onPopupDeactivate={() => setSelectedLineIndex(0)} joinRef={null}>
            <p>
              {texts[13].text}<br/>
              {texts[14].text}
            </p>
          </Popup>

          <Popup title={"Canon"} imgSrc={"/resources/visuels/CanonVisuel.png"} imgAlt={"Visual of Canon"} videoSrc={null} 
          onPopupActivate={() => setSelectedLineIndex(2)} onPopupDeactivate={() => setSelectedLineIndex(0)} joinRef={"https://github.com/LegerTristan/Cannon"}>
            <p>
              {texts[15].text}<br/>
              {texts[16].text}<br/>
              {texts[17].text}
            </p>
          </Popup>
        </div>

        <div className={`line ${selectedLineIndex === 3 ? 'Active' : ''}`}>
          <Popup title={"Monopoly"} imgSrc={"/resources/visuels/MonopolyVisuel.png"} imgAlt={"Visual of Monopoly"} videoSrc={null} 
          onPopupActivate={() => setSelectedLineIndex(3)} onPopupDeactivate={() => setSelectedLineIndex(0)} joinRef={null}>
            <p>
              {texts[18].text}<br/>
              {texts[19].text}
            </p>
          </Popup>

          <Popup title={"SYRA"} imgSrc={"/resources/visuels/SYRAVisuel.jpg"} imgAlt={"Visual of SYRA"} videoSrc={null}
           onPopupActivate={() => setSelectedLineIndex(2)} onPopupDeactivate={() => setSelectedLineIndex(0)} joinRef={null}>
            <p>
              {texts[9].text}<br />
              {texts[10].text}<br />
              {texts[11].text}<br />
              {texts[12].text}
            </p>
          </Popup>

          <Popup title={"Texture Combiner"} imgSrc={"/resources/visuels/TextureCombinerVisuel.png"} imgAlt={"Visual of Texture Combiner"} videoSrc={null} 
          onPopupActivate={() => setSelectedLineIndex(3)} onPopupDeactivate={() => setSelectedLineIndex(0)} joinRef={"https://github.com/LegerTristan/TextureCombiner"}>
            <p>
              {texts[22].text}<br/>
              {texts[23].text}<br/>
              {texts[24].text}
            </p>
          </Popup>
        </div>

        <div className={`line ${selectedLineIndex === 4 ? 'Active' : ''}`}>
        <Popup title={"Site"} imgSrc={"/resources/visuels/SiteVisuel.png"} imgAlt={"Visual of my site"} videoSrc={null} 
          onPopupActivate={() => setSelectedLineIndex(3)} onPopupDeactivate={() => setSelectedLineIndex(0)} joinRef={"https://github.com/LegerTristan/legertristan.github.io"}>
            <p>
              {texts[20].text}<br/>
              {texts[21].text}
            </p>  
          </Popup>

          <Popup title={"Game of Life"} imgSrc={"/resources/visuels/GOLVisuel.jpg"} imgAlt={"Visual of my Game of Life"} videoSrc={null}
          onPopupActivate={() => setSelectedLineIndex(4)} onPopupDeactivate={() => setSelectedLineIndex(0)} joinRef={null}>
            <p>
              {texts[25].text}<br/>
              {texts[26].text}<br />
              {texts[27].text}
            </p> 
          </Popup>
        </div>
      </section>
  );
}

export default Portfolio;
                