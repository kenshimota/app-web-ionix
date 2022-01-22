import React from "react";
import { Modal, Input, Button, Icon } from "semantic-ui-react";

const styles = {
  divInput: { marginBottom: 5 },
};

const DialogSearchUsers = function (props) {
  const { open, params, setParams, onClose } = props;
  const [username, setUsername] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleClose = function () {
    setUsername("");
    setLastname("");
    setEmail("");
    setFirstname("");
    onClose();
  };

  const handleSearch = function () {
    setParams({ username, firstname, lastname, email });
    handleClose();
  };

  const handleLoadValues = function () {
    if (params && params.username) setUsername(params.username);
    if (params && params.lastname) setLastname(params.lastname);
    if (params && params.firstname) setFirstname(params.firstname);
    if (params && params.email) setEmail(params.email);
  };

  React.useEffect(() => {
    if (params && open) handleLoadValues();
  }, [open]);

  return (
    <Modal size={"tiny"} open={open} onClose={handleClose}>
      <Modal.Header>
        <span>Busqueda</span>
      </Modal.Header>
      <Modal.Content>
        <div>
          <div style={styles.divInput}>
            <Input fluid iconPosition="left" placeholder="Nombre">
              <Icon name="user" />
              <input
                style={{ margin: "10px 0px" }}
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Input>
          </div>

          <div style={styles.divInput}>
            <Input fluid iconPosition="left" placeholder="Apellido">
              <Icon name="user" />
              <input
                style={{ margin: "10px 0px" }}
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </Input>
          </div>

          <div style={styles.divInput}>
            <Input fluid iconPosition="left" placeholder="Usuario">
              <Icon name="user circle" />
              <input
                style={{ margin: "10px 0px" }}
                value={email}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Input>
          </div>

          <div style={styles.divInput}>
            <Input fluid iconPosition="left" placeholder="Correo electronico">
              <Icon name="at" />
              <input
                style={{ margin: "10px 0px" }}
                type={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Input>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleClose}>Cerrar</Button>
        <Button
          color="violet"
          onClick={handleSearch}
          icon="search"
          content="Buscar"
        />
      </Modal.Actions>
    </Modal>
  );
};

export default DialogSearchUsers;
