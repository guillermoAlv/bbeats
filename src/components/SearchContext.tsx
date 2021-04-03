import {createContext } from 'react';

const SearchContext = createContext({
  query: 'dfdsfdf',
  setQuery: (hh:string) => {}
});

export default SearchContext;