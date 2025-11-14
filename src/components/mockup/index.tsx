import { useState } from "react";
import { Search, MapPin, List, Map } from "lucide-react";
import FoodMap from "./components/FoodMap";
import { FoodEventsList } from "./components/FoodEventsList";
import { foodEvents } from "./data/FoodEvent";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";

// Distinct categories derived from the mock data
const categories = [
  "All",
  "Vegetarian",
  "Vegan / Halal",
  "Dessert",
  "Breakfast",
  "Snack",
  "High Perishability",
  "Low Supply",
  "Vegetarian / Halal",
];

export default function TreeBitesMockup() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [tabValue, setTabValue] = useState<"events" | "map">("events");

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground">Stanford Campus</span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
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
        <div className="px-4 pb-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 whitespace-nowrap"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={tabValue} onValueChange={(val) => setTabValue(val as "events" | "map")} className="w-full">
        <TabsList className="w-full bg-card border-b rounded-none h-12">
          <TabsTrigger value="events" className="flex-1">
            Events List
          </TabsTrigger>
          <TabsTrigger value="map" className="flex-1">
            Map View
          </TabsTrigger>
        </TabsList>

        {/* Event List */}
        <TabsContent value="events" className="px-4 mt-4 space-y-4 pb-20">
          <div className="flex items-center justify-between mb-2">
            <p className="text-muted-foreground text-sm">
              {filteredEvents.length} food event{filteredEvents.length !== 1 ? "s" : ""} found
            </p>
            <div className="flex gap-2">
              <Button
                variant={tabValue === "events" ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setTabValue("events")}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={tabValue === "map" ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setTabValue("map")}
                aria-label="Map view"
              >
                <Map className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <FoodEventsList events={filteredEvents} />
        </TabsContent>

        {/* Map View */}
        <TabsContent value="map" className="mt-0 pb-20">
          <div className="h-[calc(100vh-200px)] w-full">
            <FoodMap events={filteredEvents} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
