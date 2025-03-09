import { useState, useEffect, useRef } from "react";
import heartImage from "../assets/images/soul.png"; // Undertale/Deltarune soul image
import selectItemSound from "../assets/soundeffects/snd_squeak.wav"; // Select item sound effect
import selectedSound from "../assets/soundeffects/snd_select_ch1.wav"; // Selected sound effect
import classNames from "classnames";

interface DeltaruneMenuProps {
  ch2menu: boolean;
}

const DeltaruneMenu : React.FC<DeltaruneMenuProps> = ({ ch2menu }) =>  {
  const [selectedSlot, setSelectedSlot] = useState(0);
  const selectedSlotRef = useRef(selectedSlot);
  const slots = ["WING GASTER", "[EMPTY]", "[EMPTY]"];
  const slotDetails = ["THE CORE", "___________", "___________"];
  const slotTimes = ["666:666", "--:--", "--:--"];
  const links = ["https://www.youtube.com/watch?v=B5nmMDOHsjc", "", ""];
  //const mainColor = ch2menu ? "#FFFFFF" : "#1be816";


  useEffect(() => {
    selectedSlotRef.current = selectedSlot;
  }, [selectedSlot]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      setSelectedSlot((prev) => {
        const newSlot = prev > 0 ? prev - 1 : slots.length - 1;
        console.log("ArrowUp pressed, new selectedSlot:", newSlot);
        return newSlot;
      });
      const audio = new Audio(selectItemSound);
      audio.volume = 0.2; // Set the volume lower
      audio.play();
    } else if (e.key === "ArrowDown") {
      setSelectedSlot((prev) => {
        const newSlot = prev < slots.length - 1 ? prev + 1 : 0;
        console.log("ArrowDown pressed, new selectedSlot:", newSlot);
        return newSlot;
      });
      const audio = new Audio(selectItemSound);
      audio.volume = 0.2; // Set the volume lower
      audio.play();
    } else if ( (e.key === "Enter" || e.key === "z") && (slots[selectedSlotRef.current] !== "[EMPTY]")) {
      console.log("Selected slot:", selectedSlotRef.current);
      const audio = new Audio(selectedSound);
      audio.volume = 0.2; // Set the volume lower
      audio.play();
      window.open(links[selectedSlotRef.current], "_blank");
    }
    else if (e.key === "Enter" || e.key === "z") {
      const audio = new Audio(selectedSound);
      audio.volume = 0.2; // Set the volume lower
      audio.play();
    }
  };
  

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={classNames(
      "flex flex-col items-center justify-center h-screen font-DeterminationMono",
      {
        "text-white": ch2menu,
        "text-[#1be816]": !ch2menu,
      }
    )}>
      {slots.map((slot, index) => (
        <div key={index} className={classNames(
          "border p-4 w-125 mb-2 flex items-center relative",
          {
            "bg-black/50": ch2menu,
            "bg-black": !ch2menu,
            "border-[#FFFFFF]": ch2menu,
            "border-[#1be816]": !ch2menu,
          }
        )}>
          <div className="absolute left-1.6 top-1/2 transform -translate-y-1/2 flex items-center">
            {selectedSlot === index && <img src={heartImage} alt="Heart" className="w-5 h-5 mr-2" />} 
          </div>
          <div className="flex flex-col w-full pl-8">
            <div className="flex justify-between">
              <span>{slot}</span>
              <span>{slotTimes[index]}</span>
            </div>
            <div className={classNames(
              {
                "text-[#1be816]": !ch2menu,
                "text-[#FFFFFF]": ch2menu,
              }
            )}>{slotDetails[index]}</div>
          </div>
        </div>
      ))}
      <div className={classNames(
        "mt-4 flex gap-22",
        {
          "text-white": ch2menu,
          "text-[#1be816]": !ch2menu,
        }
      )}>
        <span>COPY</span>
        <span>ERASE</span>
        <span>JAPANESE</span>
      </div>
    </div>
  );
};

export default DeltaruneMenu;