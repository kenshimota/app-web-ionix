import React from "react";
import { Header, Table, Button, Loader, Icon } from "semantic-ui-react";

import DateFormat from "./DateFormat";
import ButtonDeleteIcon from "./ButtonDeleteIcon";
import ButtonEditIcon from "./ButtonEditIcon";
import requestAxios from "../utils/request-axios";
import DialogDeleteUser from "./DialogDeleteUser";
import Auth from "../contexts/Auth";
import PaginateTable from "./PaginationTable";
import ToolbarTable from "./ToolbarTable";
import DialogNewEditUser from "./DialogNewEditUsers";
import DialogSearchUsers from "./DialogSearch";
import Alert from "../contexts/Alert";
import AlertConstants from "../constants/AlertContants";

const styles = {
  searchDiv: { margin: "10px auto", width: "fit-content" },
};

const UsersTable = function () {
  const [users, setUsers] = React.useState([]);
  const [page, onPage] = React.useState(1);
  const [dialog, setDialog] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [params, setParams] = React.useState({});
  const auth = React.useContext(Auth);
  const alert = React.useContext(Alert);
  const pageSize = 10;

  const handleGetUsers = async function () {
    try {
      setLoading(true);
      let url = `/users?page=${page}&pageSize=${pageSize}`;

      for (const index in params) {
        if (params[index]) url += `&search[${index}]=${params[index]}`;
      }

      const response = await requestAxios.get(url);

      const list = response.data.map((user) => ({
        ...user,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      }));

      setUsers(list);
      setLoading(false);
    } catch (error) {
      alert.dispatch({ type: AlertConstants.failed, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleGetUsers();
  }, [page, params]);

  return (
    <div>
      <div>
        <DialogSearchUsers
          open={dialog === "search"}
          onClose={() => setDialog(null)}
          params={params}
          setParams={setParams}
        />
        <DialogDeleteUser
          userId={userId}
          reload={handleGetUsers}
          open={"delete" === dialog}
          onClose={() => {
            setUserId(null);
            setDialog("");
          }}
        />
        <DialogNewEditUser
          userId={userId}
          reload={handleGetUsers}
          open={"new" === dialog || dialog === "edit"}
          onClose={() => {
            setUserId(null);
            setDialog("");
          }}
        />
      </div>

      {!loading && (
        <div>
          <ToolbarTable setDialog={setDialog} />
        </div>
      )}

      <div>
        {loading && <Loader active></Loader>}

        {!loading && users.length === 0 && (
          <div>
            <div style={styles.searchDiv}>
              <Header icon>
                <Icon name="search" />
                <span>
                  Lo sentimos, no hemos conseguidos resultados relacionados con
                  la busqueda
                </span>
              </Header>
            </div>
            <div style={styles.searchDiv}>
              <Button color="violet" onClick={() => setParams({})}>
                Limpiar Busqueda
              </Button>
            </div>
          </div>
        )}

        {!loading && users.length > 0 && (
          <Table basic="very" style={{ width: "100%" }} celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Usuario</Table.HeaderCell>
                <Table.HeaderCell>Correo Electronico</Table.HeaderCell>
                <Table.HeaderCell>Creado</Table.HeaderCell>
                <Table.HeaderCell>Actualizado</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {users &&
                users.map((user, key) => (
                  <Table.Row key={key}>
                    <Table.Cell>
                      <Header as="h4">
                        <Header.Content>
                          {user.username}
                          <Header.Subheader>
                            {user.firstname} {user.lastname}
                          </Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      <DateFormat date={user.createdAt} />
                    </Table.Cell>
                    <Table.Cell>
                      <DateFormat date={user.updatedAt} />
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button.Group>
                        <ButtonEditIcon
                          disabled={!auth || !auth.token}
                          onClick={() => {
                            setUserId(user.id);
                            setDialog("edit");
                          }}
                        />
                        <ButtonDeleteIcon
                          disabled={!auth || !auth.token}
                          onClick={() => {
                            setUserId(user.id);
                            setDialog("delete");
                          }}
                        />
                      </Button.Group>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        )}
      </div>

      <div>
        <PaginateTable
          setPage={onPage}
          page={page}
          resources={users}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

export default UsersTable;
