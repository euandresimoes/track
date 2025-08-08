import api from './api';

interface RegisterData {
  display_name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: number;
    display_name: string;
    email: string;
  };
}

interface LoginResponse {
  access_token: string;
}

const authService = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    // Registrar o usuário
    await api.post('/auth/register', data);
    
    // Após o registro, fazer login para obter o token
    return authService.login({
      email: data.email,
      password: data.password
    });
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', data);
    
    // A API retorna apenas o access_token, então precisamos construir o objeto AuthResponse
    // Vamos extrair o ID do usuário do token JWT
    const token = response.data.access_token;
    
    // Buscar informações do usuário usando o token
    // Como não temos um endpoint específico, vamos usar as informações do login
    const user = {
      id: 0, // Não temos o ID real, então usamos um valor padrão
      display_name: data.email.split('@')[0], // Usamos parte do email como nome
      email: data.email
    };
    
    return {
      token: token,
      user: user
    };
  },
};

export default authService;