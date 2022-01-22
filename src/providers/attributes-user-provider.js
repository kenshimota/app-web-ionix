import React from "react";

import AttributesUser from "../contexts/AttributesUser";
import AttributesUserConstants from "../constants/AttributesUserConstants";

const defaultValue = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
};

const reducer = (prevState, action) => {
  let attributes = { ...prevState };
  switch (action.type) {
    case AttributesUserConstants.setValue:
      attributes[action.key] = action.value;
      return attributes;

    case AttributesUserConstants.clean:
      return { ...defaultValue };

    case AttributesUserConstants.load:
      const values = action.values;
      for (const index in attributes) {
        if (values && values[index]) attributes[index] = values[index];
      }

      return attributes;
    default:
      throw new Error("option no available");
  }
};

const AttributesUserProvider = function (props) {
  const { children } = props;
  const [attributes, dispatch] = React.useReducer(reducer, { ...defaultValue });

  return (
    <AttributesUser.Provider value={{ attributes: attributes, dispatch }}>
      {children}
    </AttributesUser.Provider>
  );
};

export default AttributesUserProvider;
