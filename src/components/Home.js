import React from "react";
import UsersTable from "./UsersTable";
import { Container } from "semantic-ui-react";

const Home = function () {
  return (
    <Container
      style={{
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
      }}
    >
      <UsersTable />
    </Container>
  );
};

export default Home;
