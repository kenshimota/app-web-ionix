import React from "react";
import { Button } from "semantic-ui-react";

const PaginateTable = function (props) {
  const { resources, pageSize, page, setPage } = props;

  return (
    <React.Fragment>
      <div
        style={{
          margin: "10px auto",
          width: "100%",
          textAlign: "right",
        }}
      >
        <Button
          disabled={page === 1}
          color="violet"
          icon="arrow left"
          content="Atras"
          onClick={() => setPage(page - 1)}
        />
        <Button
          disabled={!resources || resources.length < pageSize}
          color="violet"
          icon="arrow right"
          labelPosition="right"
          content="Siguiente"
          onClick={() => setPage(page + 1)}
        />
      </div>
    </React.Fragment>
  );
};

export default PaginateTable;
