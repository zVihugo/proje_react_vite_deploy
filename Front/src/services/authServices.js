import axios from 'axios';
import { API_URL } from "../config/config";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, {
      username,
      password,
    });
    const token = response.data.token;
    console.log(token);
    localStorage.setItem('token', token);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status === 429) {
      throw new Error('Muitas tentativas de login. Tente novamente mais tarde.');
    } else {
      throw new Error('Erro ao fazer login, verifique novamente as credenciais fornecidas');
    }
  }
};

export const getToken = () => {
  const token = localStorage.getItem('token');
  return token || null;
}

export const clearToken = () => {
  localStorage.removeItem('token');
}
