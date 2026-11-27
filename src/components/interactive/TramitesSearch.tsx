import React, { useState } from 'react';
import {
  ArrowRight, Briefcase, CalendarDays, ClipboardList,
  FileCheck, GraduationCap, Handshake, Search,
} from 'lucide-react';
import { TRAMITES, type Tramite } from '../../data/site';

/* Los trámites viven en data/site.ts: este componente solo los filtra.
   Antes estaban duplicados aquí y se desincronizaban del menú. */
type Categoria = Tramite['categoria'];
const CATEGORIAS: readonly ('Todos' | Categoria)[] = ['Todos', 'Académico', 'Administrativo'];

const ICONOS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'clipboard-list': ClipboardList,
  'calendar-days': CalendarDays,
  'file-check': FileCheck,
  'graduation-cap': GraduationCap,
  briefcase: Briefcase,
  handshake: Handshake,
};

export default function TramitesSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'Todos' | Categoria>('Todos');

  const q = searchTerm.trim().toLowerCase();
  const filteredTramites = TRAMITES.filter((t) => {
    const matchesSearch =
      !q || t.nombre.toLowerCase().includes(q) || t.descripcion.toLowerCase().includes(q);
    const matchesCategory = activeCategory === 'Todos' || t.categoria === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getIcon = (name: string) => {
    const Cmp = ICONOS[name] ?? FileCheck;
    return <Cmp size={24} className="tramite-card-icon" />;
  };

  return (
    <div className="search-section">
      <div className="search-bar-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="¿Qué trámite deseas realizar? (Ej: Matrículas, Horarios…)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          aria-label="Buscar trámite"
        />
      </div>

      <div className="filter-tags">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            aria-pressed={activeCategory === cat}
          >
            {cat === 'Todos' ? 'Todos los trámites' : cat}
          </button>
        ))}
      </div>

      <div className="tramites-grid-animated">
        {filteredTramites.length > 0 ? (
          filteredTramites.map((item, index) => (
            <a
              key={item.slug}
              href={item.href}
              className="tramite-search-card"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="tramite-card-top">
                <div className="icon-badge">
                  {getIcon(item.icon)}
                </div>
                <span className="category-badge">{item.categoria}</span>
              </div>
              <h3>{item.nombre}</h3>
              <p>{item.descripcion}</p>
              <div className="card-link">
                <span>Ver trámite</span>
                <ArrowRight size={16} />
              </div>
            </a>
          ))
        ) : (
          <div className="no-results">
            <p>No se encontraron trámites que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>

      <style>{`
        .search-section {
          width: 100%;
        }

        .search-bar-wrapper {
          position: relative;
          max-width: 600px;
          margin: 0 auto var(--space-8) auto;
          display: flex;
          align-items: center;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          padding: var(--space-2) var(--space-6);
          box-shadow: var(--shadow-md);
          transition: all var(--transition-base);
        }

        .search-bar-wrapper:focus-within {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-soft);
          transform: translateY(-2px);
        }

        .search-icon {
          color: var(--text-secondary);
          margin-right: var(--space-3);
        }

        .search-input {
          width: 100%;
          border: none;
          background: transparent;
          color: var(--text-primary);
          outline: none;
          font-size: var(--text-base);
        }

        .filter-tags {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin-bottom: var(--space-12);
        }

        .filter-btn {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-full);
          cursor: pointer;
          font-weight: 500;
          font-size: var(--text-sm);
          transition: all var(--transition-base);
        }

        .filter-btn:hover {
          border-color: var(--accent);
          color: var(--color-orange-500);
          transform: translateY(-1px);
        }

        .filter-btn.active {
          background: var(--color-orange-500);
          border-color: var(--accent);
          color: white;
          box-shadow: var(--shadow-orange-glow);
        }

        .tramites-grid-animated {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
        }

        @media (min-width: 768px) {
          .tramites-grid-animated {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .tramites-grid-animated {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .tramite-search-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          text-decoration: none;
          color: inherit;
          transition: all var(--transition-base);
          animation: fadeInUp 0.4s ease forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .tramite-search-card:hover {
          transform: translateY(-4px);
          border-color: var(--color-purple-400);
          box-shadow: var(--shadow-lg);
        }

        [data-theme='dark'] .tramite-search-card:hover {
          border-color: var(--color-purple-600);
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }

        .tramite-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .icon-badge {
          background: var(--color-purple-50);
          color: var(--color-purple-600);
          padding: var(--space-3);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        [data-theme='dark'] .icon-badge {
          background: rgba(90, 58, 140, 0.2);
          color: var(--color-purple-300);
        }

        .category-badge {
          font-size: var(--text-xs);
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }

        .tramite-search-card h3 {
          margin: 0;
          font-size: var(--text-lg);
          color: var(--text-primary);
        }

        .tramite-search-card p {
          margin: 0;
          font-size: var(--text-sm);
          color: var(--text-secondary);
          line-height: var(--leading-normal);
          flex-grow: 1;
        }

        .card-link {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--color-orange-500);
          margin-top: var(--space-2);
        }

        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: var(--space-12) 0;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
