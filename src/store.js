import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
// import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
// Reducers
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

const firebaseConfig = {
  apiKey: "AIzaSyBVfIxjgi4AyzyLIdkBElj92lCRdAZOCUU",
  authDomain: "reactclientpanel-e9b54.firebaseapp.com",
  databaseURL: "https://reactclientpanel-e9b54.firebaseio.com",
  projectId: "reactclientpanel-e9b54",
  storageBucket: "reactclientpanel-e9b54.appspot.com",
  messagingSenderId: "1059707181997"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
const firestore = firebase.firestore();
// For the error
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Added firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  notify: notifyReducer,
  settings: settingsReducer
});

// Check for settings in localStorage (if its not there set defaultSettings)
if (localStorage.getItem("settings") == null) {
  // Default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanaceOnEdit: false,
    allowRegistration: false
  };

  // Set to localStorage
  // Changing to string JSON.stringify
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

// Create initial state
// Parse back to object
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
