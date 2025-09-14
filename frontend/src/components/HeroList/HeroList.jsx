
import { useSelector } from 'react-redux';
import { selectSuperheroLoading } from '../../redux/superheroes/selectors';

import HeroCard from '../HeroCard/HeroCard.jsx';

function HeroSkeleton() {
  return (
    <div className="w-[357px] h-[530px] border border-gray-300 rounded-md p-4 animate-pulse bg-gray-200"></div>
  );
}

export default function HeroList({ heroes, onEdit, onDelete, onHeroClick  }) {
  const isLoading = useSelector(selectSuperheroLoading);

  const CardWrapper = ({ children }) => (
    <div className="flex flex-wrap justify-center gap-4 px-2 pb-5">
      {children}
    </div>
  );
  // Skeleton
  if (isLoading) {
    return (
      <CardWrapper>
        {[...Array(5)].map((_, i) => (
          <HeroSkeleton key={i} />
        ))}
      </CardWrapper>
    );
  }
  
  if (!heroes.length) {
    return <p className="text-center text-gray-500">No superheroes found.</p>;
  }

  return (
    <CardWrapper>
      {heroes.map((hero) => (
        <HeroCard
          key={hero._id}
          hero={hero}
          onEdit={onEdit}
          onDelete={onDelete}
          onClick={() => onHeroClick(hero._id)}
        />
      ))}
    </CardWrapper>
  );
}