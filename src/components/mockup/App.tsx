import { useState } from "react";
import { Search, MapPin, List, Map as MapIcon } from "lucide-react";
import FoodMap from "./components/FoodMap";
import { FoodEventsList } from "./components/FoodEventsList";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { foodEvents } from "./data/FoodEvent";

export interface FoodEvent {
  id: string;
  title: string;
  foodImage: string;
  lat: number;
  lng: number;
  description: string;
  time: string;
  category?: string;
  locationNotes?: string;
  organizer?: string;
}

// Distinct categories derived from your mock data
const categories = [
  "All",
  "Vegetarian",
  "Vegan / Halal",
  "Dessert",
  "Breakfast",
  "Snack",
  "High Perishability",
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const filteredEvents = foodEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full w-full max-w-full bg-gray-50 overflow-x-hidden">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 max-w-full">
        <div className="px-4 py-4 max-w-full">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-green-600" />
            <span className="text-gray-600">Stanford Campus</span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search free food events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 pb-3 overflow-x-auto overflow-y-hidden">
          <div className="flex gap-2 min-w-max">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer px-4 py-2"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="w-full bg-white border-b rounded-none h-12">
          <TabsTrigger value="events" className="flex-1">
            Events List
          </TabsTrigger>
          <TabsTrigger value="map" className="flex-1">
            Map View
          </TabsTrigger>
        </TabsList>

        {/* Event List */}
        <TabsContent value="events" className="px-4 mt-4 space-y-4 pb-20 max-w-full">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">
              {filteredEvents.length} food events found
            </p>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("map")}
              >
                <MapIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {viewMode === "list" ? (
            <FoodEventsList events={filteredEvents} />
          ) : (
            <div className="h-[calc(100vh-220px)] -mb-20">
              <FoodMap events={filteredEvents} />
            </div>
          )}
        </TabsContent>

        {/* Dedicated Map tab */}
        <TabsContent value="map" className="mt-0 pb-20">
          <div className="h-[calc(100vh-100px)]">
            <FoodMap events={filteredEvents} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
