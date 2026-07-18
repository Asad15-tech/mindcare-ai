import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);
export const sendOTP = (data) => API.post('/auth/send-otp', data);
export const verifyOTP = (data) => API.post('/auth/verify-otp', data);
export const resetPassword = (data) => API.post('/auth/reset-password', data);
export const saveMood = (data) => API.post('/mood', data);
export const getMoods = () => API.get('/mood');
export const deleteMood = (id) => API.delete(`/mood/${id}`);
export const saveJournal = (data) => API.post('/journal', data);
export const getJournals = () => API.get('/journal');
export const deleteJournal = (id) => API.delete(`/journal/${id}`);
export const saveActivity = (data) => API.post('/activity', data);
export const getActivities = () => API.get('/activity');
export const deleteActivity = (id) => API.delete(`/activity/${id}`);
