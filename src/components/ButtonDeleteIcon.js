import React from "react";
import { Button, Icon } from "semantic-ui-react";

const ButtonDeleteIcon = (props) => {
  const { onClick, disabled } = props;

  return (
    <Button onClick={onClick} disabled={disabled} icon>
      <Icon name="remove" />
    </Button>
  );
};

export default ButtonDeleteIcon;
