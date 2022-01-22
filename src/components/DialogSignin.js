import React from "react";
import { Button, Icon, Modal, Input } from "semantic-ui-react";

import Auth from "../contexts/Auth";
import Alert from "../contexts/Alert";
import AlertConstants from "../constants/AlertContants";
import AuthConstants from "../constants/AuthConstants";
import requestAxios from "../utils/request-axios";

const DialogSignin = function (props) {
  const { open, onClose } = props;
  const auth = React.useContext(Auth);
  const alert = React.useContext(Alert);
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleClose = function () {
    setUsername("");
    setPassword("");
    onClose();
  };

  const handleSignin = async function () {
    try {
      setLoading(true);
      const response = await requestAxios.post("/auth/login", {
        username,
        password,
      });
      const { token } = response.data;

      requestAxios.setToken(token);
      const result = await requestAxios.get("/me");

      if (result.data)
        auth.dispatch({
          token,
          currentUser: result.data,
          type: AuthConstants.signin,
        });

      onClose();
    } catch (error) {
      alert.dispatch({ type: AlertConstants.failed, message: error.message });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Modal size={"tiny"} open={open} onClose={handleClose}>
        <Modal.Header>
          <span>Iniciar Sesión</span>
        </Modal.Header>
        <Modal.Content>
          <div>
            <div style={{ marginBottom: 10 }}>
              <Input fluid iconPosition="left" placeholder="Usuario">
                <Icon name="user circle" />
                <input
                  style={{ margin: "10px 0px" }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Input>
              <div style={{ marginBottom: 10 }}>
                <Input fluid iconPosition="left" placeholder="Contraseña">
                  <Icon name="lock" />
                  <input
                    style={{ margin: "10px 0px" }}
                    type={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Input>
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button disabled={loading} onClick={handleClose}>
            Cerrar
          </Button>
          <Button disabled={loading} color="violet" onClick={handleSignin}>
            Entrar
          </Button>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
};

export default DialogSignin;
