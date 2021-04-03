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
  const header_suggestion_node = useRef(document.createElement("ol"));
  const header_searchbar_node = useRef(document.createElement("div"));
  const hero_suggestion_node = useRef(document.createElement("ol"));
  const hero_searchbar_node = useRef(document.createElement("div"));

  function handleClick(e:any){
    if (header_suggestion_node.current.contains(e.target) || header_searchbar_node.current.contains(e.target)) {
      // inside click
      console.log("inside click header");
      header_suggestion_node.current.style.display ='block'
      hero_suggestion_node.current.style.display ='none'
      return
    }
    if (hero_suggestion_node.current.contains(e.target) || hero_searchbar_node.current.contains(e.target)) {
      // inside click
      console.log("inside click hero");
      hero_suggestion_node.current.style.display ='block'
      header_suggestion_node.current.style.display ='none'
      return
    }
    // outside click
    console.log("outside click");
    header_suggestion_node.current.style.display ='none'
    hero_suggestion_node.current.style.display ='none'
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
  const Resultas = connectStateResults(StateResults);

  function HeaderHits({ hits, ...props }:any){
    return (<ol style={{display: document.activeElement===header_searchbar_node.current.firstChild?'block':'none'}} ref={header_suggestion_node}>
      {hits.map((hit:any) => (
        <li key={hit.objectID} onClick={()=>setQuery(hit.name)}>{hit.name}</li>
      ))}
    </ol>)
      };
  
  const CustomHits = connectHits(HeaderHits);

  function HeroHits({ hits, ...props }:any){
    console.log(query)
    return (<ol style={{display: document.activeElement===hero_searchbar_node.current.firstChild?'block':'none'}} ref={hero_suggestion_node}>
      {hits.map((hit:any) => (
        <li key={hit.objectID} onClick={()=>setQuery(hit.name)}>{hit.name}</li>
      ))}
    </ol>)
      };
  const CustomHitsHero = connectHits(HeroHits);

  function Autocomplete({ hits, currentRefinement, refine }: any){
    return <div style={{width:'100%', display:'flex', margin: '10px'}} ref={header_searchbar_node}><SearchBar value={currentRefinement} onChange={(event:any) => refine(event.currentTarget.value)}/></div>
  };
  const CustomAutocomplete = connectAutoComplete(Autocomplete);

  function AutocompleteHero({ hits, currentRefinement, refine }: any){
    return <div style={{width:'100%', display:'flex', margin: '10px'}} ref={hero_searchbar_node}><SearchBar value={currentRefinement} onChange={(event:any) => refine(event.currentTarget.value)}/></div>
  };
  const CustomAutocompleteHero = connectAutoComplete(AutocompleteHero);

  return (
  <InstantSearch searchClient={searchClient} indexName="instant_search"><Homepage headerSuggestionBox={<Results><CustomHits/></Results>} heroSuggestionBox={<Resultas><CustomHitsHero/></Resultas>} headerSearchBar={<CustomAutocomplete/>} heroSearchBar={<CustomAutocompleteHero/>} searchResults></Homepage></InstantSearch>);
}

export default App;
