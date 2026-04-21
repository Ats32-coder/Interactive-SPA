import type { KeyboardEvent } from 'react';
import type { PortfolioProject } from '../types';

interface ProjectItemProps {
  project: PortfolioProject;
  isEditing: boolean;
  editingTitle: string;
  onEditingTitleChange: (value: string) => void;
  onStartEditing: (project: PortfolioProject) => void;
  onSaveEdit: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onDelete: (id: number) => void;
}

function getStatusLabel(project: PortfolioProject) {
  return project.status === 'Building' ? 'Arendamisel' : 'Valmis';
}

function handleEnterKey(event: KeyboardEvent<HTMLInputElement>, callback: () => void) {
  if (event.key === 'Enter') {
    callback();
  }
}

export function ProjectItem({
  project,
  isEditing,
  editingTitle,
  onEditingTitleChange,
  onStartEditing,
  onSaveEdit,
  onToggleFavorite,
  onToggleStatus,
  onDelete,
}: ProjectItemProps) {
  const statusLabel = getStatusLabel(project);
  const metaText = project.isFeatured ? `${statusLabel} • Lemmik` : statusLabel;

  return (
    <article className="project-card">
      <div className="project-main">
        {isEditing ? (
          <input
            className="project-edit-input"
            value={editingTitle}
            onChange={(event) => onEditingTitleChange(event.target.value)}
            onKeyDown={(event) => handleEnterKey(event, () => onSaveEdit(project.id))}
          />
        ) : (
          <>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-meta">{metaText}</p>
          </>
        )}
      </div>

      <div className="project-actions">
        <button
          className="project-button"
          type="button"
          onClick={() => onToggleFavorite(project.id)}
        >
          {project.isFeatured ? 'Eemalda lemmik' : 'Lemmik'}
        </button>

        <button
          className="project-button"
          type="button"
          onClick={() => onToggleStatus(project.id)}
        >
          {project.status === 'Building' ? 'Valmis' : 'Arendamisel'}
        </button>

        {isEditing ? (
          <button className="project-button" type="button" onClick={() => onSaveEdit(project.id)}>
            Salvesta
          </button>
        ) : (
          <button
            className="project-button"
            type="button"
            onClick={() => onStartEditing(project)}
          >
            Muuda
          </button>
        )}

        <button className="project-button" type="button" onClick={() => onDelete(project.id)}>
          Kustuta
        </button>
      </div>
    </article>
  );
}
