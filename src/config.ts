const firebase = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  vapidKey:process.env.REACT_APP_FIREBASE_VAPID_KEY,
};
console.log('firebase', firebase);

export default {
  firebase,
  imgur: {
    postUrl: process.env.VUE_APP_IMGUR_POSTURL,
    clientId: process.env.VUE_APP_IMGUR_CLIENTID,
    albumShare: process.env.VUE_APP_IMGUR_ALBUMSHARE,
    albumIcon: process.env.VUE_APP_IMGUR_ALBUMICON,
    albumAvatar: process.env.VUE_APP_IMGUR_ALBUMAVATAR,
  },
};
