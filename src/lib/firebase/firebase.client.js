// Import from the umbrella `firebase/*` packages — the SAME modules the rest of
// the app (pages, stores) use for collection()/doc()/auth helpers. Importing
// these from `@firebase/*` instead resolved to a separate copy of Firestore
// under the project's node_modules layout, so the exported `db` wasn't
// recognised by collection()/doc() and the data pages 500'd.
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKER,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPIDN 
};

// Initialize Firebase once. Reusing the existing app (instead of the previous
// deleteApp()/re-init dance) avoids leaving `db`/`auth` pointing at a deleted
// app, which made Firestore reject doc()/collection() and 500 the data pages.
const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)