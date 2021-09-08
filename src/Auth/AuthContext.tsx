import { createContext, useContext, useState, useEffect } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  UserCredential,
  User,
  updateEmail as fireUpdateEmail,
  updatePassword as fireUpdatePassword

} from '@firebase/auth';
import { auth } from "../firebase"
import { AuthContextType } from "./types";

const signup = (username: string, password: string): Promise<UserCredential> => createUserWithEmailAndPassword(auth, username, password);
const login = (username: string, password: string) => signInWithEmailAndPassword(auth, username, password);
const logout = () => signOut(auth);
const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);


const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth():AuthContextType {
  return useContext(AuthContext)
}

export const AuthProvider: React.FC<{}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>()
  const [loading, setLoading] = useState(true)

  function updateEmail(email: string) {
    return currentUser && fireUpdateEmail(currentUser, email);
  }

  function updatePassword(password: string) {
    return currentUser && fireUpdatePassword(currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}