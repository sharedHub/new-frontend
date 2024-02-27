import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
    reducer: rootReducer,
    // Optionally, you can provide middleware, devtools configuration, etc.
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware),
    // devTools: process.env.NODE_ENV !== 'production',
  });

export default store;