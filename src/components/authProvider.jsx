import { useState } from "react"
import { createContext,useContext } from "react"
import { fakeAuthProvider }  from "../auth"

let AuthContext = createContext(null);

export function AuthProvider({ children }) {
  let [user, setUser] = useState(null);

  let signin = (newUser,password, callback) => {
      return fakeAuthProvider.signin(() => {
        //console.log(password)
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}



export function useAuth() {
  return useContext(AuthContext);
}
