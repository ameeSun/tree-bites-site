import { MapPin } from "lucide-react";
import type { FoodEvent } from "../data/FoodEvent";
import { foodEvents } from "../data/FoodEvent";

const positions = [
  { top: "15%", left: "20%" },
  { top: "30%", left: "60%" },
  { top: "60%", left: "25%" },
  { top: "65%", left: "70%" },
  { top: "40%", left: "80%" },
  { top: "75%", left: "50%" },
  { top: "20%", left: "75%" },
  { top: "55%", left: "10%" },
];

const FoodMap = ({ events = foodEvents }: { events?: FoodEvent[] }) => {
  const displayEvents = events.slice(0, positions.length);
  
  return (
    <div className="relative h-full w-full max-w-full min-h-[500px] rounded-[32px] bg-gradient-to-b from-white to-emerald-50 shadow-inner border border-emerald-100 overflow-hidden">
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(23,199,111,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(23,199,111,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Food Event Markers */}
      {displayEvents.map((event, index) => {
        const position = positions[index % positions.length];
        return (
          <div
            key={event.id}
            className="absolute flex flex-col items-center gap-2 text-center z-10"
            style={{ top: position.top, left: position.left, transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative group">
              <div className="w-16 h-16 rounded-full border-[3px] border-emerald-300 bg-white shadow-lg overflow-hidden">
                <img 
                  src={event.foodImage} 
                  alt={event.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center border-2 border-white shadow">
                <MapPin className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="text-xs font-semibold text-emerald-900 bg-white/90 px-3 py-1 rounded-full shadow whitespace-nowrap max-w-[120px] truncate">
              {event.title}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default FoodMap;
