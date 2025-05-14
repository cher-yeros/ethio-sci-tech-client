import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import usersReducer from "./usersSlice";
import apparatusReducer from "./apparatusSlice";
import courseReducer from "./courseSlice";
import orderReducer from "./orderSlice";
import othersCourseReducer from "./othersCourseSlice";
import subjectReducer from "./subjectSlice";
import testimonyReducer from "./testimonySlice";
import adminReducer from "./adminSlice";
import projectReducer from "./projectSlice";
import feedbackReducer from "./feedbackSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import teamSclice from "./teamSclice";
import gallarySlice from "./gallarySlice";
import aboutUsSlice from "./aboutUsSlice";
import instructorsSlice from "./instructorsSlice";
import systemSlice from "./systemSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  apparatus: apparatusReducer,
  course: courseReducer,
  order: orderReducer,
  othersCourse: othersCourseReducer,
  subject: subjectReducer,
  testimony: testimonyReducer,
  admin: adminReducer,
  project: projectReducer,
  feedback: feedbackReducer,
  team: teamSclice,
  instructor: instructorsSlice,
  gallary: gallarySlice,
  about: aboutUsSlice,
  system: systemSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
