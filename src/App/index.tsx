import * as React from "react"
import { Signup } from "../Auth/Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../Auth/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Dashboard } from "../Dashboard"
import { Login } from "../Auth/Login"
import { PrivateRoute } from "../PrivateRoute"
import { ForgotPassword } from "../Auth/ForgotPassword"
import { UpdateProfile } from "../Auth/UpdateProfile"

export const App: React.FC<unknown> = () => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App