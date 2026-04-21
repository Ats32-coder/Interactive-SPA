import { useState } from 'react';
import { FilterBar } from './components/FilterBar';
import { Hero } from './components/Hero';
import { ProjectItem } from './components/ProjectItem';
import type { FilterMode, PortfolioProject } from './types';

function getVisibleProjects(projects: PortfolioProject[], filter: FilterMode) {
  switch (filter) {
    case 'featured':
      return projects.filter((project) => project.isFeatured);
    case 'building':
      return projects.filter((project) => project.status === 'Building');
    case 'launched':
      return projects.filter((project) => project.status === 'Launched');
    default:
      return projects;
  }
}

function App() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterMode>('all');
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  const visibleProjects = getVisibleProjects(projects, activeFilter);

  const handleAddProject = () => {
    const title = newProjectTitle.trim();

    if (!title) {
      return;
    }

    const project: PortfolioProject = {
      id: Date.now(),
      title,
      status: 'Building',
      isFeatured: false,
    };

    setProjects((currentProjects) => [...currentProjects, project]);
    setNewProjectTitle('');
  };

  const handleDeleteProject = (id: number) => {
    setProjects((currentProjects) =>
      currentProjects.filter((project) => project.id !== id),
    );

    if (editingProjectId === id) {
      setEditingProjectId(null);
      setEditingTitle('');
    }
  };

  const handleToggleFavorite = (id: number) => {
    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === id
          ? { ...project, isFeatured: !project.isFeatured }
          : project,
      ),
    );
  };

  const handleToggleStatus = (id: number) => {
    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === id
          ? {
              ...project,
              status: project.status === 'Building' ? 'Launched' : 'Building',
            }
          : project,
      ),
    );
  };

  const handleStartEditing = (project: PortfolioProject) => {
    setEditingProjectId(project.id);
    setEditingTitle(project.title);
  };

  const handleSaveEdit = (id: number) => {
    const title = editingTitle.trim();

    if (!title) {
      return;
    }

    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === id ? { ...project, title } : project,
      ),
    );
    setEditingProjectId(null);
    setEditingTitle('');
  };

  return (
    <div className="app-shell">
      <div className="background-glow background-glow--left" />
      <div className="background-glow background-glow--right" />

      <main>
        <Hero />

        <section className="projects-section" id="projects">
          <div className="section-heading">
            <h2>Minu projektid</h2>
            <p>Lisa, muuda, filtreeri ja halda projekte</p>
          </div>

          <div className="add-row">
            <input
              className="project-input"
              type="text"
              placeholder="Lisa projekt..."
              value={newProjectTitle}
              onChange={(event) => setNewProjectTitle(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleAddProject();
                }
              }}
            />

            <button className="add-button" type="button" onClick={handleAddProject}>
              Lisa
            </button>
          </div>

          <FilterBar activeFilter={activeFilter} onChange={setActiveFilter} />

          {visibleProjects.length === 0 ? (
            <p className="empty-state">Ühtegi projekti pole veel</p>
          ) : (
            <div className="project-list">
              {visibleProjects.map((project) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                  isEditing={editingProjectId === project.id}
                  editingTitle={editingTitle}
                  onEditingTitleChange={setEditingTitle}
                  onStartEditing={handleStartEditing}
                  onSaveEdit={handleSaveEdit}
                  onToggleFavorite={handleToggleFavorite}
                  onToggleStatus={handleToggleStatus}
                  onDelete={handleDeleteProject}
                />
              ))}
            </div>
          )}
        </section>

        <footer className="footer" id="contact">
          <a href="mailto:anvar.kubja@tthkee.onmicrosoft.com">
            Anvar.Kubja@tthkee.onmicrosoft.com
          </a>
        </footer>
      </main>
    </div>
  );
}

export default App;
