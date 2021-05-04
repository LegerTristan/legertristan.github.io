import './App.css';
import Popup from './components/Popup';
import ImageWDsc from './components/ImageWDsc';
import AnimatedBackground from './components/AnimatedBackground';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useState } from 'react';


import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

AOS.init();

function App() {
  const matches = useMediaQuery('(min-width:1280px)');
  const [buttonPopup, setButtonPopup] = useState(false)
  const [buttonPopupII, setButtonPopupII] = useState(false)
  const [buttonPopupIII, setButtonPopupIII] = useState(false)
  const [buttonPopupIV, setButtonPopupIV] = useState(false)
  const [buttonPopupV, setButtonPopupV] = useState(false)
  const [buttonPopupVI, setButtonPopupVI] = useState(false)
  const [buttonPopupVII, setButtonPopupVII] = useState(false)
  const [buttonPopupVIII, setButtonPopupVIII] = useState(false)
  const [buttonPopupIX, setButtonPopupIX] = useState(false)
  const [buttonPopupX, setButtonPopupX] = useState(false)
  const [buttonPopupXI, setButtonPopupXI] = useState(false)
  var ReactRotatingText = require('react-rotating-text');

  return (
    <div className="App">
      <main>
        {matches && (
          <aside style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + "/images/fd_Menu.jpg"})`
            }}>
            <nav className="Pf_Menu">
              <ul>
                <li>
                  <a className="MenuLink" href="#SectionPresentation">
                    <img src={process.env.PUBLIC_URL + "/images/accolade_L.png"} alt=" "/>
                    <p>PRÉSENTATION</p>
                    <img src={process.env.PUBLIC_URL + "/images/accolade_R.png"} alt=" "/>
                  </a>
                </li>
                <li>
                  <a className="MenuLink" href="#SectionParcours">
                    <img src={process.env.PUBLIC_URL + "/images/accolade_L.png"} alt=" "/>
                    <p>PARCOURS</p>
                    <img src={process.env.PUBLIC_URL + "/images/accolade_R.png"} alt=" "/>
                  </a>
                </li>
                <li>
                  <a className="MenuLink" href="#SectionProjets" rel="noopener noreferrer">
                    <img src={process.env.PUBLIC_URL + "/images/accolade_L.png"} alt=" "/>
                    <p>PROJETS</p>
                    <img src={process.env.PUBLIC_URL + "/images/accolade_R.png"} alt=" "/>
                  </a>
                </li>
                <li>
                  <a href="mailto:tristan.leger.87@gmail.com" className="MenuLink">
                    <img src={process.env.PUBLIC_URL + "/images/accolade_L.png"} alt=" "/>
                    <p>CONTACT</p>
                    <img src={process.env.PUBLIC_URL + "/images/accolade_R.png"} alt=" "/>
                  </a>
                </li>
                <li>
                  <a href={process.env.PUBLIC_URL + "/pdf/CV.pdf"} target="_blank" rel="noopener noreferrer" className="MenuLink">
                    <img src={process.env.PUBLIC_URL + "/images/accolade_L.png"} alt=" "/>
                      <p>CV</p>
                    <img src={process.env.PUBLIC_URL + "/images/accolade_R.png"} alt=" "/></a>
                </li>
              </ul>
            </nav>
          </aside>
        )}

        {matches && (
          <section id="SectionPresentation"> 
            <article className="DivTest">
              <video autoPlay loop muted width="100%">
                <source src={process.env.PUBLIC_URL + "/images/extrait.mp4"} type="video/mp4" />
                <p>Ce navigateur ne supporte aucun des formats vidéo proposé par le site.</p>
              </video>
                    
              <ReactRotatingText 
                items={['Étudiant', 'Sens de l\'organisation', 'Créatif', 'Autodidacte', 'Force de proposition']}
                emptyPause={50}
              />
            </article>
          </section>
        )}

        {!matches && (
          <section id="SectionPresentationMobile"> 
            <article className="DivTest">
              <video autoPlay loop muted width="100%">
                <source src={process.env.PUBLIC_URL + "/images/extrait.mp4"} type="video/mp4" />
                <p>Ce navigateur ne supporte aucun des formats vidéo proposé par le site.</p>
              </video>
                    
              <ReactRotatingText 
                items={['Étudiant', 'Sens de l\'organisation', 'Créatif', 'Autodidacte', 'Force de proposition']}
                emptyPause={50}
              />
            </article>
          </section>
        )}

        {matches && (
          <section id="SectionParcours">
            <article>
              <ImageWDsc isInvert={false} banner={process.env.PUBLIC_URL + "/images/BannerParentheseV2.jpg"}>
                <h3>Développeur Unity</h3>
                <h4>- Parenthèse Numérique, Saint-Yrieix la Perche -</h4>
                <p>
                  SYRA est un jeu d’aventure et d’énigme proposant de découvrir le patrimoine et l’histoire de Saint-Yrieix la Perche via des activités ludiques et interactives.<br />
                  L'application utilise le principe de tracking d'images fourni par la réalité augmentée pour visiter la ville tout en progressant dans son histoire. <br />
                  J'ai pu participé à la réalisation du jeu, de sa conception à sa communication en passant par sa production également. <br />
                  Mon principal rôle dans le projet était de développer les mécanismes du projet, de délimiter la partie technique également, mais aussi de combiner l'ensemble des ressources pour produire le jeu. <br />
                  J'ai également pu contribuer à la distribution de l'application, ainsi qu'à sa conception en prenant l'initiative de proposer du contenu attrayant et des fonctionnalités ergonomiques. <br/>
                </p>
              </ImageWDsc>
              <ImageWDsc isInvert={true} banner={process.env.PUBLIC_URL + "/images/BannerIUTV2.jpg"}>
                <h3>Diplôme Universitaire de Technologie <br />
                    Informatique</h3>
                <h4>- IUT du Limousin, Limoges -</h4>
                <p> 
                  J'y ai appris les bases de la programmation, du réseau et de la méthodologie agiles à travers plusieurs exercices théoriques et pratiques. <br />
                  Durant la deuxième année, les cours m'ont permis d'approfondir mes connaissances dans les technologies du Web et les bases de données. <br />
                  J'ai également pu développer des compétences transversales grâce aux cours de communications, d'anglais et de gestion de projets.
                </p>
              </ImageWDsc>
              <ImageWDsc isInvert={false} banner={process.env.PUBLIC_URL + "/images/BannerDarnetV2.jpg"}>
                <h3>Baccalauréat Scientifique</h3>
                <h4>- Lycée Jean-Baptiste Darnet, Saint-Yrieix la Perche -</h4>
                <p> 
                  J'y ai abordé les notions élémentaires telles que la philosophie, l'histoire et les langues étrangères. <br />
                  Je me suis également spécialisé dans les matières scientifiques, à savoir : Mathématiques, Physique-Chimie et Sciences Vie de la Terre. <br />
                </p>
              </ImageWDsc>
            </article>
          </section>
        )}

        {!matches && (
          <section id="SectionParcoursMobile">
            <article>
              <ImageWDsc isInvert={false} banner={process.env.PUBLIC_URL + "/images/BannerParentheseV2.jpg"}>
                <h3>Développeur Unity</h3>
                <h4>- Parenthèse Numérique, Saint-Yrieix la Perche -</h4>
                <div className="scrollViewImage">
                  <p>
                    SYRA est un jeu d’aventure et d’énigme proposant de découvrir le patrimoine et l’histoire de Saint-Yrieix la Perche via des activités ludiques et interactives.<br />
                    L'application utilise le principe de tracking d'images fourni par la réalité augmentée pour visiter la ville tout en progressant dans son histoire. <br />
                    J'ai pu participé à la réalisation du jeu, de sa conception à sa communication en passant par sa production également. <br />
                    Mon principal rôle dans le projet était de développer les mécanismes du projet, de délimiter la partie technique également, mais aussi de combiner l'ensemble des ressources pour produire le jeu. <br />
                    J'ai également pu contribuer à la distribution de l'application, ainsi qu'à sa conception en prenant l'initiative de proposer du contenu attrayant et des fonctionnalités ergonomiques. <br/>
                  </p>
                </div> 
              </ImageWDsc>
              <ImageWDsc isInvert={true} banner={process.env.PUBLIC_URL + "/images/BannerIUTV2.jpg"}>
                <h3>Diplôme Universitaire de Technologie <br />
                    Informatique</h3>
                <h4>- IUT du Limousin, Limoges -</h4>
                <div className="scrollViewImage">
                  <p> 
                    J'y ai appris les bases de la programmation, du réseau et de la méthodologie agiles à travers plusieurs exercices théoriques et pratiques. <br />
                    Durant la deuxième année, les cours m'ont permis d'approfondir mes connaissances dans les technologies du Web et les bases de données. <br />
                    J'ai également pu développer des compétences transversales grâce aux cours de communications, d'anglais et de gestion de projets.
                  </p>
                </div> 
              </ImageWDsc>
              <ImageWDsc isInvert={false} banner={process.env.PUBLIC_URL + "/images/BannerDarnetV2.jpg"}>
                <h3>Baccalauréat Scientifique</h3>
                <h4>- Lycée Jean-Baptiste Darnet, Saint-Yrieix la Perche -</h4>
                <div className="scrollViewImage">
                  <p> 
                    J'y ai abordé les notions élémentaires telles que la philosophie, l'histoire et les langues étrangères. <br />
                    Je me suis également spécialisé dans les matières scientifiques, à savoir : Mathématiques, Physique-Chimie et Sciences Vie de la Terre. <br />
                  </p>
                </div> 
              </ImageWDsc>
            </article>
          </section>
        )}

      {matches && (
        <section id="SectionProjets">
            <AnimatedBackground>
              <h3>Découvrez-moi à travers mes projets</h3>
              <p>Une liste non-exhaustive des projets auxquels j'ai participé, du plus récent au plus ancien.</p>
                <div class="line">
                  <a style={{backgroundColor: '#00FF00'}} onClick={() => setButtonPopupVI(true)}>
                      <img src={process.env.PUBLIC_URL + "/images/logoSyra_visuel.jpg"} alt="SYRA"/>
                      <p>SYRA</p>
                  </a>

                  <Popup trigger={buttonPopupVI} setTrigger={setButtonPopupVI} color={'#00FF00'}>
                    <div className="toolsIcon">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeUnity.png"} alt="Unity" title="Unity"/>
                      <img src={process.env.PUBLIC_URL + "/icones/iconeARCore.png"} alt="Google ARCore" title="Google ARCore"/>
                    </div>
                    <img src={process.env.PUBLIC_URL + "/icones/iconeJoindreRefus.png"} alt="Impossible de télécharger le projet" title="Impossible de télécharger le projet" className="imgJoin"/>
                    <h2>SYRA</h2>
                    <img src={process.env.PUBLIC_URL + "/images/logoSyra_visuel.jpg"} alt="SYRA"/>
                    <p>
                      SYRA est un jeu d’aventure et d’énigmes proposant de découvrir le patrimoine et l’histoire de la ville de Saint-Yrieix la Perche via des activités ludiques et interactives. <br />
                      Le but du jeu est de partir à la recherche du buste d'Arédius, relique se trouvant au musée de New York, dans le centre-ville de Saint-Yrieix en passant par des lieux culturelles et historiques. <br />
                      Via la réalité augmentée, il est possible de scanner des images pour déclencher une énigme. <br />
                      Il faut alors résoudre l'énigme en trouvant les indices présents sur le lieu et en accomplissant des minis-jeux !
                    </p>
                  </Popup>


                  <a style={{backgroundColor: '#336699'}} onClick={() => setButtonPopupX(true)}>
                    <img src={process.env.PUBLIC_URL + "/images/siteV2_visuel.JPG"} alt="Scènes"/>
                    <p>Site V2</p>
                  </a>
                  
                  <Popup trigger={buttonPopupX} setTrigger={setButtonPopupX} color={'#336699'}>
                    <div className="toolsIcon">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeReact.png"} alt="React.js" title="React.js"/>
                    </div>
                    <a className="imgJoin" href="https://github.com/LegerTristan/SiteV2" target="_blank" rel="noopener noreferrer">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeJoindre.png"} alt="Télécharger le projet" title="Télécharger le projet"  />
                    </a>
                    <h2>Site V2</h2>
                    <img src={process.env.PUBLIC_URL + "/images/siteV2_visuel.JPG"} alt="Scènes réalisées sur Unreal Engine 4"/>
                    <p>En restant sur la même technologie que pour la première version de mon site, j'ai refait ma vitrine numérique en prenant un design
                      me correspondant plus que l'ancien. <br />
                      Comparé à l'ancienne version, je suis parti sur une landing page misant plus sur le design et les informations essentielles
                      de mon parcours. <br />
                      J'ai ainsi fait l'impasse sur le contenu détaillé et la précision des informations pour un contenu plus fluide et digeste.
                      </p>
                  </Popup>

                  <a style={{backgroundColor: '#92CD00'}} onClick={() => setButtonPopupXI(true)}>
                    <img src={process.env.PUBLIC_URL + "/images/GOL_visuel.JPG"} alt="Jeu de la vie"/>
                    <p>Jeu de la vie</p>
                  </a>

                  <Popup trigger={buttonPopupXI} setTrigger={setButtonPopupXI} color={'#92CD00'}>
                    <div className="toolsIcon">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeUnity.png"} alt="Unity" title="Unity"/>
                    </div>
                    <img src={process.env.PUBLIC_URL + "/icones/iconeJoindreRefus.png"} alt="Impossible de télécharger le projet" title="Impossible de télécharger le projet" className="imgJoin"/>
                    <h2>Jeu de la vie</h2>
                    <img src={process.env.PUBLIC_URL + "/images/GOL_visuel.JPG"} alt="CookingMoona"/>
                    <p>Le jeu de la vie est une application que j'ai eu à réaliser à l'occasion d'un test pour une école. <br/>
                      Il s'agit d'une version modifiée du célèbre automate cellulaire de John Conway. Dans cette version,
                      on imagine des animaux et des végétaux plutôt que des cellules. <br />
                      Cette version était un excellent entraînement à la programmation orienté objet, à travers ce projet,
                      j'ai pu appliquer mes connaissances sur les principes de l'orienté objet (encapsulation, héritage etc) et en même temps
                      tester des nouveaux patterns de conception, dont l'Object Pooling , très utilisé dans l'univers du jeux-vidéo.
                      </p>
                  </Popup>  
                </div>


                <div class="line">
                <a style={{backgroundColor: '#FFA500'}} onClick={() => setButtonPopupVIII(true)}>
                    <img src={process.env.PUBLIC_URL + "/images/scenes_visuel.png"} alt="Scènes"/>
                    <p>Scènes</p>
                  </a>
                  
                  <Popup trigger={buttonPopupVIII} setTrigger={setButtonPopupVIII} color={'#FFA500'}>
                    <div className="toolsIcon">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeUE.png"} alt="Unreal Engine 4" title="UE4"/>
                    </div>
                    <img src={process.env.PUBLIC_URL + "/icones/iconeJoindreRefus.png"} alt="Impossible de télécharger le projet" title="Impossible de télécharger le projet" className="imgJoin"/>
                    <h2>Scènes Unreal Engine 4</h2>
                    <img src={process.env.PUBLIC_URL + "/images/scenes_visuel.png"} alt="Scènes réalisées sur Unreal Engine 4"/>
                    <p>Lors de l'été 2020, j'ai décidé de prendre en main l'un des moteurs de jeu les plus célèbres : Unreal Engine 4. <br />
                          Unreal Engine 4 permet, entre autres, de créer des jeux-vidéos, des films, 
                          de réaliser une présentation marketing ou encore l'architecture d'un lieu. <br />
                          Dans le cadre de mon projet professionnel, j'ai suivi un cours pour apprendre à me servir du moteur et, 
                          à la fin de ce cours, j'ai eu l'occasion de produire une scène grâce aux divers outils que proposent Unreal Engine, 
                          notamment la pose procédurale et le contrôle de la lumière indirecte.
                      </p>
                  </Popup>

                  <a style={{backgroundColor: '#9400D3'}} onClick={() => setButtonPopupIX(true)}>
                    <img src={process.env.PUBLIC_URL + "/images/cookingMoona_visuel.jpg"} alt="CookingMoona"/>
                    <p>CookingMoona</p>
                  </a>

                  <Popup trigger={buttonPopupIX} setTrigger={setButtonPopupIX} color={'#9400D3'}>
                    <div className="toolsIcon">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeJava.png"} alt="Java" title="Java"/>
                      <img src={process.env.PUBLIC_URL + "/icones/iconeAndroidStudio.png"} alt="AndroidStudio" title="AndroidStudio"/>
                    </div>
                    <img src={process.env.PUBLIC_URL + "/icones/iconeJoindreRefus.png"} alt="Impossible de télécharger le projet" title="Impossible de télécharger le projet" className="imgJoin"/>
                    <h2>CookingMoona</h2>
                    <img src={process.env.PUBLIC_URL + "/images/cookingMoona_visuel.jpg"} alt="CookingMoona"/>
                    <p>CookingMoona est une application permettant de créer ses propres recettes et d'y accéder à tout moment via son téléphone 
                        et une base de données locale <br />
                        Pour le bon fonctionnement de l'application, seul l'accès au stockage externe est requis afin de pouvoir y enregistrer 
                        les recettes <br />
                        Je voulais également rendre possible l'utilisation de l'application sans avoir besoin d'une connexion Internet afin 
                        que l'utilisateur puisse y accéder dans n'importe quelle situation. <br />
                      </p>
                  </Popup> 


                  <a style={{backgroundColor: '#FF00FF'}} onClick={() => setButtonPopup(true)}>
                    <img src={process.env.PUBLIC_URL + "/images/souvenange_visuel.jpg"} alt="Souvenange"/>
                    <p>Souvenange</p>
                  </a>

                  <Popup trigger={buttonPopup} setTrigger={setButtonPopup} color={'#FF00FF'}>
                    <div className="toolsIcon">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeReact.png"} alt="React" title="React"/>
                      <img src={process.env.PUBLIC_URL + "/icones/iconeRedux.png"} alt="Redux" title="Redux"/>
                    </div>
                    <img src={process.env.PUBLIC_URL + "/icones/iconeJoindreRefus.png"} alt="Impossible de télécharger le projet" title="Impossible de télécharger le projet" className="imgJoin"/>
                    <h2>Souvenange</h2>
                    <img src={process.env.PUBLIC_URL + "/images/souvenange_visuel.jpg"} alt="Souvenange"/>
                    <p>Lors de ma deuxième année de DUT Informatique, je suis intervenu en tant que chef de projet
                      dans une équipe de 5 personnes, moi inclus. <br />
                      Dans le cadre d'un projet tuteuré, nous avons dû réaliser la refonte du site de l'association Souvenange,
                      une association qui accompagne les familles dans le deuil périnatal par la photographie.
                      En raison d'une augmentation constante du nombre de visiteurs sur leur site, nous avons dû procéder
                      à une amélioration graphique pour mieux guider les utilisateurs vers le formulaire de contact.<br />
                      Également, nous devions ajouter des fonctionnalités au site via l'outil React afin de faciliter la
                      communication entre la secrétaire de l'association et les bénévoles.
                    </p>
                  </Popup>
                </div>


                <div class="line">
                <a style={{backgroundColor: '#FF0000'}} onClick={() => setButtonPopupIV(true)}>
                    <img src={process.env.PUBLIC_URL + "/images/wroom_visuel.png"} alt="Wroom"/>
                    <p>Wroom</p>
                  </a>

                  <Popup trigger={buttonPopupIV} setTrigger={setButtonPopupIV} color={'#FF0000'}>
                    <div className="toolsIcon">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeNodeJS.png"} alt="NodeJS" title="NodeJS"/>
                    </div>
                    <a className="imgJoin" href="https://github.com/LegerTristan/Wroom" target="_blank" rel="noopener noreferrer">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeJoindre.png"} alt="Télécharger le projet" title="Télécharger le projet"  />
                    </a>
                    <h2>Wroom</h2>
                    <img src={process.env.PUBLIC_URL + "/images/wroom_visuel.png"} alt="Wroom"/>
                    <p>Site web réalisé en NodeJS avec les bibliothèques Express et Handlebars pour reprendre le principe du pattern MVC (Modèle - Vue - Contrôleur) <br />
                      Il concerne les pilotes de F1 et permet à l'utilisateur de consulter la liste des pilotes, 
                      de voir les écuries participantes au grand prix ainsi que leur sponsor, l'utilisateur peut aussi accéder aux
                      derniers grand prix et leur résultat.<br />
                      J'ai réalisé ce projet au cours de ma deuxième année à l'IUT du Limousin afin d'apprendre à utiliser le Javascript 
                      côté serveur mais également d'étendre mes outils en programmation Web.
                    </p>
                  </Popup>


                  <a style={{backgroundColor: '#CDFFFF'}} onClick={() => setButtonPopupV(true)}>
                    <img src={process.env.PUBLIC_URL + "/images/onlineJudge_visuel.jpg"} alt="OnlineJudge"/>
                    <p>Online Judge</p>
                  </a>

                  <Popup trigger={buttonPopupV} setTrigger={setButtonPopupV} color={'#CDFFFF'}>
                    <div className="toolsIcon">
                      <img src={process.env.PUBLIC_URL + "/icones/iconePython.png"} alt="Python" title="Python"/>
                    </div>
                    <a className="imgJoin" href="https://github.com/LegerTristan/OnlineJudge" target="_blank" rel="noopener noreferrer">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeJoindre.png"} alt="Télécharger le projet" title="Télécharger le projet"  />
                    </a>
                    <h2>OnlineJudge</h2>
                    <img src={process.env.PUBLIC_URL + "/images/onlineJudge_visuel.jpg"} alt="OnlineJudge"/>
                    <p>Divers problèmes disponibles sur le site UVAJudge réalisé en Python durant ma seconde année de DUT Informatique. <br />
                          Une fois les problèmes réalisés, je devais les soumettre à un juge afin de vérifier que tous les cas possibles sont traités, 
                          qu'il n'y a pas d'erreur de compilation, que le temps d'exécution du programme est bon etc. <br />
                    </p>
                  </Popup>


                  <a style={{backgroundColor: '#0000FF'}} onClick={() => setButtonPopupII(true)}>
                    <img src={process.env.PUBLIC_URL + "/images/memoryFX_visuel.png"} alt="MemoryFX"/>
                    <p>MemoryFX</p>
                  </a>

                  <Popup trigger={buttonPopupII} setTrigger={setButtonPopupII} color={'#0000FF'}>
                    <div className="toolsIcon">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeJava.png"} alt="Java" title="Java / JavaFX"/>
                    </div>
                    <a className="imgJoin" href="https://github.com/LegerTristan/MemoryFX" target="_blank" rel="noopener noreferrer">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeJoindre.png"} alt="Télécharger le projet" title="Télécharger le projet"  />
                    </a>
                    <h2>MemoryFX</h2>
                    <img src={process.env.PUBLIC_URL + "/images/memoryFX_visuel.png"} alt="MemoryFX"/>
                    <p>MemoryFX est tout simplement un memory, un jeu de mémoire où le but est de retrouver toutes les pairs avec le nombre de coups le plus minime possible. <br />
                          J'ai réalisé ce projet avec la bibliothèque JavaFX lors des vacances d'été 2019 dans le but de me challenger, seul, sur le développement
                          d'une petite application, notamment en passant par sa conception.</p>
                  </Popup>
                </div>

                <div class="line">
                <a style={{backgroundColor: '#FFFF00'}} onClick={() => setButtonPopupIII(true)}>
                    <img src={process.env.PUBLIC_URL + "/images/dicoFX_visuel.png"} alt="DicoFX"/>
                    <p>DicoFX</p>
                  </a>

                  <Popup trigger={buttonPopupIII} setTrigger={setButtonPopupIII} color={'#FFFF00'}>
                    <div className="toolsIcon">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeJava.png"} alt="Java" title="Java / JavaFX"/>
                    </div>
                    <a className="imgJoin" href="https://github.com/LegerTristan/DicoFX" target="_blank" rel="noopener noreferrer">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeJoindre.png"} alt="Télécharger le projet" title="Télécharger le projet"  />
                    </a>
                    <h2>DicoFX</h2>
                    <img src={process.env.PUBLIC_URL + "/images/dicoFX_visuel.png"} alt="DicoFX"/>
                    <p>Dictionnaire où l'on saisit ces définitions et on peut les réviser via un système de note. <br />
                          Développé seul en JavaFX durant les vacances d'été 2019. <br />
                          Ce dictionnaire permet de définir un mot dans un vocabulaire plus approprié à soi et de le ranger dans une catégorie, celle-ci sont sauvegardés automatiquement dans l'application. <br/>
                          Une fois rangée dans une catégorie, on peut se rendre dans le menu Révision et réviser la catégorie que l'on souhaite, les mots seront affichés
                          un par un à votre écran et vous devrez alors réécrire la définition exacte du mot. <br />
                      </p>
                  </Popup>


                  <a style={{backgroundColor: '#A0552D'}} onClick={() => setButtonPopupVII(true)}>
                    <img src={process.env.PUBLIC_URL + "/images/biblio_visuel.jpg"} alt="Bibliothèque"/>
                    <p>Bibliothèque</p>
                  </a>

                  <Popup trigger={buttonPopupVII} setTrigger={setButtonPopupVII} color={'#A0552D'}>
                    <div className="toolsIcon">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeCPlusPlus.png"} alt="C++" title="C++"/>
                    </div>
                    <a className="imgJoin" href="https://github.com/LegerTristan/Bibliotheque" target="_blank" rel="noopener noreferrer">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeJoindre.png"} alt="Télécharger le projet" title="Télécharger le projet"  />
                    </a>
                    <h2>Bibliothèque</h2>
                    <img src={process.env.PUBLIC_URL + "/images/biblio_visuel.jpg"} alt="Bibliothèque"/>
                      <p>Il s'agit du premier projet que j'ai développé à l'IUT du Limousin en 2018. <br />
                          J'ai réalisé ce projet en duo avec un camarade de promotion, l'objectif était de créer une application 
                          de gestion des livres<br />
                          Nous devions également rajouter des fonctionnalités imaginées par nous-même afin de personnaliser notre travail 
                          par rapport aux autres étudiants.
                      </p>
                  </Popup>
                </div>
            </AnimatedBackground>
          </section>
        )}

      {!matches && (
        <section id="SectionProjetsMobile">
            <AnimatedBackground>
              <h3>Découvrez-moi à travers mes projets</h3>
              <p>Une liste non-exhaustive des projets auxquels j'ai participé, du plus récent au plus ancien.</p>
                <div class="lineMobile">
                  <a style={{backgroundColor: '#00FF00'}} onClick={() => setButtonPopupVI(true)}>
                      <img src={process.env.PUBLIC_URL + "/images/logoSyra_visuel.jpg"} alt="SYRA"/>
                      <p>SYRA</p>
                  </a>

                  <Popup trigger={buttonPopupVI} setTrigger={setButtonPopupVI} color={'#00FF00'}>
                    <div className="toolsIcon">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeUnity.png"} alt="Unity" title="Unity"/>
                      <img src={process.env.PUBLIC_URL + "/icones/iconeARCore.png"} alt="Google ARCore" title="Google ARCore"/>
                    </div>
                    <img src={process.env.PUBLIC_URL + "/icones/iconeJoindreRefus.png"} alt="Impossible de télécharger le projet" title="Impossible de télécharger le projet" className="imgJoin"/>
                    <h2>SYRA</h2>
                    <img src={process.env.PUBLIC_URL + "/images/logoSyra_visuel.jpg"} alt="SYRA"/>
                    <div className="scrollView">
                      <p>
                        SYRA est un jeu d’aventure et d’énigmes proposant de découvrir le patrimoine et l’histoire de la ville de Saint-Yrieix la Perche via des activités ludiques et interactives. <br />
                        Le but du jeu est de partir à la recherche du buste d'Arédius, relique se trouvant au musée de New York, dans le centre-ville de Saint-Yrieix en passant par des lieux culturelles et historiques. <br />
                        Via la réalité augmentée, il est possible de scanner des images pour déclencher une énigme. <br />
                        Il faut alors résoudre l'énigme en trouvant les indices présents sur le lieu et en accomplissant des minis-jeux !
                      </p>
                    </div>
                  </Popup>


                  <a style={{backgroundColor: '#336699'}} onClick={() => setButtonPopupX(true)}>
                    <img src={process.env.PUBLIC_URL + "/images/siteV2_visuel.jpg"} alt="Scènes"/>
                    <p>Site V2</p>
                  </a>
                  
                  <Popup trigger={buttonPopupX} setTrigger={setButtonPopupX} color={'#336699'}>
                    <div className="toolsIcon">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeReact.png"} alt="React.js" title="React.js"/>
                    </div>
                    <a className="imgJoin" href="https://github.com/LegerTristan/SiteV2" target="_blank" rel="noopener noreferrer">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeJoindre.png"} alt="Télécharger le projet" title="Télécharger le projet"  />
                    </a>
                    <h2>Site V2</h2>
                    <img src={process.env.PUBLIC_URL + "/images/siteV2_visuel.jpg"} alt="Scènes réalisées sur Unreal Engine 4"/>
                    <div className="scrollView">
                      <p>En restant sur la même technologie que pour la première version de mon site, j'ai refait ma vitrine numérique en prenant un design
                        me correspondant plus que l'ancien. <br />
                        Comparé à l'ancienne version, je suis parti sur une landing page misant plus sur le design et les informations essentielles
                        de mon parcours. <br />
                        J'ai ainsi fait l'impasse sur le contenu détaillé et la précision des informations pour un contenu plus fluide et digeste.
                      </p>
                    </div> 
                  </Popup>
                </div>


                <div class="lineMobile">
                  <a style={{backgroundColor: '#92CD00'}} onClick={() => setButtonPopupXI(true)}>
                    <img src={process.env.PUBLIC_URL + "/images/GOL_visuel.jpg"} alt="Jeu de la vie"/>
                    <p>Jeu de la vie</p>
                  </a>

                  <Popup trigger={buttonPopupXI} setTrigger={setButtonPopupXI} color={'#92CD00'}>
                    <div className="toolsIcon">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeUnity.png"} alt="Unity" title="Unity"/>
                    </div>
                    <img src={process.env.PUBLIC_URL + "/icones/iconeJoindreRefus.png"} alt="Impossible de télécharger le projet" title="Impossible de télécharger le projet" className="imgJoin"/>
                    <h2>Jeu de la vie</h2>
                    <img src={process.env.PUBLIC_URL + "/images/GOL_visuel.jpg"} alt="CookingMoona"/>
                    <div className="scrollView">
                      <p>Le jeu de la vie est une application que j'ai eu à réaliser à l'occasion d'un test pour une école. <br/>
                        Il s'agit d'une version modifiée du célèbre automate cellulaire de John Conway. Dans cette version,
                        on imagine des animaux et des végétaux plutôt que des cellules. <br />
                        Cette version était un excellent entraînement à la programmation orienté objet, à travers ce projet,
                        j'ai pu appliquer mes connaissances sur les principes de l'orienté objet (encapsulation, héritage etc) et en même temps
                        tester des nouveaux patterns de conception, dont l'Object Pooling , très utilisé dans l'univers du jeux-vidéo.
                      </p>
                    </div>
                  </Popup>
                  
                  <a style={{backgroundColor: '#FFA500'}} onClick={() => setButtonPopupVIII(true)}>
                    <img src={process.env.PUBLIC_URL + "/images/scenes_visuel.png"} alt="Scènes"/>
                    <p>Scènes</p>
                  </a>
                  
                  <Popup trigger={buttonPopupVIII} setTrigger={setButtonPopupVIII} color={'#FFA500'}>
                    <div className="toolsIcon">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeUE.png"} alt="Unreal Engine 4" title="UE4"/>
                    </div>
                    <img src={process.env.PUBLIC_URL + "/icones/iconeJoindreRefus.png"} alt="Impossible de télécharger le projet" title="Impossible de télécharger le projet" className="imgJoin"/>
                    <h2>Scènes Unreal Engine 4</h2>
                    <img src={process.env.PUBLIC_URL + "/images/scenes_visuel.png"} alt="Scènes réalisées sur Unreal Engine 4"/>
                    <div className="scrollView">
                      <p>Lors de l'été 2020, j'ai décidé de prendre en main l'un des moteurs de jeu les plus célèbres : Unreal Engine 4. <br />
                          Unreal Engine 4 permet, entre autres, de créer des jeux-vidéos, des films, 
                          de réaliser une présentation marketing ou encore l'architecture d'un lieu. <br />
                          Dans le cadre de mon projet professionnel, j'ai suivi un cours pour apprendre à me servir du moteur et, 
                          à la fin de ce cours, j'ai eu l'occasion de produire une scène grâce aux divers outils que proposent Unreal Engine, 
                          notamment la pose procédurale et le contrôle de la lumière indirecte.
                      </p>
                    </div>
                  </Popup>
                </div>


                <div class="lineMobile">
                  <a style={{backgroundColor: '#9400D3'}} onClick={() => setButtonPopupIX(true)}>
                    <img src={process.env.PUBLIC_URL + "/images/cookingMoona_visuel.jpg"} alt="CookingMoona"/>
                    <p>CookingMoona</p>
                  </a>

                  <Popup trigger={buttonPopupIX} setTrigger={setButtonPopupIX} color={'#9400D3'}>
                    <div className="toolsIcon">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeJava.png"} alt="Java" title="Java"/>
                      <img src={process.env.PUBLIC_URL + "/icones/iconeAndroidStudio.png"} alt="AndroidStudio" title="AndroidStudio"/>
                    </div>
                    <img src={process.env.PUBLIC_URL + "/icones/iconeJoindreRefus.png"} alt="Impossible de télécharger le projet" title="Impossible de télécharger le projet" className="imgJoin"/>
                    <h2>CookingMoona</h2>
                    <img src={process.env.PUBLIC_URL + "/images/cookingMoona_visuel.jpg"} alt="CookingMoona"/>
                    <div className="scrollView">
                      <p>CookingMoona est une application permettant de créer ses propres recettes et d'y accéder à tout moment via son téléphone 
                        et une base de données locale <br />
                        Pour le bon fonctionnement de l'application, seul l'accès au stockage externe est requis afin de pouvoir y enregistrer 
                        les recettes <br />
                        Je voulais également rendre possible l'utilisation de l'application sans avoir besoin d'une connexion Internet afin 
                        que l'utilisateur puisse y accéder dans n'importe quelle situation. <br />
                      </p>
                    </div>
                  </Popup> 

                  <a style={{backgroundColor: '#FF00FF'}} onClick={() => setButtonPopup(true)}>
                    <img src={process.env.PUBLIC_URL + "/images/souvenange_visuel.jpg"} alt="Souvenange"/>
                    <p>Souvenange</p>
                  </a>

                  <Popup trigger={buttonPopup} setTrigger={setButtonPopup} color={'#FF00FF'}>
                    <div className="toolsIcon">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeReact.png"} alt="React" title="React"/>
                      <img src={process.env.PUBLIC_URL + "/icones/iconeRedux.png"} alt="Redux" title="Redux"/>
                    </div>
                    <img src={process.env.PUBLIC_URL + "/icones/iconeJoindreRefus.png"} alt="Impossible de télécharger le projet" title="Impossible de télécharger le projet" className="imgJoin"/>
                    <h2>Souvenange</h2>
                    <img src={process.env.PUBLIC_URL + "/images/souvenange_visuel.jpg"} alt="Souvenange"/>
                    <div className="scrollView">
                      <p>Lors de ma deuxième année de DUT Informatique, je suis intervenu en tant que chef de projet
                        dans une équipe de 5 personnes, moi inclus. <br />
                        Dans le cadre d'un projet tuteuré, nous avons dû réaliser la refonte du site de l'association Souvenange,
                        une association qui accompagne les familles dans le deuil périnatal par la photographie.
                        En raison d'une augmentation constante du nombre de visiteurs sur leur site, nous avons dû procéder
                        à une amélioration graphique pour mieux guider les utilisateurs vers le formulaire de contact.<br />
                        Également, nous devions ajouter des fonctionnalités au site via l'outil React afin de faciliter la
                        communication entre la secrétaire de l'association et les bénévoles.
                      </p>
                    </div>
                  </Popup>
                </div>

                <div class="lineMobile">
                  <a style={{backgroundColor: '#FF0000'}} onClick={() => setButtonPopupIV(true)}>
                    <img src={process.env.PUBLIC_URL + "/images/wroom_visuel.png"} alt="Wroom"/>
                    <p>Wroom</p>
                  </a>

                  <Popup trigger={buttonPopupIV} setTrigger={setButtonPopupIV} color={'#FF0000'}>
                    <div className="toolsIcon">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeNodeJS.png"} alt="NodeJS" title="NodeJS"/>
                    </div>
                    <a className="imgJoin" href="https://github.com/LegerTristan/Wroom" target="_blank" rel="noopener noreferrer">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeJoindre.png"} alt="Télécharger le projet" title="Télécharger le projet"  />
                    </a>
                    <h2>Wroom</h2>
                    <img src={process.env.PUBLIC_URL + "/images/wroom_visuel.png"} alt="Wroom"/>
                    <div className="scrollView">
                      <p>Site web réalisé en NodeJS avec les bibliothèques Express et Handlebars pour reprendre le principe du pattern MVC (Modèle - Vue - Contrôleur) <br />
                        Il concerne les pilotes de F1 et permet à l'utilisateur de consulter la liste des pilotes, 
                        de voir les écuries participantes au grand prix ainsi que leur sponsor, l'utilisateur peut aussi accéder aux
                        derniers grand prix et leur résultat.<br />
                        J'ai réalisé ce projet au cours de ma deuxième année à l'IUT du Limousin afin d'apprendre à utiliser le Javascript 
                        côté serveur mais également d'étendre mes outils en programmation Web.
                      </p>
                    </div>
                  </Popup>


                  <a style={{backgroundColor: '#CDFFFF'}} onClick={() => setButtonPopupV(true)}>
                    <img src={process.env.PUBLIC_URL + "/images/onlineJudge_visuel.jpg"} alt="OnlineJudge"/>
                    <p>Online Judge</p>
                  </a>

                  <Popup trigger={buttonPopupV} setTrigger={setButtonPopupV} color={'#CDFFFF'}>
                    <div className="toolsIcon">
                      <img src={process.env.PUBLIC_URL + "/icones/iconePython.png"} alt="Python" title="Python"/>
                    </div>
                    <a className="imgJoin" href="https://github.com/LegerTristan/OnlineJudge" target="_blank" rel="noopener noreferrer">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeJoindre.png"} alt="Télécharger le projet" title="Télécharger le projet"  />
                    </a>
                    <h2>OnlineJudge</h2>
                    <img src={process.env.PUBLIC_URL + "/images/onlineJudge_visuel.jpg"} alt="OnlineJudge"/>
                    <div className="scrollView">
                      <p>Divers problèmes disponibles sur le site UVAJudge réalisé en Python durant ma seconde année de DUT Informatique. <br />
                          Une fois les problèmes réalisés, je devais les soumettre à un juge afin de vérifier que tous les cas possibles sont traités, 
                          qu'il n'y a pas d'erreur de compilation, que le temps d'exécution du programme est bon etc. <br />
                      </p>
                    </div>
                  </Popup>
                </div>

                <div class="lineMobile">
                  <a style={{backgroundColor: '#0000FF'}} onClick={() => setButtonPopupII(true)}>
                    <img src={process.env.PUBLIC_URL + "/images/memoryFX_visuel.png"} alt="MemoryFX"/>
                    <p>MemoryFX</p>
                  </a>

                  <Popup trigger={buttonPopupII} setTrigger={setButtonPopupII} color={'#0000FF'}>
                    <div className="toolsIcon">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeJava.png"} alt="Java" title="Java / JavaFX"/>
                    </div>
                    <a className="imgJoin" href="https://github.com/LegerTristan/MemoryFX" target="_blank" rel="noopener noreferrer">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeJoindre.png"} alt="Télécharger le projet" title="Télécharger le projet"  />
                    </a>
                    <h2>MemoryFX</h2>
                    <img src={process.env.PUBLIC_URL + "/images/memoryFX_visuel.png"} alt="MemoryFX"/>
                    <div className="scrollView">
                      <p>MemoryFX est tout simplement un memory, un jeu de mémoire où le but est de retrouver toutes les pairs avec le nombre de coups le plus minime possible. <br />
                          J'ai réalisé ce projet avec la bibliothèque JavaFX lors des vacances d'été 2019 dans le but de me challenger, seul, sur le développement
                          d'une petite application, notamment en passant par sa conception.
                      </p>
                    </div>
                  </Popup>
                  
                  <a style={{backgroundColor: '#FFFF00'}} onClick={() => setButtonPopupIII(true)}>
                    <img src={process.env.PUBLIC_URL + "/images/dicoFX_visuel.png"} alt="DicoFX"/>
                    <p>DicoFX</p>
                  </a>

                  <Popup trigger={buttonPopupIII} setTrigger={setButtonPopupIII} color={'#FFFF00'}>
                    <div className="toolsIcon">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeJava.png"} alt="Java" title="Java / JavaFX"/>
                    </div>
                    <a className="imgJoin" href="https://github.com/LegerTristan/DicoFX" target="_blank" rel="noopener noreferrer">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeJoindre.png"} alt="Télécharger le projet" title="Télécharger le projet"  />
                    </a>
                    <h2>DicoFX</h2>
                    <img src={process.env.PUBLIC_URL + "/images/dicoFX_visuel.png"} alt="DicoFX"/>
                    <div className="scrollView">
                      <p>Dictionnaire où l'on saisit ces définitions et on peut les réviser via un système de note. <br />
                          Développé seul en JavaFX durant les vacances d'été 2019. <br />
                          Ce dictionnaire permet de définir un mot dans un vocabulaire plus approprié à soi et de le ranger dans une catégorie, celle-ci sont sauvegardés automatiquement dans l'application. <br/>
                          Une fois rangée dans une catégorie, on peut se rendre dans le menu Révision et réviser la catégorie que l'on souhaite, les mots seront affichés
                          un par un à votre écran et vous devrez alors réécrire la définition exacte du mot. <br />
                      </p>
                    </div>
                  </Popup>
                </div>

                <div class="lineMobile">
                  <a style={{backgroundColor: '#A0552D'}} onClick={() => setButtonPopupVII(true)}>
                    <img src={process.env.PUBLIC_URL + "/images/biblio_visuel.jpg"} alt="Bibliothèque"/>
                    <p>Bibliothèque</p>
                  </a>

                  <Popup trigger={buttonPopupVII} setTrigger={setButtonPopupVII} color={'#A0552D'}>
                    <div className="toolsIcon">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeCPlusPlus.png"} alt="C++" title="C++"/>
                    </div>
                    <a className="imgJoin" href="https://github.com/LegerTristan/Bibliotheque" target="_blank" rel="noopener noreferrer">
                      <img src={process.env.PUBLIC_URL + "/icones/iconeJoindre.png"} alt="Télécharger le projet" title="Télécharger le projet"  />
                    </a>
                    <h2>Bibliothèque</h2>
                    <img src={process.env.PUBLIC_URL + "/images/biblio_visuel.jpg"} alt="Bibliothèque"/>
                    <div className="scrollView">
                      <p>Il s'agit du premier projet que j'ai développé à l'IUT du Limousin en 2018. <br />
                          J'ai réalisé ce projet en duo avec un camarade de promotion, l'objectif était de créer une application 
                          de gestion des livres<br />
                          Nous devions également rajouter des fonctionnalités imaginées par nous-même afin de personnaliser notre travail 
                          par rapport aux autres étudiants.
                      </p>
                    </div>
                  </Popup>
                </div>
            </AnimatedBackground>
          </section>
        )}


      {matches && (
        <section id="SectionContact">
          <article 
            data-aos="zoom-in"
            >
            <h3>Envie de créer une application ? Un jeu ? N'attendez plus !</h3>
            <h4>Contactez-moi !</h4>
            <div>
              <div>
                <img src={process.env.PUBLIC_URL + "/icones/iconeMail.png"} alt="Mail : " title="Mail : "/>
                <a href="mailto:tristan.leger.87@gmail.com">tristan.leger.87@gmail.com</a>
              </div>
              <div>
              <img src={process.env.PUBLIC_URL + "/icones/iconeTel.png"} alt="Tel : " title="Tel : "/>
                <p>+33.7.69.40.80.09</p>
              </div>
            </div>
          </article>
        </section>
      )}

      {!matches && (
        <section id="SectionContactMobile">
          <article 
            data-aos="zoom-in"
            >
            <h3>Envie de créer une application ? Un jeu ? N'attendez plus !</h3>
            <h4>Contactez-moi !</h4>
            <div>
              <div>
                <img src={process.env.PUBLIC_URL + "/icones/iconeMail.png"} alt="Mail : " title="Mail : "/>
                <a href="mailto:tristan.leger.87@gmail.com">tristan.leger.87@gmail.com</a>
              </div>
              <div>
              <img src={process.env.PUBLIC_URL + "/icones/iconeTel.png"} alt="Tel : " title="Tel : "/>
                <p>+33.7.69.40.80.09</p>
              </div>
            </div>
          </article>
        </section>
        )}
      </main>
    </div>
  );
}

export default App;