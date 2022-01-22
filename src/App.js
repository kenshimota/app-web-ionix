import React from "react";
import "semantic-ui-css/semantic.min.css";

import RoutesApp from "./routes";
import AuthProvider from "./providers/auth-provider";
import NavBar from "./components/NavBar";
import AlertProvider from "./providers/alert-providers";

const App = function (props) {
  return (
    <AuthProvider>
      <AlertProvider>
        <NavBar></NavBar>
        <div style={{ marginTop: 80, marginBottom: 80 }}>
          <RoutesApp></RoutesApp>
        </div>
      </AlertProvider>
    </AuthProvider>
  );
};

export default App;
