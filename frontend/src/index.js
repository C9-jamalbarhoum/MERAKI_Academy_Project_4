import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter} from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId="946898609659-7u7ldegk6i6surf50l73e5b6qd0o8poj.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
    </BrowserRouter>

  </React.StrictMode>
);
