import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { HelmetProvider, Helmet } from "react-helmet-async";
import {Provider} from 'react-redux'
import store from '../src/redux/store.js'
  


createRoot(document.getElementById("root")).render(
  <StrictMode>
  
<Provider store={store} >
      <HelmetProvider>
      <title>My App</title>
      <meta name="description" content="This is my app description." />

      <CssBaseline />
      <div onContextMenu={(e) => e.preventDefault()}>
        <App />
      </div>
    </HelmetProvider>
</Provider>
  </StrictMode>,
);
