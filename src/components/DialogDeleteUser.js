import React from "react";
import { Button, Modal } from "semantic-ui-react";

import Auth from "../contexts/Auth";
import AuthConstants from "../constants/AuthConstants";
import Alert from "../contexts/Alert";
import AlertConstants from "../constants/AlertContants";
import requestAxios from "../utils/request-axios";

const DialogDeleteUser = function (props) {
  const { open, reload, userId, onClose } = props;
  const [loading, setLoading] = React.useState(false);
  const alert = React.useContext(Alert);
  const auth = React.useContext(Auth);

  const handleClose = function () {
    onClose();
  };

  const handleDelete = async function () {
    try {
      setLoading(true);
      await requestAxios.delete("/users/" + userId);
      reload();
      handleClose();
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

  return (
    <React.Fragment>
      <Modal open={open} size="tiny">
        <Modal.Header>
          <span>Eliminar Usuario</span>
        </Modal.Header>
        <Modal.Content>
          ¿Usted esta seguro de que desea eliminar al siguiente usuario?
        </Modal.Content>
        <Modal.Actions>
          <Button disabled={loading} onClick={handleClose}>
            Cerrar
          </Button>
          <Button
            negative
            disabled={loading}
            icon="remove"
            color="violet"
            onClick={handleDelete}
            content="Eliminar"
          ></Button>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
};

export default DialogDeleteUser;
