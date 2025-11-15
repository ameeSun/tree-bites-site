import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { FoodEvent } from "../data/FoodEvent";
import { foodEvents } from "../data/FoodEvent";

// Stanford campus center coordinates
const stanfordCenter: [number, number] = [37.4275, -122.1697];

// Create custom icon for markers using divIcon
const createCustomIcon = (imageUrl: string, title: string) => {
  return divIcon({
    html: `
      <div class="relative" style="display: flex; align-items: center; justify-content: center;">
        <div class="w-16 h-16 rounded-full border-[3px] border-emerald-300 bg-white shadow-lg overflow-hidden" style="display: flex; align-items: center; justify-content: center;">
          <img src="${imageUrl}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover; object-position: center;" />
        </div>
        <div class="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center border-2 border-white shadow" style="display: flex; align-items: center; justify-content: center;">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 14px; height: 14px;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>
    `,
    className: "custom-marker",
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -64],
  });
};

const FoodMap = ({ events = foodEvents }: { events?: FoodEvent[] }) => {
  return (
    <div className="relative h-full w-full max-w-full min-h-[500px] rounded-[32px] overflow-hidden border border-emerald-100 shadow-inner">
      <MapContainer
        center={stanfordCenter}
        zoom={16}
        className="h-full w-full rounded-[32px] z-0"
        scrollWheelZoom={false}
        {...({ attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>' } as any)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          {...({ attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' } as any)}
        />
        {events.map((event) => (
          <Marker
            key={event.id}
            position={[event.lat, event.lng]}
            {...({ icon: createCustomIcon(event.foodImage, event.title) } as any)}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold text-sm mb-1">{event.title}</h3>
                <p className="text-xs text-gray-600">{event.description}</p>
                {event.locationNotes && (
                  <p className="text-xs text-gray-500 mt-1">{event.locationNotes}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default FoodMap;
