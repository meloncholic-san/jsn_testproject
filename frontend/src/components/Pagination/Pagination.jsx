import { useSelector } from 'react-redux';
import { selectFilters } from '../../redux/filters/selectors';
import { selectSuperheroPagination } from '../../redux/superheroes/selectors';

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const blue = 'rgb(37 99 235)';

export default function Pagination({ handleChange }) {
  const { page } = useSelector(selectFilters);
  const pagination = useSelector(selectSuperheroPagination);

  if (pagination.totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-6 mt-6 mb-6">
      <button
        onClick={() => handleChange(page - 1)}
        disabled={!pagination.hasPreviousPage}
        className={`flex items-center gap-1 px-4 py-2 border rounded
          transition-colors duration-200
          ${
            pagination.hasPreviousPage
              ? 'text-blue-600 border-blue-600 hover:bg-blue-100'
              : 'opacity-50 cursor-not-allowed'
          }`}
      >
        <FiArrowLeft size={18} style={{ color: blue }} />
      </button>

      <span className="text-sm font-medium">
        Page {page} of {pagination.totalPages}
      </span>

      <button
        onClick={() => handleChange(page + 1)}
        disabled={!pagination.hasNextPage}
        className={`flex items-center gap-1 px-4 py-2 border rounded
          transition-colors duration-200
          ${
            pagination.hasNextPage
              ? 'text-blue-600 border-blue-600 hover:bg-blue-100'
              : 'opacity-50 cursor-not-allowed'
          }`}
      >
        <FiArrowRight size={18} style={{ color: blue }} />
      </button>
    </div>
  );
}
