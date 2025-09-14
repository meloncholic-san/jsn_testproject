import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchSuperheroes, createSuperhero, updateSuperhero, deleteSuperhero } from '../../redux/superheroes/operations.js';
import EditHeroModal from '../../components/EditHeroModal/EditHeroModal.jsx';
import {
  selectSearch,
  selectSort,
  selectFilters,
} from '../../redux/filters/selectors'
import {
  setSearch,
  setSort,
} from '../../redux/filters/slice';
import HeroCreateForm from '../../components/HeroCreateForm/HeroCreateForm.jsx';
import HeroFilters from '../../components/HeroFilters/HeroFilters.jsx';
import HeroList from '../../components/HeroList/HeroList.jsx';
import { selectAllSuperheroes } from '../../redux/superheroes/selectors.js';
import Pagination from '../../components/Pagination/Pagination.jsx';
import { setPage } from '../../redux/filters/slice';
import { selectSuperheroPagination } from '../../redux/superheroes/selectors';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function MainPage() {
  const dispatch = useDispatch();
  const heroes = useSelector(selectAllSuperheroes);
  const filters = useSelector(selectFilters);
  const query = useQuery();
  const navigate = useNavigate();
  const pagination = useSelector(selectSuperheroPagination);
  const [editingHero, setEditingHero] = useState(null);

//Query params to redux state 
  useEffect(() => {
  const search = query.get('search') || '';
  const sort = query.get('sort') || 'nickname_asc';
  const page = query.get('page') || '';
  if (page && !isNaN(Number(page))) {
    dispatch(setPage(Number(page)));
  }
  dispatch(setSearch(search));
  dispatch(setSort(sort));
  }, [dispatch]);

//Redux state to query params sync
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search) params.set('search', filters.search);
    if (filters.sort) params.set('sort', filters.sort);
    if (filters.page) params.set('page', filters.page);

    navigate(`?${params.toString()}`, { replace: true });
  }, [filters, navigate]);

//Fetching heroes with sync with filters
  useEffect(() => {
    dispatch(fetchSuperheroes(filters));
  }, [dispatch, filters]);

//HANDLERS
  const handleCreateSuperhero = (heroData) => {
    dispatch(createSuperhero(heroData))
    .then(() => {
      dispatch(fetchSuperheroes(filters));
    });
  };

  const handleDeleteSuperhero = (id) => {
    dispatch(deleteSuperhero(id))
    .then(() => {
      dispatch(fetchSuperheroes(filters));
    });
  };
  const handleEditSuperhero = (hero) => {
    setEditingHero(hero);
  };
  const handleCloseModal = () => {
    setEditingHero(null);
  };

const handleSaveHero = (updatedHeroData) => {
  const formData = new FormData();
  formData.append('nickname', updatedHeroData.nickname);
  formData.append('real_name', updatedHeroData.real_name);
  formData.append('origin_description', updatedHeroData.origin_description);
  formData.append('catch_phrase', updatedHeroData.catch_phrase);
  formData.append('superpowers', updatedHeroData.superpowers.join(','));

  updatedHeroData.newImageFiles.forEach(file => {
    formData.append('images', file);
  });

  if (updatedHeroData.imagesToDelete.length > 0) {
    formData.append('imagesToDelete', JSON.stringify(updatedHeroData.imagesToDelete));
  }

  dispatch(updateSuperhero({ id: updatedHeroData._id, update: formData })).then(() => {
    setEditingHero(null);
  });
};

  const handleChangePage = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    dispatch(setPage(newPage));
  };

  const handleHeroClick = (id) => {
  navigate(`/hero/${id}`);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 pt-5 pb-5">Superheroes!</h1>
      <HeroCreateForm onCreate={handleCreateSuperhero} />
      <HeroFilters />
      <HeroList
        onEdit={handleEditSuperhero}
        onDelete={handleDeleteSuperhero}
        heroes={heroes}
        onHeroClick={handleHeroClick}
      />
      <Pagination handleChange={handleChangePage}/>
        
        {editingHero && (
        <EditHeroModal
          hero={editingHero}
          onClose={handleCloseModal}
          onSave={handleSaveHero}
        />
      )}
    </div>
  );
}