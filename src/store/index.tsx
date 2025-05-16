import { combineReducers, configureStore } from '@reduxjs/toolkit';

import actionReducer from '../reducers/ActionSlice';
import sidebarReducer from '../reducers/SidebarSlice';

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  action: actionReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
