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
  
  export const foodEvents: FoodEvent[] = [
    {
      id: "1",
      title: "Leftover Burrito Bowls",
      foodImage: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&q=80",
      lat: 37.4275,
      lng: -122.1770,
      description: "Chicken and veggie burrito bowls from our CS Club meeting. Still warm!",
      time: "Available for ~40 more minutes",
      category: "High Perishability",
      locationNotes: "Third floor lounge, near the elevators at Huang Engineering Center",
      organizer: "Stanford CS Club"
    },
    {
      id: "2",
      title: "Veggie Sushi Platters",
      foodImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
      lat: 37.4300,
      lng: -122.1730,
      description: "Assorted veggie sushi from a recruiting event. All vegetarian!",
      time: "Available for ~30 more minutes",
      category: "Vegetarian",
      locationNotes: "First floor commons at Gates Computer Science",
      organizer: "Gates Hall"
    },
    {
      id: "3",
      title: "Pizza Slices",
      foodImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80",
      lat: 37.4265,
      lng: -122.1698,
      description: "Cheese and veggie pizza from study session — still plenty left.",
      time: "Available until 6:30 PM",
      category: "Low Supply",
      locationNotes: "Second floor lounge, Old Union",
      organizer: "Old Union"
    },
    {
      id: "4",
      title: "Mediterranean Plates",
      foodImage: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&q=80",
      lat: 37.4290,
      lng: -122.1750,
      description: "Falafel, hummus, pita, and salads — vegan and halal options available.",
      time: "Available for ~45 more minutes",
      category: "Vegan / Halal",
      locationNotes: "Outdoor tables near C wing entrance, EVGR C Courtyard",
      organizer: "EVGR Events"
    },
    {
      id: "5",
      title: "Cookies & Milk",
      foodImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80",
      lat: 37.4255,
      lng: -122.1691,
      description: "Freshly baked chocolate chip and oatmeal cookies with cold milk.",
      time: "Available for ~90 more minutes",
      category: "Dessert",
      locationNotes: "Main lobby near Starbucks, Tresidder Union",
      organizer: "Tresidder Union"
    },
    {
      id: "6",
      title: "Paneer Tikka & Rice",
      foodImage: "https://images.unsplash.com/photo-1604908177445-02f0b6a41e76?w=400&q=80",
      lat: 37.4268,
      lng: -122.1735,
      description: "Indian vegetarian feast with paneer tikka, rice, and naan.",
      time: "Available for ~20 more minutes",
      category: "Vegetarian / Halal",
      locationNotes: "Ground floor atrium, Y2E2 Building",
      organizer: "Y2E2 Study Group"
    },
    {
      id: "7",
      title: "Bagels & Cream Cheese",
      foodImage: "https://images.unsplash.com/photo-1612874742237-6526221588e5?w=400&q=80",
      lat: 37.4270,
      lng: -122.1680,
      description: "Assorted bagels with cream cheese and spreads — help yourself!",
      time: "Available for ~30 more minutes",
      category: "Breakfast",
      locationNotes: "Near the fountain at Memorial Court",
      organizer: "Old Union"
    },
    {
      id: "8",
      title: "Fruit & Cheese Platter",
      foodImage: "https://images.unsplash.com/photo-1556912998-6e2f5f64b934?w=400&q=80",
      lat: 37.4310,
      lng: -122.1665,
      description: "Fresh fruit, cheese cubes, and crackers.",
      time: "Available for ~1 hour",
      category: "Snack",
      locationNotes: "Sigma Chi house, front porch, Fraternity Row",
      organizer: "Fraternity Row"
    }
  ];
  