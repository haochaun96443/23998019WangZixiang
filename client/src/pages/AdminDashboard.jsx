import { useState, useEffect } from 'react';
import { getProjects, createProject, deleteProject } from '../services/api';
import ProjectForm from '../components/admin/ProjectForm';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // 加载项目列表（管理员可编辑）
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
      setError(null);
    } catch (err) {
      setError('获取项目列表失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 新增/编辑项目提交
  const handleProjectSubmit = async (projectData) => {
    try {
      if (projectData._id) {
        // 编辑项目（后续补充updateProject接口）
        // await updateProject(projectData._id, projectData);
      } else {
        // 新增项目
        await createProject(projectData);
      }
      fetchProjects(); // 提交后刷新列表
      setIsFormOpen(false);
    } catch (err) {
      setError('提交项目失败');
      console.error(err);
    }
  };

  // 删除项目
  const handleDelete = async (id) => {
    if (window.confirm('确定要删除该项目吗？')) {
      try {
        await deleteProject(id);
        fetchProjects();
      } catch (err) {
        setError('删除项目失败');
        console.error(err);
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">管理员面板</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          新增项目
        </button>
      </div>

      {/* 项目表单（新增/编辑） */}
      {isFormOpen && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">新增项目</h2>
          <ProjectForm onSubmit={handleProjectSubmit} onCancel={() => setIsFormOpen(false)} />
        </div>
      )}

      {/* 项目列表（可删除） */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">项目名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project._id}>
                <td className="px-6 py-4 whitespace-nowrap">{project.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {
                      setIsFormOpen(true);
                      // 后续补充编辑逻辑：将项目数据传入表单
                    }}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;