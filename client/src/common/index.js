export const setCredentials = (token) => {
  localStorage.setItem('token', token);
}

export const getCredentials = () => {
  return localStorage.getItem('token') || '';
}

export const logout = () => {
  localStorage.removeItem('token');
  window.location.url('/');
}
