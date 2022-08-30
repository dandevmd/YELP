import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NewRestaurant, Restaurant, Review } from "../../appTypes";
import { restaurantService } from "./resService";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  restaurants: [] as Restaurant[],
  restaurant: {} as Restaurant,
  reviews: [] as Review[],
  review: {} as Review,
};

//get all restaurants from backend
export const getRestaurants = createAsyncThunk("/getRestaurants", async () => {
  try {
    const restaurants = await restaurantService.getRestaurants();
    return restaurants.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    console.log(error);
  }
});

//delete restaurant in backend
export const deleteRestaurant = createAsyncThunk(
  "/deleteRestaurant",
  async (id: number) => {
    try {
      const result = await restaurantService.deleteRestaurant(id);
      return result.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      console.log(error);
    }
  }
);

//create restaurant in backend
export const createRestaurant = createAsyncThunk(
  "/createRestaurant",
  async (restaurant: NewRestaurant) => {
    try {
      const result = await restaurantService.createRestaurant(restaurant);
      return result.newRestaurant;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
);

//get restaurant by id from backend
export const getRestaurantById = createAsyncThunk(
  "/getRestaurantById",
  async (id: number) => {
    try {
      const result = await restaurantService.getRestaurantById(id);
      const data = {
        status: result.status,
        restaurant: result.restaurant,
        reviews: result.reviews,
      };
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
);

//update restaurant in backend
export const updateRestaurant = createAsyncThunk(
  "/updateRestaurant",
  async (restaurant: {
    id: number;
    name: string;
    location: string;
    price_range: number;
  }) => {
    try {
      const result = await restaurantService.updateRestaurant(restaurant);
      return result.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
);

//add review to restaurant

export const addReview = createAsyncThunk(
  "/addReview",
  async (review: {
    restaurant_id: number;
    review: {
      name: string;
      rating: number;
      review: string
    };
  }) => {
    try {
      const result = await restaurantService.addReviewToRestaurant(review);
      return result.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      console.log(error);
    }
  }
);

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    resetInitialState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRestaurants.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(getRestaurants.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = "Restaurants fetched successfully";
      state.restaurants = action.payload;
    });
    builder.addCase(getRestaurants.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = "Error fetching restaurants";
    });
    builder.addCase(deleteRestaurant.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(deleteRestaurant.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = "Restaurant deleted successfully";
      state.restaurants = state.restaurants.filter((r) => {
        return r.id !== action.payload.id;
      });
    });
    builder.addCase(deleteRestaurant.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = "Error deleting restaurant";
    });
    builder.addCase(createRestaurant.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(createRestaurant.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = "Restaurant created successfully";
      state.restaurants = [...state.restaurants, action.payload];
    });
    builder.addCase(createRestaurant.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = "Error creating restaurant";
    });
    builder.addCase(getRestaurantById.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(getRestaurantById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = "Restaurant fetched successfully";
      state.restaurant = action.payload?.restaurant;
      state.reviews = action.payload?.reviews;
    });
    builder.addCase(getRestaurantById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = "Error fetching restaurant";
    });
    builder.addCase(updateRestaurant.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(updateRestaurant.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = "Restaurant updated successfully";
      state.restaurant = action.payload;
    });
    builder.addCase(updateRestaurant.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = "Error updating restaurant";
    });
    builder.addCase(addReview.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(addReview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = "Restaurant review added successfully";
      state.reviews = [...state.reviews, action.payload];
    });
    builder.addCase(addReview.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = "Error adding review to restaurant";
    });
  },
});

export const { resetInitialState } = restaurantSlice.actions;
export default restaurantSlice.reducer;
