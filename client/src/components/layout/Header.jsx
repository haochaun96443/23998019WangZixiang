import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // 后续实现AuthContext时补充逻辑
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          我的作品集
        </Link>
        <nav className="flex gap-6">
          {/* 公开链接（所有人可见） */}
          <Link to="/" className="hover:text-blue-600">首页</Link>
          <Link to="/projects" className="hover:text-blue-600">项目</Link>
          <Link to="/blog" className="hover:text-blue-600">博客</Link>
          <Link to="/contact" className="hover:text-blue-600">联系我</Link>

          {/* 认证相关链接（根据登录状态切换） */}
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:text-blue-600">登录</Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">注册</Link>
            </>
          ) : (
            <>
              <Link to="/admin" className="hover:text-blue-600">管理员面板</Link>
              <button onClick={handleLogout} className="text-red-600 hover:underline">退出</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;