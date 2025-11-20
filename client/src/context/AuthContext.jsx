import { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser } from '../services/api'; // 后续实现API函数
import { getToken, setToken, removeToken } from '../utils/storage';

// 创建Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 初始化：检查本地是否有token（页面刷新后保持登录状态）
  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
      // 可选：调用后端接口获取用户信息
      // fetchUserInfo().then(data => setUser(data));
    }
    setLoading(false);
  }, []);

  // 注册函数
  const register = async (userData) => {
    try {
      const response = await registerUser(userData);
      const { token, user } = response.data;
      setToken(token); // 存储token到本地
      setIsAuthenticated(true);
      setUser(user);
      return true; // 注册成功
    } catch (error) {
      console.error('注册失败：', error.response.data.message);
      return false; // 注册失败
    }
  };

  // 登录函数
  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      const { token, user } = response.data;
      setToken(token);
      setIsAuthenticated(true);
      setUser(user);
      return true;
    } catch (error) {
      console.error('登录失败：', error.response.data.message);
      return false;
    }
  };

  // 退出函数
  const logout = () => {
    removeToken(); // 清除本地token
    setIsAuthenticated(false);
    setUser(null);
  };

  // 提供给子组件的上下文值
  const contextValue = {
    isAuthenticated,
    user,
    loading,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children} {/* 加载完成前不渲染页面 */}
    </AuthContext.Provider>
  );
};