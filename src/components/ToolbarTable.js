import React from "react";
import { Button } from "semantic-ui-react";

import Auth from "../contexts/Auth";

const ToolbarTable = function (props) {
  const { setDialog } = props;
  const auth = React.useContext(Auth);

  return (
    <React.Fragment>
      <div
        style={{
          margin: "10px auto",
          width: "100%",
          textAlign: "right",
        }}
      >
        <Button icon="search" onClick={() => setDialog("search")} />
        <Button
          icon="plus"
          disabled={!auth || !auth.token}
          onClick={() => setDialog("new")}
        />
      </div>
    </React.Fragment>
  );
};

export default ToolbarTable;
