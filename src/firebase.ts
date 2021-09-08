import { getAuth, AuthProvider, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from '@firebase/auth';
import { initializeApp } from '@firebase/app';
import config from './config';
import { getFirestore, collection, serverTimestamp } from '@firebase/firestore';
import { getMessaging, isSupported, getToken, onMessage, MessagePayload } from '@firebase/messaging';
export const app = initializeApp(config.firebase);
export const firestore = getFirestore(app);

export const timestamp = serverTimestamp();

export type OAuthProviders = 'google.com' | 'facebook.com' | 'github.com';

// provider.addScope('public_profile');
// provider.addScope('user_birthday');

export const auth = getAuth(app);

export const users = (...pathSegments: string[]) => collection(firestore, 'users', ...pathSegments);

auth.useDeviceLanguage();

export const providerMapping: Record<OAuthProviders, AuthProvider> = {
  'google.com': new GoogleAuthProvider(),
  'facebook.com': new FacebookAuthProvider(),
  'github.com': new GithubAuthProvider(),
};

export const credentialMapping: Record<OAuthProviders, (token: string) => AuthProvider> = {
  'google.com': token => GoogleAuthProvider.credential(null, token),
  'facebook.com': token => FacebookAuthProvider.credential(token),
  'github.com': token => GithubAuthProvider.credential(token),
};

export type ListenFn = (mesg: MessagePayload) => void;
const listeners:ListenFn[] = []

export const registerListener = (fn:ListenFn):()=>void => {
  listeners.push(fn);
  return () => {
    const idx =listeners.indexOf(fn);
    if (idx > -1) {
      listeners.splice(idx, 1);
    }
  }
}
 (async () => {
   const msg = getMessaging(app);
   try {
     const token = await getToken(msg, { vapidKey: config.firebase.vapidKey });
     if (await isSupported()) {
       onMessage(msg, (msg) => listeners.forEach(v => v(msg)));
       //   const fmsg = firebase.messaging();
       // fmsg.usePublicVapidKey(
       //   'BFeaTTT1Dh8RoYytjYuMk3BktHvFDYrkZfDiRUlNtQyT8YbKpX5DnQU7rHq0x4YdP-xACIttBDFl6Tngy-v0BKw',
       // );
       return msg;
     }
   } catch (e) {
     console.trace(e);
   }
  return null;
})();
