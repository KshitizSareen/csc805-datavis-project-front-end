import React, { useState } from "react";
import DeckGL from "deck.gl";
import { Map } from "react-map-gl";
import {IconLayer} from '@deck.gl/layers';
import {WebMercatorViewport} from '@deck.gl/core';
import axios from 'axios';


const ICON_MAPPING = {
    marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
  };

export default function MapComponent({resultsState,mapDispatch,resultsDispatch})
{

  const [preLoad,setPreload] = useState(true)
    const viewState = {

        latitude: 37.0902,
        longitude: -95.7129,
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
    }

  const homeLayers = [
    // only needed when using shadows - a plane for shadows to drop on
    new IconLayer(
      {
      id: 'icon-layer',
      data: resultsState,
      pickable: true,
      getPosition: d => [d.Long,d.Lat],
      iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
      iconMapping: ICON_MAPPING,
      getIcon: d => 'marker',
      sizeScale: 15,
      getColor: [255,255,255],
      onClick : (info)=>{
        // zoomToCounties(info.object)
        //setLayer(countyLayers)
      }
    }
    )
  ];

    return(
        <DeckGL
        layers={homeLayers}
         initialViewState={viewState}
         height={window.parent.innerHeight}
         width={0.7*window.parent.innerWidth}
         controller={true}// allows the user to move the map around
         getTooltip={({object}) => object ? object.Address ? object.Address : object.state ? object.state : null : null} 
         onViewStateChange={({viewState})=>{
          const viewport = new WebMercatorViewport(viewState);
          let topLeft=viewport.unproject([0,0]);
          let bottomRight = viewport.unproject([viewState.width,viewState.height]);
          mapDispatch({
            type:'changeMapState',
            zoom: viewState.zoom,
            minLat: bottomRight[1],
            maxLat: topLeft[1],
            minLong: topLeft[0],
            maxLong: bottomRight[0]
          })
          if(preLoad)
          {
          axios.post("https://4z7a62t8x1.execute-api.us-west-1.amazonaws.com/csc805-datavis-stage/search-houses",{
    "housingTypes": "".length === 0 ? "NULL" : "",
    "minPrice": 500,
    "maxPrice": 1000,
    "minSqFeet": 500,
    "maxSqFeet": 1000,
    "minBeds": 2,
    "maxBeds": 3,
    "minBaths": 2,
    "maxBaths": 3,
    "catsAllowed": "NULL",
    "dogsAllowed": "NULL",
    "smokingAllowed": "NULL",
    "wheelchairAccess": "NULL",
    "electricVehicleCharge": "NULL",
    "comesFurnished": "NULL",
    "minLat": bottomRight[1],
    "maxLat": topLeft[1],
    "minLong": topLeft[0],
    "maxLong": bottomRight[0]
  }).then(res=>{
    resultsDispatch({
      type: 'changeResultsState', results: res.data
    })
  })
  setPreload(false)
}
         }}
         style={{
          position: 'absolute'
         }}
        >
          <Map
            mapStyle="mapbox://styles/mapbox/dark-v11"
            mapboxAccessToken={'pk.eyJ1Ijoia3NoaXRpejA3IiwiYSI6ImNsYXJrYWZ3NjAwejQ0MW1zYXQ1ZnN5OXYifQ.PnLABlEn-j7hpuGftiJ-LQ'}
           />
        </DeckGL>
    )
}