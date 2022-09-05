export interface Restaurant {
  id: number;
  name: string;
  location: string;
  rating: number;
  price_range: number;
  average_rating?: number
  user_id?:string
}

export interface NewRestaurant {
  name: string;
  location: string;
  price_range: number;
  user_id:string;
}

export interface Review {
  id: number;
  restaurant_id: number;
  rating: number;
  body: string;
  name: string;
}

export interface User{
  user_id: string
  username: string
  password: string
  email:string
}
