import React from "react";
// import logo from './logo.svg';
import "./App.css";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Store } from "redux";
import { History } from "history";
import { ApplicationState } from "./store";
import Dashboard from "./components/Layouts/Dashboard";

interface MainProps {
  store: Store<ApplicationState>;
  history: History;
}
const App: React.FC<MainProps> = ({ store, history }) => {
  return (
    <div className="App">
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Dashboard />
        </ConnectedRouter>
      </Provider>
    </div>
  );
};
export default App;
