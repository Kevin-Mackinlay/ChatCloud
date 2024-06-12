
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage} from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCY0nb6Dbaaa0cE3EsI6Pqy-r8KtP6NC5Q',
  authDomain: 'chatcloud-94b94.firebaseapp.com',
  projectId: 'chatcloud-94b94',
  storageBucket: 'chatcloud-94b94.appspot.com',
  messagingSenderId: '144925298252',
  appId: '1:144925298252:web:4eeacd938c920c17bdeee9',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();