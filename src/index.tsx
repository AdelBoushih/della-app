import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import configureStore from "./configureStore";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const history = createBrowserHistory();

const initialState = (window as any).INITIAL_REDUX_STATE;
const store = configureStore(history, initialState);

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
