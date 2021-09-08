import * as React from 'react';
import { useRef, useState } from "react"
import { Form,  Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "./AuthContext"
import { Link, useHistory } from "react-router-dom"
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
export const Login: React.FC<unknown> = ()=> {
  const emailRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleGoogleLogin() {
    setLoading(true);
    try {
      const resp = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log('resp', resp);
      history.push("/")
    } catch (e) {
      if (e instanceof Error) {
        setError(e?.message);
      } else {
        setError(e + '');
      }
      

    }
    setLoading(false);
  }
  async function handleSubmit(e:React.BaseSyntheticEvent) {
    e.preventDefault()
    setError("");
    setLoading(true);
    try {
      await login(emailRef?.current?.value ?? '', passwordRef?.current?.value ?? '');
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef as any} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef as any} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Button disabled={loading} className="w-100" type="submit" onClick={handleGoogleLogin}>
            Login with Google
            </Button>
          </div>
          
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}