import './App.css';
import Homepage from './components/Homepage'
import SearchBar from './components/Searchbar'
import BrandCard from './components/BrandCard'
import {InstantSearch, connectAutoComplete, connectHits, connectStateResults, Configure, Hits } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch';
import { useState, useEffect, useRef } from 'react';

const searchClient = algoliasearch(
  'E5ACT1VI4D',
  '58c5723bb97942db9b754bf244b1da75'
);

function Hit(props: any) {
  //var cat = ""
  console.log(props['hit'])

  return <BrandCard brandName={props['hit']['name']} brandImage={<img style={{width: "260px"}} src={props['hit']['url_site_image']} alt="Girl in a jacket"></img>}></BrandCard>
}

function App() {
  const header_suggestion_node = useRef(document.createElement("div"));
  const header_searchbar_node = useRef(document.createElement("div"));
  const hero_suggestion_node = useRef(document.createElement("div"));
  const hero_searchbar_node = useRef(document.createElement("div"));

  function handleClick(e:any){
    if (header_suggestion_node.current.contains(e.target) || header_searchbar_node.current.contains(e.target)) {
      if(header_searchbar_node.current.firstElementChild!=null){
        if(header_searchbar_node.current.firstElementChild!.getAttribute('value')!==""){
          header_suggestion_node.current.style.display ='block'
          hero_suggestion_node.current.style.display ='none'
        }else{
          header_suggestion_node.current.style.display ='none'
        }}
      return
    }
    if (hero_suggestion_node.current.contains(e.target) || hero_searchbar_node.current.contains(e.target)) {
      if(hero_searchbar_node.current.firstElementChild!=null){
        if(hero_searchbar_node.current.firstElementChild!.getAttribute('value')!==""){
          hero_suggestion_node.current.style.display ='block'
          header_suggestion_node.current.style.display ='none'
        }else{
          hero_suggestion_node.current.style.display ='none'
        }}
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
  function StateResults({ searchState, searchResults, children, isSearchStalled  }:any){
    if(header_searchbar_node.current!==null&&hero_searchbar_node.current!==null){
    if(header_searchbar_node.current.contains(document.activeElement)){
      header_suggestion_node.current.style.display ='block'
      hero_suggestion_node.current.style.display ='none'
    }
    if(hero_searchbar_node.current.contains(document.activeElement)){
      hero_suggestion_node.current.style.display ='block'
      header_suggestion_node.current.style.display ='none'
    }
    if(searchState.query==="" || Object.keys(searchState).length===0){
      console.log("No query")
      return null
    }
    else if(searchResults && searchResults.nbHits !== 0){
      console.log("Results")
      return children
    }else{
      console.log("No results")
      return <div>No results have been found for {searchState.query}.</div>
    }
  }else{return null}};
  const Results = connectStateResults(StateResults);
  const Resultas = connectStateResults(StateResults);

  function StateResultsSearch({ searchState, searchResults, children }:any){
    if(query!==""){
      return children
    }else{
      return <div>No results have been found for {searchState.query}.</div>
    }
  };
  const SearchResults = connectStateResults(StateResultsSearch);

  function HeaderHits({ hits, ...props }:any){
    return (<ul style={{listStyleType:"none", paddingLeft:"20px"}}>
      {hits.slice(0, 5).map((hit:any) => (
        <li key={hit.objectID} style={{marginRight: '10px'}} onClick={()=>{header_suggestion_node.current.style.display ='none';setQuery(hit.tags[0])}}>{hit.tags[0]}</li>
      ))}
    </ul>)
      };
  
  const CustomHits = connectHits(HeaderHits);

  function HeroHits({ hits, ...props }:any){
    return (<ul style={{listStyleType:"none", paddingLeft:"20px"}}>
      {hits.slice(0, 5).map((hit:any) => (
        <li key={hit.objectID} style={{marginRight: '10px'}} onClick={()=>{hero_suggestion_node.current.style.display ='none';setQuery(hit.tags[0])}}>{hit.tags[0]}</li>
      ))}
    </ul>)
      };
  const CustomHitsHero = connectHits(HeroHits);

  function Autocomplete({ hits, currentRefinement, refine }: any){
    return <div style={{width:'100%', display:'flex', margin: '10px'}} ref={header_searchbar_node}><SearchBar value={currentRefinement} onChange={(event:any) => refine(event.currentTarget.value)}/></div>
  };
  var CustomAutocomplete = connectAutoComplete(Autocomplete);

  function AutocompleteHero({ hits, currentRefinement, refine }: any){
    return <div style={{width:'100%', display:'flex', margin: '10px'}} ref={hero_searchbar_node}><SearchBar value={currentRefinement} onChange={(event:any) => refine(event.currentTarget.value)}/></div>
  };
  const CustomAutocompleteHero = connectAutoComplete(AutocompleteHero);

  return (
  <InstantSearch searchClient={searchClient} indexName="brands_beats"><Homepage headerSuggestionBox={<div ref={header_suggestion_node}><Results><CustomHits/></Results></div>} heroSuggestionBox={<div ref={hero_suggestion_node}><Resultas><CustomHitsHero/></Resultas></div>} headerSearchBar={<CustomAutocomplete/>} heroSearchBar={<CustomAutocompleteHero/>} searchResults={
  <InstantSearch searchClient={searchClient} indexName="brands_beats">
  
  
  <SearchResults>
  <Configure query={query} hitsPerPage={6}distinct/>
  <Hits hitComponent={Hit}/>
  </SearchResults>
</InstantSearch>}></Homepage></InstantSearch>);
}

export default App;
