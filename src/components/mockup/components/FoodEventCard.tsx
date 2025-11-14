import { Clock, MapPin } from "lucide-react";
import type { FoodEvent } from "../data/FoodEvent";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface FoodEventCardProps {
  event: FoodEvent;
  onClick?: () => void;
}

export function FoodEventCard({ event, onClick }: FoodEventCardProps) {
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 border-border/50"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 bg-muted">
        <img
          src={event.foodImage}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        {event.category && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-white/95 text-foreground backdrop-blur-sm shadow-sm">
              {event.category}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title and Organizer */}
        <div>
          <h3 className="font-semibold text-lg text-foreground mb-1">
            {event.title}
          </h3>
          {event.organizer && (
            <p className="text-sm text-muted-foreground italic">
              Hosted by {event.organizer}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {event.description}
        </p>

        {/* Time and Location */}
        <div className="flex flex-wrap items-center gap-4 pt-2 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>{event.time}</span>
          </div>
          {event.locationNotes && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="line-clamp-1">{event.locationNotes}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

