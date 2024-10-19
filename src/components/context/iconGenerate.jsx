import { MdOutlineAir, MdOutlineFax, MdAdfScanner } from "react-icons/md";
import { TfiBlackboard } from "react-icons/tfi";
import { AiFillPrinter } from "react-icons/ai";
import { LuProjector } from "react-icons/lu";

const getAmenityIcon = (amenityName) => {
  switch (amenityName) {
    case "Air Conditioner":
      return <MdOutlineAir className="text-2xl mr-2" />;
    case "Blackboard":
      return <TfiBlackboard className="text-2xl mr-2" />;
    case "Fax Machine":
      return <MdOutlineFax className="text-2xl mr-2" />;
    case "Printer":
      return <AiFillPrinter className="text-2xl mr-2" />;
    case "Projector":
      return <LuProjector className="text-2xl mr-2" />;
    case "Scanner":
      return <MdAdfScanner className="text-2xl mr-2" />;
    case "Whiteboard":
      return <TfiBlackboard className="text-2xl mr-2" />;
    default:
      return <RiHomeWifiLine className="text-2xl mr-2" />; // Default icon
  }
};

export { getAmenityIcon };
