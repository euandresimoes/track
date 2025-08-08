import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import DashboardPage from "./pages/Dashboard";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import RecuperarSenha from "./pages/RecuperarSenha";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Rotas públicas */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/registro"
        element={isAuthenticated ? <Navigate to="/" /> : <Registro />}
      />
      <Route
        path="/recuperar-senha"
        element={isAuthenticated ? <Navigate to="/" /> : <RecuperarSenha />}
      />

      {/* Rotas protegidas */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/relatorios"
        element={
          <ProtectedRoute>
            <Layout>
              <Relatorios />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configuracoes"
        element={
          <ProtectedRoute>
            <Layout>
              <Configuracoes />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Rota de fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
