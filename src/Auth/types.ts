import { User, UserCredential } from "@firebase/auth";

export type NoPromise = null | undefined | void | Promise<null | void | undefined>;

export type AuthContextType = {
  signup(name: string, password: string): Promise<UserCredential>;
  login(name: string, password: string): Promise<UserCredential>;
  logout(): Promise<void>;
  resetPassword(email: string): NoPromise;
  currentUser?: User | null,
  updateEmail(email: string): NoPromise;
  updatePassword(password: string): NoPromise;
  
}