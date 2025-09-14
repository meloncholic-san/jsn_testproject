import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store.js";
import App from "./components/App/App.jsx";

import "./index.css";


createRoot(document.getElementById("root")).render(
    <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
    </Provider>
);
