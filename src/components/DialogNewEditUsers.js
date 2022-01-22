import React from "react";
import { Modal, Input, Button, Icon } from "semantic-ui-react";

import Auth from "../contexts/Auth";
import AuthConstants from "../constants/AuthConstants";
import Alert from "../contexts/Alert";
import AlertConstants from "../constants/AlertContants";
import AttributesUser from "../contexts/AttributesUser";
import AttributesUserConstants from "../constants/AttributesUserConstants";
import AttributesUserProvider from "../providers/attributes-user-provider";
import requestAxios from "../utils/request-axios";

const styles = {
  divInput: { marginBottom: 5 },
};

const DialogNewEditUserContent = function (props) {
  const { userId, reload, open, onClose } = props;
  const { attributes, dispatch } = React.useContext(AttributesUser);
  const [loading, setLoading] = React.useState(false);
  const alert = React.useContext(Alert);
  const auth = React.useContext(Auth);

  const handleClose = function () {
    dispatch({ type: "clean" });
    onClose();
  };

  const handleGetUser = async function () {
    try {
      const url = "/users/" + userId;
      const { data } = await requestAxios.get(url);
      dispatch({ type: AttributesUserConstants.load, values: data });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateUser = async function () {
    try {
      const url = "/users/";
      await requestAxios.post(url, attributes);
      reload();
      onClose();
    } catch (error) {
      if (error.status === 401) {
        auth.dispatch({ type: AuthConstants.logout });
        handleClose();
      }
      alert.dispatch({ type: AlertConstants.failed, message: error.message });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async function () {
    try {
      const url = "/users/" + userId;
      await requestAxios.put(url, attributes);
      reload();
      onClose();
    } catch (error) {
      if (error.status === 401) {
        auth.dispatch({ type: AuthConstants.logout });
        handleClose();
      }
      alert.dispatch({ type: AlertConstants.failed, message: error.message });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async function () {
    setLoading(true);
    if (userId) await handleUpdateUser();
    else await handleCreateUser();
  };

  React.useEffect(() => {
    if (open && userId) handleGetUser();
  }, [open]);

  return (
    <Modal size={"tiny"} open={open} onClose={handleClose}>
      <Modal.Header>
        <span>{userId ? "Editar Usuario" : "Nuevo Usuario"} </span>
      </Modal.Header>
      <Modal.Content>
        <div>
          <div style={styles.divInput}>
            <Input fluid iconPosition="left" placeholder="Nombre">
              <Icon name="user" />
              <input
                style={{ margin: "10px 0px" }}
                type={"firstname"}
                value={attributes.firstname}
                onChange={(e) =>
                  dispatch({
                    type: AttributesUserConstants.setValue,
                    key: "firstname",
                    value: e.target.value,
                  })
                }
              />
            </Input>
          </div>

          <div style={styles.divInput}>
            <Input fluid iconPosition="left" placeholder="Apellido">
              <Icon name="user" />
              <input
                style={{ margin: "10px 0px" }}
                type={"lastname"}
                value={attributes.lastname}
                onChange={(e) =>
                  dispatch({
                    type: AttributesUserConstants.setValue,
                    key: "lastname",
                    value: e.target.value,
                  })
                }
              />
            </Input>
          </div>

          {!userId && (
            <div style={styles.divInput}>
              <Input fluid iconPosition="left" placeholder="Usuario">
                <Icon name="user circle" />
                <input
                  style={styles.divInput}
                  value={attributes.username}
                  onChange={(e) =>
                    dispatch({
                      type: AttributesUserConstants.setValue,
                      key: "username",
                      value: e.target.value,
                    })
                  }
                />
              </Input>
            </div>
          )}

          {!userId && (
            <div style={styles.divInput}>
              <Input fluid iconPosition="left" placeholder="Contraseña">
                <Icon name="lock" />
                <input
                  style={{ margin: "10px 0px" }}
                  type={"password"}
                  value={attributes.password}
                  onChange={(e) =>
                    dispatch({
                      type: AttributesUserConstants.setValue,
                      key: "password",
                      value: e.target.value,
                    })
                  }
                />
              </Input>
            </div>
          )}

          <div style={styles.divInput}>
            <Input fluid iconPosition="left" placeholder="Correo electronico">
              <Icon name="at" />
              <input
                style={{ margin: "10px 0px" }}
                type={"email"}
                value={attributes.email}
                onChange={(e) =>
                  dispatch({
                    type: AttributesUserConstants.setValue,
                    key: "email",
                    value: e.target.value,
                  })
                }
              />
            </Input>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button disabled={loading} onClick={handleClose}>
          Cerrar
        </Button>
        <Button
          disabled={loading}
          color="violet"
          onClick={handleSave}
          icon="save"
          content="Guardar"
        />
      </Modal.Actions>
    </Modal>
  );
};

const DialogNewEditUser = function (props) {
  return (
    <React.Fragment>
      <AttributesUserProvider>
        <DialogNewEditUserContent {...props} />
      </AttributesUserProvider>
    </React.Fragment>
  );
};

export default DialogNewEditUser;
