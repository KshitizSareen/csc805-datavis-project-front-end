import React, {useEffect, useReducer } from "react";
import MapComponent from "./MapComponent";
import FiltersComponent from "./FiltersComponent";
import ChartsComponent from "./ChartsComponent";
import ContentComponent from "./ContentComponent";
import { ChartsReducer} from "../State/chartsState";
import MapReducer, { initialMapState } from "../State/MapState";
import ResultsReducer, { initialResultsState } from "../State/ResultsState";
// Set your mapbox access token here

// Viewport settings

// Data to be used by the LineLayer

function Home() {


  const [mapState,mapDispatch] = useReducer(MapReducer,initialMapState)
  const [resultsState,resultsDispatch] = useReducer(ResultsReducer,initialResultsState)
  const [chartsByLocation,chartsLocationDispatch] = useReducer(ChartsReducer,[])
  const [chartsByCategory,chartsCategoryDispatch] = useReducer(ChartsReducer,[])
  const [chartsByListing,chartsListingDispatch] = useReducer(ResultsReducer,[])


    return (
        <div style={{
            width: 2*window.parent.innerWidth,
            height: window.parent.innerHeight,
            overflow: 'hidden'
        }}>
        <MapComponent resultsState={resultsState} mapDispatch={mapDispatch} resultsDispatch={resultsDispatch}/>
        <FiltersComponent mapState={mapState} chartsLocationDispatch={chartsLocationDispatch}  
        chartsCategoryDispatch={chartsCategoryDispatch} resultsDispatch={resultsDispatch} chartsListingDispatch={chartsListingDispatch}/>
        <ChartsComponent chartsByListing={chartsByListing} chartsByLocation={chartsByLocation} chartsByCategory={chartsByCategory}/>
       </div>
    )
}

export default Home;