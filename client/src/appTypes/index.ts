export interface Restaurant {
  id: number;
  name: string;
  location: string;
  rating: number;
  price_range: number;
  average_rating?: number
}

export interface NewRestaurant {
  name: string;
  location: string;
  price_range: number;
}

export interface Review {
  id: number;
  restaurant_id: number;
  rating: number;
  body: string;
  name: string;
}
