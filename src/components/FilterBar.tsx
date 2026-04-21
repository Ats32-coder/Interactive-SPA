import type { FilterMode } from '../types';

interface FilterBarProps {
  activeFilter: FilterMode;
  onChange: (filter: FilterMode) => void;
}

const filters: { label: string; value: FilterMode }[] = [
  { label: 'Kõik', value: 'all' },
  { label: 'Lemmikud', value: 'featured' },
  { label: 'Arendamisel', value: 'building' },
  { label: 'Valmis', value: 'launched' },
];

export function FilterBar({ activeFilter, onChange }: FilterBarProps) {
  return (
    <div className="filter-row" aria-label="Projektide filtrid">
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={`filter-chip ${
            activeFilter === filter.value ? 'filter-chip--active' : ''
          }`}
          type="button"
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
