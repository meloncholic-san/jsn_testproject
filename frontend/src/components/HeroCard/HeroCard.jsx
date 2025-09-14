import { FiEdit, FiTrash2 } from 'react-icons/fi';

export default function HeroCard({ hero, onEdit, onDelete, onClick }) {
  return (
    <div
      className="border rounded-md p-4 bg-white shadow-md w-[390px] cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between mb-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(hero);
          }}
          title="Edit"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FiEdit size={20} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(hero._id);
          }}
          title="Delete"
          className="text-red-600 hover:text-red-800 transition-colors"
        >
          <FiTrash2 size={20} />
        </button>
      </div>

      <div className="w-full aspect-[3/4] overflow-hidden rounded mb-2">
        <img
          src={hero.images?.[0]?.url || '/img/superhero-thumbnail-t.png'}
          alt={hero.nickname}
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-xl text-center font-semibold">{hero.nickname}</h2>
    </div>
  );
}
