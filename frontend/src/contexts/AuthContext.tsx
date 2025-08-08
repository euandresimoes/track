import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: number;
  display_name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (display_name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Verificar se o usuário está armazenado no localStorage ao carregar a página
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Erro ao analisar dados do usuário:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await authService.login({ email, password });
      
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      
      toast({
        title: 'Sucesso',
        description: 'Login realizado com sucesso!',
      });
      
      // Forçar redirecionamento para a página inicial
      window.location.href = '/';
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      toast({
        title: 'Erro',
        description: error.response?.data?.message || 'Falha ao fazer login. Verifique suas credenciais.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const register = async (display_name: string, email: string, password: string) => {
    try {
      setLoading(true);
      const response = await authService.register({ display_name, email, password });
      
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      
      toast({
        title: 'Sucesso',
        description: 'Conta criada com sucesso!',
      });
      
      // Forçar redirecionamento para a página inicial
      window.location.href = '/';
    } catch (error: any) {
      console.error('Erro ao registrar:', error);
      toast({
        title: 'Erro',
        description: error.response?.data?.message || 'Falha ao criar conta. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Forçar redirecionamento para a página de login
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};