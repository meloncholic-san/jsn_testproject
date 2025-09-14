import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ImageGallery from 'react-image-gallery';

import {
  selectHeroById,
  selectSuperheroLoading,
  selectSuperheroError,
  selectCurrentHero,
} from '../../redux/superheroes/selectors';

import { fetchSuperheroById } from '../../redux/superheroes/operations';
import { setCurrentHero } from '../../redux/superheroes/slice';

function HeroDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const heroFromList = useSelector(selectHeroById(id));
  const currentHero = useSelector(selectCurrentHero);
  const loading = useSelector(selectSuperheroLoading);
  const error = useSelector(selectSuperheroError);

  useEffect(() => {
    if (heroFromList) {
      dispatch(setCurrentHero(heroFromList));
    } else {
      dispatch(fetchSuperheroById(id));
    }
  }, [dispatch, id, heroFromList]);

  if (loading) return <div className="text-center p-6 text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-600 p-6">{error}</div>;
  if (!currentHero) return <div className="text-center p-6">Hero not found</div>;

  const hero = currentHero;

  const galleryImages = hero.images?.map((img) => ({
    original: img.url,
    thumbnail: img.url,
    originalAlt: hero.nickname,
    thumbnailAlt: hero.nickname,
  })) || [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">{hero.nickname}</h1>

        {/* Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-8">
        <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
            <h3 className="text-gray-600 text-sm uppercase font-semibold mb-1">Real Name</h3>
            <p className="text-lg text-gray-800">{hero.real_name}</p>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
            <h3 className="text-gray-600 text-sm uppercase font-semibold mb-1">Origin</h3>
            <p className="text-lg text-gray-800">{hero.origin_description}</p>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
            <h3 className="text-gray-600 text-sm uppercase font-semibold mb-1">Catch Phrase</h3>
            <p className="text-lg text-gray-800 italic">“{hero.catch_phrase}”</p>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
            <h3 className="text-gray-600 text-sm uppercase font-semibold mb-1">Superpowers</h3>
            <p className="text-lg text-gray-800">{hero.superpowers?.join(', ')}</p>
        </div>
        </div>


        {/* Gallery */}
        {galleryImages.length > 0 && (
            <div className="w-full max-w-4xl mx-auto mb-10">
            <ImageGallery
                items={galleryImages}
                showPlayButton={false}
                showFullscreenButton={true}
                showBullets={true}
                showThumbnails={true}
                thumbnailPosition="bottom"
                renderItem={(item) => (
                    <div className="flex justify-center items-center bg-black">
                    <img
                        src={item.original}
                        alt={item.originalAlt}
                        className="max-h-[760px] min-h-[760px] object-contain"
                    />
                    </div>
                )}
            />
            </div>
        )}
      </div>
    </div>
  );
}

export default HeroDetailPage;
