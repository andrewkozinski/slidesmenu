import './App.css'
import DeltaruneMenu from './components/DeltaruneMenu.tsx'
import bgMusicCh1 from './assets/soundeffects/mainmenu.mp3'
import bgMusicCh2 from './assets/soundeffects/Before the Story.mp3'
import bgVideo from './assets/images/fountainmenu.mp4'
import { useEffect, useRef, useState } from 'react'
import {setTitle} from './other funcs/pagefuncs.ts'
import {setFavicon} from './other funcs/pagefuncs.ts'
import icon from './assets/images/soul.png'

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [endMenu, setEndMenu] = useState(false);

  // Set the volume of the audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
    }
  }, []);

  // Add event listener for keydown to start audio
  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    };

    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('mousedown', handleInteraction);

    return () => {
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('mousedown', handleInteraction);
    };
  }, []);

  // Set the title and favicon
  setTitle("Deltarune Main Menu");
  setFavicon(icon);

  return (
    <>
      <div className={`main-body ${endMenu ? "ch2" : ""}`}>
        
        {/* Chapter complete fountain background. Does not display when Chapter 1 menu is enabled. */}
        <video preload="auto" autoPlay muted loop id={`video-bg`} className={`${endMenu ? "" : "vanish"}`}>
          <source src={bgVideo} />
          Your browser does not support the video tag.
        </video>

        <audio id="music" ref={audioRef} src={ endMenu ? bgMusicCh2 : bgMusicCh1} autoPlay loop />
        <DeltaruneMenu ch2menu={endMenu}/>

        {/* Toggle switch between chapter 1 and chapter complete main menus. Make this ruins switch eventually?*/}
        <div className="slider-container">
          <label className="switch">
            <input type="checkbox" checked={endMenu} onChange={() => setEndMenu(!endMenu)} />
            <span className="slider round"></span>
          </label>
        </div>

      </div>
    </>
  )
}

export default App
