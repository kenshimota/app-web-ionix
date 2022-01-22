import React from "react";

import Alert from "../contexts/Alert";
import AlertConstants from "../constants/AlertContants";
import AlertMessage from "../components/AlertMessage";

const defaultValue = {
  message: "",
  active: false,
  type: "",
};

const reducer = (prevState, action) => {
  switch (action.type) {
    case AlertConstants.success:
      return {
        type: AlertConstants.success,
        message: action.message,
        active: true,
      };

    case AlertConstants.failed:
      return {
        type: AlertConstants.failed,
        message: action.message,
        active: true,
      };

    case AlertConstants.clean:
      return { ...defaultValue };

    default:
      throw new Error("option no available");
  }
};

const AlertProvider = function (props) {
  const { children } = props;
  const [state, dispatch] = React.useReducer(reducer, { ...defaultValue });

  return (
    <Alert.Provider value={{ ...state, dispatch }}>
      <AlertMessage
        open={state && state.active}
        type={state && state.type}
        message={state && state.message}
        onClose={() => dispatch({ type: AlertConstants.clean })}
      />
      {children}
    </Alert.Provider>
  );
};

export default AlertProvider;
