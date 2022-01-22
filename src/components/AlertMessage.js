import React from "react";
import { Segment, Portal, Header, Button, Icon } from "semantic-ui-react";
import AlertConstants from "../constants/AlertContants";

const styles = {
  [AlertConstants.success]: {
    root: {
      left: "auto",
      right: "auto",
      position: "fixed",
      top: "20px",
      zIndex: 1000,
      left: "50%",
      transform: "translate(-50%, 0)",
    },
    header: {
      color: "green",
      display: "flex",
    },
    btn: {
      float: "right",
    },
    icon: {
      fontSize: 20,
      width: "fit-content",
      position: "relative",
      top: 2,
    },
  },

  [AlertConstants.failed]: {
    root: {
      left: "auto",
      right: "auto",
      position: "fixed",
      top: "20px",
      zIndex: 1000,
      left: "50%",
      transform: "translate(-50%, 0)",
    },
    header: {
      color: "#db2828",
      display: "flex",
    },
    btn: {
      float: "right",
    },
    icon: {
      fontSize: 20,
      width: "fit-content",
      position: "relative",
      top: 2,
    },
  },
};

const AlertMessage = function (props) {
  const { type, message, open, onClose } = props;
  const style = styles[type] || styles[AlertConstants.failed];

  const autoClose = function () {
    setTimeout(() => onClose(), 3000);
  };

  React.useEffect(() => {
    if (open) autoClose();
  }, [open]);

  return (
    <React.Fragment>
      <Portal onClose={onClose} open={open}>
        <Segment style={style.root}>
          <Header icon style={style.header}>
            {AlertConstants.failed === type && (
              <React.Fragment>
                <Icon name="bell" style={style.icon} />
                <span>Opps ha ocurrido un error!</span>
              </React.Fragment>
            )}
            {AlertConstants.success === type && (
              <React.Fragment>
                <Icon name="check" style={style.icon} />
                <span>Exitoso</span>
              </React.Fragment>
            )}
          </Header>
          <p>{message}</p>
          <Button
            content="Cerrar"
            icon="close"
            style={style.btn}
            onClick={onClose}
          />
        </Segment>
      </Portal>
    </React.Fragment>
  );
};

export default AlertMessage;
