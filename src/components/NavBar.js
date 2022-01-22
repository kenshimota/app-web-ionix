import React from "react";
import { Menu, Button, Icon } from "semantic-ui-react";

import AuthConstants from "../constants/AuthConstants";
import Auth from "../contexts/Auth";
import DialogSignin from "./DialogSignin";

const NavBar = function (props) {
  const auth = React.useContext(Auth);
  const [open, setOpen] = React.useState();

  return (
    <React.Fragment>
      {/* ---- Dialog Signin ---- */}
      <DialogSignin open={open === "signin"} onClose={() => setOpen("")} />

      {/* ---- Navbar ---- */}
      <Menu pointing fixed="top" inverted color="violet">
        {auth && auth.currentUser && (
          <React.Fragment>
            <Menu.Item>
              <Icon name="user" />
            </Menu.Item>
            <Menu.Item>
              <h4>{auth.currentUser.username}</h4>
            </Menu.Item>
          </React.Fragment>
        )}

        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            active={auth && auth.state && auth.state.token}
          >
            {auth && !auth.token && (
              <Button
                icon="sign-in alternate"
                color="violet"
                content="Signin"
                onClick={() => setOpen("signin")}
              ></Button>
            )}

            {auth && auth.token && (
              <Button
                content="Signout"
                color="violet"
                icon="sign-out alternate"
                onClick={() => auth.dispatch({ type: AuthConstants.logout })}
              ></Button>
            )}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </React.Fragment>
  );
};

export default NavBar;
