export const selectAllSuperheroes = (state) => state.superheroes.items || []
export const selectSuperheroLoading = (state) => state.superheroes.isLoading;
export const selectSuperheroError = (state) => state.superheroes.error;
export const selectSuperheroPagination = (state) => state.superheroes.pagination;

export const selectHeroById = (id) => {
  return (state) => {
    return state.superheroes.items.find(hero => hero._id === id);
  };
};

export const selectCurrentHero = state => state.superheroes.currentHero;