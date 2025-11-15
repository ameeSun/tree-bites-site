import type { FoodEvent } from "../data/FoodEvent";
import { MapPin, Clock } from "lucide-react";
import { Badge } from "./ui/badge";

export const FoodEventsList = ({ events }: { events: FoodEvent[] }) => {
  if (!events.length)
    return (
      <div className="text-center py-12 text-gray-500">
        No free food events found
      </div>
    );

  return (
    <div className="space-y-5 w-full max-w-full">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-white rounded-3xl overflow-hidden shadow-sm border border-border/60 hover:shadow-xl transition-all duration-300"
        >
          {/* Image */}
          <div className="relative">
            <img
              src={event.foodImage}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            {event.category && (
              <div className="absolute bottom-3 left-3">
                <Badge variant="secondary" className="bg-white/95 text-foreground shadow-sm">
                  {event.category}
                </Badge>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-5 space-y-3">
            {/* Title and Organizer */}
            <div>
              <h3 className="font-semibold text-xl text-foreground">
                {event.title}
              </h3>
              {event.organizer && (
                <p className="text-sm text-muted-foreground italic mt-1">
                  Hosted by {event.organizer}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed">
              {event.description}
            </p>

            {/* Time and Location */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 text-sm">
              <div className="flex items-center gap-2 text-amber-700">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
              {event.locationNotes && (
                <div className="flex items-center gap-2 text-emerald-700">
                  <MapPin className="w-4 h-4" />
                  <span>{event.locationNotes}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
