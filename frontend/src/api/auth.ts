import axios from './axios';

export const loginRequest = async (email: string, password: string) => {
  const response = await axios.post(`/signin`, { email, password });
  return response.data;
};

export const registerRequest = async (firstName: string, lastName: string, email: string, password: string) => {
  const response = await axios.post(`/signup`, { firstName, lastName, email, password });
  return response.data;
};

export const verifyTokenRequest = async (token: string) => {
  const response = await axios.post(`/verify`, {token});
  return response.data;
}