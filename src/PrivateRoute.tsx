import * as React from "react"
import { Route, Redirect, RouteProps } from "react-router-dom"
import { useAuth } from "./Auth/AuthContext"
type ExtractProps<TComponentOrTProps> =
  TComponentOrTProps extends React.ComponentType<infer TProps>
    ? TProps
    : TComponentOrTProps;

export type PrivateComponentProps<T extends React.ComponentType = React.ComponentType>  = {
  component: T
} & ExtractProps<T> & RouteProps;

export const PrivateRoute:React.FC<PrivateComponentProps> = ({ component:Component, ...rest })=> {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} {...rest} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}