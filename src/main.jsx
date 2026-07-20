import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api/queryClient";
import { AppProviders } from "@/app/AppProviders";
import { AppRoutes } from "@/app/Router";
import { env } from "@/config/env";
import "@/index.css";

document.title = env.appTitle;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </QueryClientProvider>
  </React.StrictMode>
);
