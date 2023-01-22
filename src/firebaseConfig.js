import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const app = initializeApp ({
         apiKey: "AIzaSyBcoJJaz2uBCOPF4-SvDOro9rQFsbxD3fc",
    authDomain: "spotify-375315.firebaseapp.com",
    projectId: "spotify-375315",
    storageBucket: "spotify-375315.appspot.com",
    messagingSenderId: "190801887193",
    appId: "1:190801887193:web:db308b2f193f5fc69923c8",
    measurementId: "G-GP8KW94E3X"
});
// Firebase storage reference
const storage = getStorage(app);
export default storage;