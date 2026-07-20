import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import { AuthProvider } from "@/context/AuthContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { ToastViewport } from "@/components/ui";
import { AppMetadata } from "@/app/AppMetadata";
import { ScrollToTop } from "@/app/ScrollToTop";

function Providers({ children }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <SidebarProvider>
            <ScrollToTop />
            <AppMetadata />
            {children}
            <ToastViewport />
          </SidebarProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <Providers>{children}</Providers>
    </BrowserRouter>
  );
}
