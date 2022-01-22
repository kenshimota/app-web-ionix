import React from "react";
import { Button, Icon } from "semantic-ui-react";

const ButtonEditIcon = (props) => {
  const { onClick, disabled } = props;

  return (
    <Button onClick={onClick} disabled={disabled} icon>
      <Icon name="edit" />
    </Button>
  );
};

export default ButtonEditIcon;
