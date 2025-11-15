import { ArrowLeft, MapPin, Clock, Share2, Users } from "lucide-react";
import type { FoodEvent } from "../data/FoodEvent";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

interface FoodEventDetailProps {
  event: FoodEvent;
  onBack: () => void;
  onGetDirections?: () => void;
}

export function FoodEventDetail({ event, onBack, onGetDirections }: FoodEventDetailProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Image */}
      <div className="relative h-64">
        <img
          src={event.foodImage}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent">
          <Button
            variant="secondary"
            size="icon"
            className="w-9 h-9 rounded-full"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="w-9 h-9 rounded-full"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
        {event.category && (
          <div className="absolute bottom-4 left-4">
            <Badge variant="secondary" className="bg-white/95 text-foreground backdrop-blur-sm shadow-sm">
              {event.category}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 pb-24">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 text-foreground">{event.title}</h1>
          {event.organizer && (
            <div className="flex items-center gap-2 mb-3 text-muted-foreground">
              <Users className="w-4 h-4" />
              <p className="text-sm italic">Hosted by {event.organizer}</p>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-medium">{event.time}</span>
            </div>
            {event.locationNotes && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{event.locationNotes}</span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-foreground">About</h2>
          <p className="text-muted-foreground leading-relaxed">{event.description}</p>
        </div>

        {/* Info Cards */}
        <div className="space-y-3 mb-6">
          {event.locationNotes && (
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="text-foreground">{event.locationNotes}</p>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Available Until</p>
                <p className="text-foreground">{event.time}</p>
              </div>
            </div>
          </Card>

          {event.organizer && (
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Organizer</p>
                  <p className="text-foreground">{event.organizer}</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onGetDirections}>
            <MapPin className="w-4 h-4 mr-2" />
            Get Directions
          </Button>
          <Button className="flex-1" onClick={onGetDirections}>
            <Share2 className="w-4 h-4 mr-2" />
            Share Event
          </Button>
        </div>
      </div>
    </div>
  );
}

