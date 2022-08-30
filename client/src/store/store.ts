import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import restaurantReducer from './reducers/restaurantReducer';

export const store = configureStore({
  reducer:{
    restaurant: restaurantReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;