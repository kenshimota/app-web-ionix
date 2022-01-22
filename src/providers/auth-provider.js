import React from "react";

import Auth from "../contexts/Auth";
import AuthConstants from "../constants/AuthConstants";

const reducer = (prevState, action) => {
  switch (action.type) {
    case AuthConstants.signin:
      return { token: action.token, currentUser: action.currentUser };

    case AuthConstants.logout:
      return { token: null, currentUser: null };

    default:
      throw new Error("option no available");
  }
};

const AuthProvider = function (props) {
  const { children } = props;
  const [auth, dispatch] = React.useReducer(reducer, {
    token: null,
    currentUser: null,
  });

  return (
    <Auth.Provider
      value={{ token: auth.token, currentUser: auth.currentUser, dispatch }}
    >
      {children}
    </Auth.Provider>
  );
};

export default AuthProvider;
