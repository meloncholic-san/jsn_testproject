import { useSelector, useDispatch } from 'react-redux';
import { setSearch, setSort, resetFilters } from '../../redux/filters/slice';
import { selectSearch, selectSort } from '../../redux/filters/selectors';

import { useCallback, useRef } from 'react';
import debounce from 'lodash/debounce';

export default function HeroFilters() {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);
  const sort = useSelector(selectSort);
  const inputRef = useRef(null);

  const debouncedSetSearch = useCallback(
    debounce((value) => {
      dispatch(setSearch(value));
    }, 300),
    [dispatch]
  );

  const handleSearchChange = (e) => {
    debouncedSetSearch(e.target.value);
  };

  return (
    <div className="mb-6 p-3 border bg-white border-gray-300 rounded-md shadow-sm flex flex-col gap-3">
      <div className="flex justify-between items-center flex-wrap gap-4">
        {/*  Search */}
        <div className="relative w-full max-w-sm flex-shrink-0">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search superheroes..."
            defaultValue={search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/*  Sort */}
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => dispatch(setSort(e.target.value))}
            className="appearance-none border border-gray-300 rounded-md p-2 pr-8 text-sm bg-white cursor-pointer"
          >
            <option value="nickname_asc">Nickname (A-Z)</option>
            <option value="nickname_desc">Nickname (Z-A)</option>
            <option value="created_desc">Newest</option>
            <option value="created_asc">Oldest</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/*  Reset */}
      <div className="flex justify-start">
        <button
          onClick={() => {
            dispatch(resetFilters());
            debouncedSetSearch.cancel();
            if (inputRef.current) inputRef.current.value = '';
          }}
          className="px-3 py-1 text-xs border rounded-md bg-gray-100 hover:bg-gray-200 transition"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
