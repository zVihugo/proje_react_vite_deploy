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
    throw new Error('Erro ao fazer login, verifique novamente as credenciais fornecidas');
  }
};

export const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token não encontrado');
  }
  return token;
}

export const verifyToken = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/verify`, {
            headers: {
                'Authorization': token
            }
        });
        return response.data;
    } catch(err){
        throw new Error("Token inválido, necessário autenticação novamente");
    }
}