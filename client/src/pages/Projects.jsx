import { useState, useEffect } from 'react';
import { getProjects } from '../services/api';
import ProjectCard from '../components/projects/ProjectCard';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 加载项目数据（useEffect调用API）
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data);
        setError(null);
      } catch (err) {
        setError('获取项目失败，请稍后重试');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">我的项目</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;