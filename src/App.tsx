import './App.css';
import Homepage from './components/Homepage'
import SearchBar from './components/Searchbar'
import {InstantSearch, connectAutoComplete, connectHits, connectStateResults  } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch';
import { useState, useEffect, useRef } from 'react';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

function App() {
  console.log("App Created")
  const node = useRef(document.createElement("ol"));
  const snode = useRef(document.createElement("div"));

  function handleClick(e:any){
    console.log(e.target)
    console.log(node.current)
    console.log(snode.current)
    if (node.current.contains(e.target) || snode.current.contains(e.target)) {
      // inside click
      console.log("inside click");
      node.current.style.display ='block'
      return
    }
    // outside click
    console.log("outside click");
    node.current.style.display ='none'
    return
  }
  
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const[query, setQuery] = useState("")
  console.log(query)
  function StateResults({ searchState, searchResults, children }:any){
    if(searchState.query==="" || Object.keys(searchState).length===0){
      //console.log("No query")
      return null
    }
    else if(searchResults && searchResults.nbHits !== 0){
      //console.log("Results")
      return children
    }else{
      //console.log("No results")
      return <div>No results have been found for {searchState.query}.</div>
    }
  };
  const Results = connectStateResults(StateResults);

  function Hits({ hits, ...props }:any){
    return (<ol ref={node}>
      {hits.map((hit:any) => (
        <li key={hit.objectID} onClick={()=>setQuery(hit.name)}>{hit.name}</li>
      ))}
    </ol>)
      };
  
  const CustomHits = connectHits(Hits);

  function Autocomplete({ hits, currentRefinement, refine }: any){
    return <div ref={snode}><SearchBar value={currentRefinement} onChange={(event:any) => refine(event.currentTarget.value)}/></div>
  };
  const CustomAutocomplete = connectAutoComplete(Autocomplete);
  return (
  <InstantSearch searchClient={searchClient} indexName="instant_search"><Homepage headerSuggestionBox={<div id="GER" onFocus={()=>console.log("Focus")}><Results><CustomHits/></Results></div>} headerSearchBar={<CustomAutocomplete/>} heroSearchBar={<div onClick={()=>setQuery("AM")}>JJ</div>} searchResults></Homepage></InstantSearch>);
}

export default App;
