// 获取本地存储的token
export const getToken = () => {
  return localStorage.getItem('portfolio_token');
};

// 存储token到本地
export const setToken = (token) => {
  localStorage.setItem('portfolio_token', token);
};

// 清除本地token
export const removeToken = () => {
  localStorage.removeItem('portfolio_token');
};