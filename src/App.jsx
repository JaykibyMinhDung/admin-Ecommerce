import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import { lazy } from 'react';
import Chat from "./Chat/Chat";
import Header from "./Header/Header";
import History from "./History/History";
import Home from "./Home/Home";
import Menu from "./Menu/Menu";
import Products from "./Products/Products";
import Users from "./Users/Users";
import Login from "./Login/Login";
import NewProduct from "./New/NewProduct";
import Permission from "./pages/Permissions";
import { AuthContextProvider } from "./Context/AuthContext";
import { useEffect, useState } from "react";

function App() {
  const authLogin = localStorage.getItem("id_user");
  const permission = JSON.parse(localStorage.getItem("user"));
  const [authState, setAuthState] = useState(authLogin);
  useEffect(() => {
    if (authLogin) {
      setAuthState(true);
    } else {
      setAuthState(false);
    }
  }, [authLogin, permission]);
  // add redirect from to trong ham
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <div
            id="main-wrapper"
            data-theme="light"
            data-layout="vertical"
            data-navbarbg="skin6"
            data-sidebartype="full"
            data-sidebar-position="fixed"
            data-header-position="fixed"
            data-boxed-layout="full"
          >
            <Header setLogout={setAuthState} />

            <Menu />

            <Switch>
              <Route exact path="/">
                {authState ? <Redirect to="/dashbroad" /> : <Login setLogin={setAuthState} />}
              </Route>
              <Route exact path="/login" component={Login} />
              {!authState && <Login />}
              <Route path="/dashbroad" component={Home} />
              {permission?.role < 2 && (
                <>
                  <Route path="/chat" component={Chat} />
                  <Route path="/" component={Permission} />
                </>
              )}
              <Route path="/chat" component={Chat} />
              <Route path="/users" component={Users} />
              <Route path="/products" component={Products} />
              <Route path="/history" component={History} />
              <Route path="/new" component={NewProduct} />
            </Switch>
          </div>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
