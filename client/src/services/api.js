import axios from 'axios';
import { getToken } from '../utils/storage';

// 创建axios实例，配置后端API基础地址
const api = axios.create({
  baseURL: 'https://你的后端API地址.onrender.com/api', // 替换为作业提供的后端Live URL
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器：给需要认证的请求添加token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 作业要求的JWT请求头
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器：统一处理错误
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401未授权：清除token并跳转登录页
    if (error.response?.status === 401) {
      localStorage.removeItem('portfolio_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ---------------------- 公开接口 ----------------------
// 1. 获取项目列表
export const getProjects = () => api.get('/projects');

// 2. 获取博客列表
export const getBlogs = () => api.get('/blog');

// 3. 获取博客详情
export const getBlogDetail = (id) => api.get(`/blog/${id}`);

// 4. 提交联系表单
export const submitContact = (formData) => api.post('/contact', formData);

// ---------------------- 认证接口 ----------------------
// 5. 用户注册
export const registerUser = (userData) => api.post('/users/register', userData);

// 6. 用户登录
export const loginUser = (credentials) => api.post('/users/login', credentials);

// ---------------------- 管理员接口（受保护） ----------------------
// 7. 新增项目
export const createProject = (projectData) => api.post('/admin/projects', projectData);

// 8. 编辑项目
export const updateProject = (id, projectData) => api.put(`/admin/projects/${id}`, projectData);

// 9. 删除项目
export const deleteProject = (id) => api.delete(`/admin/projects/${id}`);

// （其他博客增删改接口同理，按后端API文档补充）

export default api;