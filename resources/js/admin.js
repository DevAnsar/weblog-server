import React from "react"
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from "./admin/App";
import './bootstrap';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <BrowserRouter basename={"/admin"}>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
