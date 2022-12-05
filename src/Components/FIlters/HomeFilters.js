import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';

const HousingTypesArray=[['Apartment','Condo','Manufactured','Duplex'],['Townhouse','Loft','House','Cottage/Cabin'],['Flat','In-law','Land','Assisted Living']]
const HousingTypeValues={
  'Apartment': false,
  'Condo': false,
  'Manufactured': false,
  'Duplex': false,
  'Townhouse': false,
  'Loft': false,
  'House': false,
  'Cottage/Cabin': false,
  'Flat': false,
  'In-law': false,
  'Land': false,
  'Assisted Living': false,
}
const booleanFilters=[["Cats Allowed","Dogs Allowed","Smoking Allowed"],["Wheelchair Access","Electric Vehicle Charge","Comes Furnished"]]
const booleanFilterValues={
  'Cats Allowed': "NULL",
  'Dogs Allowed': "NULL",
  'Smoking Allowed': "NULL",
  'Wheelchair Access': "NULL",
  'Electric Vehicle Charge': "NULL",
  'Comes Furnished': "NULL",
}

export default function HomeFilters({chartsLocationDispatch,chartsCategoryDispatch,mapState,resultsDispatch,chartsListingDispatch})
{

    const [minPrice,setMinPrice]=useState(500);
    const [maxPrice,setMaxPrice]=useState(1000);
    const [minSquareFeet,setMinSquareFeet]=useState(500);
    const [maxSquareFeet,setMaxSquareFeet]=useState(1000);
    const [minBeds,setMinBeds]=useState(2);
    const [maxBeds,setMaxBeds]=useState(3);
    const [minBaths,setMinBaths]=useState(2);
    const [maxBaths,setMaxBaths]=useState(3);


    function getHousingTypes(){
      let HousingTypeArray=[];
      if(HousingTypeValues['Apartment']===true)
      {
        HousingTypeArray.push('0')
      }
      if(HousingTypeValues['Condo']===true)
      {
        HousingTypeArray.push('1')
      }
      if(HousingTypeValues['House']===true)
      {
        HousingTypeArray.push('2')
      }
      if(HousingTypeValues['Duplex']===true)
      {
        HousingTypeArray.push('3')
      }
      if(HousingTypeValues['Townhouse']===true)
      {
        HousingTypeArray.push('4')
      }
      if(HousingTypeValues['Loft']===true)
      {
        HousingTypeArray.push('5')
      }
      if(HousingTypeValues['Manufactured']===true)
      {
        HousingTypeArray.push('6')
      }
      if(HousingTypeValues['Cottage/Cabin']===true)
      {
        HousingTypeArray.push('7')
      }
      if(HousingTypeValues['Flat']===true)
      {
        HousingTypeArray.push('8')
      }
      if(HousingTypeValues['In-law']===true)
      {
        HousingTypeArray.push('9')
      }
      if(HousingTypeValues['Land']===true)
      {
        HousingTypeArray.push('10')
      }
      if(HousingTypeValues['Assisted Living']===true)
      {
        HousingTypeArray.push('11')
      }

      const housing = HousingTypeArray.join(',')
      return housing;
    }

    function searchHousing(dispatchFunction)
    {
      const housing = getHousingTypes();
      axios.post("https://4z7a62t8x1.execute-api.us-west-1.amazonaws.com/csc805-datavis-stage/search-houses",{
        "housingTypes": housing.length === 0 ? "NULL" : "'"+housing+"'",
        "minPrice": minPrice,
        "maxPrice": maxPrice,
        "minSqFeet": minSquareFeet,
        "maxSqFeet": maxSquareFeet,
        "minBeds": minBeds,
        "maxBeds": maxBeds,
        "minBaths": minBaths,
        "maxBaths": maxBaths,
        "catsAllowed": booleanFilterValues['Cats Allowed'],
        "dogsAllowed": booleanFilterValues['Dogs Allowed'],
        "smokingAllowed": booleanFilterValues['Smoking Allowed'],
        "wheelchairAccess": booleanFilterValues['Wheelchair Access'],
        "electricVehicleCharge": booleanFilterValues['Electric Vehicle Charge'],
        "comesFurnished": booleanFilterValues['Comes Furnished'],
        "minLat": mapState.minLat,
        "maxLat": mapState.maxLat,
        "minLong": mapState.minLong,
        "maxLong": mapState.maxLong
      }).then(res=>{
        console.log(res.data);

        dispatchFunction({
          type: 'changeResultsState', results: res.data
        })
      }).catch(()=>{
        alert("Please Narrow Down Your Search")
      })
    }

    function groupHousesByLocation(location){
      const housing = getHousingTypes();
      axios.post("https://4z7a62t8x1.execute-api.us-west-1.amazonaws.com/csc805-datavis-stage/group-houses-by-"+location,{
        "housingTypes": housing.length === 0 ? "NULL" : "'"+housing+"'",
        "minPrice": minPrice,
        "maxPrice": maxPrice,
        "minSqFeet": minSquareFeet,
        "maxSqFeet": maxSquareFeet,
        "minBeds": minBeds,
        "maxBeds": maxBeds,
        "minBaths": minBaths,
        "maxBaths": maxBaths,
        "catsAllowed": booleanFilterValues['Cats Allowed'],
        "dogsAllowed": booleanFilterValues['Dogs Allowed'],
        "smokingAllowed": booleanFilterValues['Smoking Allowed'],
        "wheelchairAccess": booleanFilterValues['Wheelchair Access'],
        "electricVehicleCharge": booleanFilterValues['Electric Vehicle Charge'],
        "comesFurnished": booleanFilterValues['Comes Furnished'],
        "minLat": mapState.minLat,
        "maxLat": mapState.maxLat,
        "minLong": mapState.minLong,
        "maxLong": mapState.maxLong
      }).then(res=>{
        chartsLocationDispatch({
          type: 'changeChartsState', newData: res.data
        })
      }).catch(()=>{
        alert("Please Narrow Down Your Search")
      })
    }

    function groupHousesByType()
    {
      const housing = getHousingTypes();
      axios.post("https://4z7a62t8x1.execute-api.us-west-1.amazonaws.com/csc805-datavis-stage/group-houses-by-type",{
        "housingTypes": housing.length === 0 ? "NULL" : "'"+housing+"'",
        "minPrice": minPrice,
        "maxPrice": maxPrice,
        "minSqFeet": minSquareFeet,
        "maxSqFeet": maxSquareFeet,
        "minBeds": minBeds,
        "maxBeds": maxBeds,
        "minBaths": minBaths,
        "maxBaths": maxBaths,
        "catsAllowed": booleanFilterValues['Cats Allowed'],
        "dogsAllowed": booleanFilterValues['Dogs Allowed'],
        "smokingAllowed": booleanFilterValues['Smoking Allowed'],
        "wheelchairAccess": booleanFilterValues['Wheelchair Access'],
        "electricVehicleCharge": booleanFilterValues['Electric Vehicle Charge'],
        "comesFurnished": booleanFilterValues['Comes Furnished'],
        "minLat": mapState.minLat,
        "maxLat": mapState.maxLat,
        "minLong": mapState.minLong,
        "maxLong": mapState.maxLong
      }).then(res=>{
        chartsCategoryDispatch({
          type: 'changeChartsState', newData: res.data
        })
      }).catch(()=>{
        alert("Please Narrow Down Your Search")
      })
    }

    function groupHousing(){
      if(mapState.zoom<=5)
      {
        groupHousesByLocation("state");
      }
      else if(mapState.zoom<=7)
      {
        groupHousesByLocation("county");
      }
      else if(mapState.zoom<=9.5)
      {
        groupHousesByLocation("city");
      }
      else
      {
        groupHousesByLocation("neighbourhood");
      }
      groupHousesByType();
      searchHousing(chartsListingDispatch)
      console.log(chartsListingDispatch)
    }
    

    return(
        <div style={{
          height: '90%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}>
                           <p style={{
              alignSelf: 'center',
              marginBottom: '1%'
             }}>Housing Types</p>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '3%',
            width: 0.3*window.parent.innerWidth,
            justifyContent: 'space-evenly'
          }}>
            {
              HousingTypesArray.map(typeArray=>{
                return(
                  <Form style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                    {
                    typeArray.map(type=>{
                      return(
                        <Form.Check
                        label={type}
                        name="group1"
                        type={"checkbox"}
                        onChange={(event)=>{
                          HousingTypeValues[type] = event.target.checked;
                        }}
                      />
                      )
                    })
                  }
                  </Form>
                )
              })
            }
            </div>
    
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '3%',
          }}>
                 <p style={{
              alignSelf: 'center',
              marginBottom: '1%'
             }}>Price</p>
             <div style={{
              display: 'flex',
              alignSelf: 'center',
              justifyContent: 'space-evenly',
             }}>
             <Form.Control type="number" placeholder="Minimum"  style={{
              width: '30%'
             }} onChange={(event)=>{
              const value = event.target.valueAsNumber;
              if(isNaN(value))
              {
                setMinPrice(0);
              }
              else{
                setMinPrice(value);
              }
             }} value={minPrice}/>
             <Form.Control type="number" placeholder="Maximum"  style={{
              width: '30%'
             }} onChange={(event)=>{
              const value = event.target.valueAsNumber;
              if(isNaN(value))
              {
                setMaxPrice(0);
              }
              else{
                setMaxPrice(value);
              }
             }} value={maxPrice}/>
             </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '3%',
          }}>
                 <p style={{
              alignSelf: 'center',
              marginBottom: '1%'
             }}>Square Feet</p>
             <div style={{
              display: 'flex',
              alignSelf: 'center',
              justifyContent: 'space-evenly'
             }}>
             <Form.Control type="number" placeholder="Minimum"  style={{
              width: '30%'
             }} onChange={(event)=>{
              const value = event.target.valueAsNumber;
              if(isNaN(value))
              {
                setMinSquareFeet(0);
              }
              else{
                setMinSquareFeet(value);
              }
             }} value={minSquareFeet}/>
             <Form.Control type="number" placeholder="Maximum"  style={{
              width: '30%'
             }} onChange={(event)=>{
              const value = event.target.valueAsNumber;
              if(isNaN(value))
              {
                setMaxSquareFeet(0);
              }
              else{
                setMaxSquareFeet(value);
              }
             }} value={maxSquareFeet}/>
             </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '3%',
          }}>
                 <p style={{
              alignSelf: 'center',
              marginBottom: '1%'
             }}>No. of Beds</p>
             <div style={{
              display: 'flex',
              alignSelf: 'center',
              justifyContent: 'space-evenly'
             }}>
             <Form.Control type="number" placeholder="Minimum"  style={{
              width: '30%'
             }} onChange={(event)=>{
              const value = event.target.valueAsNumber;
              if(isNaN(value))
              {
                setMinBeds(0);
              }
              else{
                setMinBeds(value);
              }
             }} value={minBeds}/>
             <Form.Control type="number" placeholder="Maximum"  style={{
              width: '30%'
             }} onChange={(event)=>{
              const value = event.target.valueAsNumber;
              if(isNaN(value))
              {
                setMaxBeds(0);
              }
              else{
                setMaxBeds(value);
              }
             }} value={maxBeds}/>
             </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '3%',
          }}>
                 <p style={{
              alignSelf: 'center',
              marginBottom: '1%'
             }}>No. of Baths</p>
             <div style={{
              display: 'flex',
              alignSelf: 'center',
              justifyContent: 'space-evenly'
             }}>
             <Form.Control type="number" placeholder="Minimum"  style={{
              width: '30%'
             }} onChange={(event)=>{
              const value = event.target.valueAsNumber;
              if(isNaN(value))
              {
                setMinBaths(0);
              }
              else{
                setMinBaths(value);
              }
             }} value={minBaths}/>
             <Form.Control type="number" placeholder="Maximum"  style={{
              width: '30%'
             }} onChange={(event)=>{
              const value = event.target.valueAsNumber;
              if(isNaN(value))
              {
                setMaxBaths(0);
              }
              else{
                setMaxBaths(value);
              }
             }} value={maxBaths}/>
             </div>
          </div>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '3%',
            width: 0.3*window.parent.innerWidth,
            justifyContent: 'space-evenly'
          }}>
            {
              booleanFilters.map(typeArray=>{
                return(
                  <Form style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                    {
                    typeArray.map(type=>{
                      return(
                        <Form.Check
                        label={type}
                        name="group1"
                        type={"checkbox"}
                        defaultChecked
                        onChange={(event)=>{
                          if(event.target.checked)
                          {
                          booleanFilterValues[type] = "NULL";
                          }
                          else
                          {
                          booleanFilterValues[type] = "0";
                          }
                          console.log(booleanFilterValues[type])
                        }}
                      />
                      )
                    })
                  }
                  </Form>
                )
              })
            }
            </div>
        <Button style={{
          alignSelf: 'center'
        }} as="a" variant="primary" onClick={()=>{
          console.log(mapState)
          searchHousing(resultsDispatch)

                }} >
                    Search Homes
                </Button>
                <Button as="a" variant="primary" onClick={()=>{
                  window.scrollTo({
                    top: 0,
                    left: window.parent.innerWidth,
                    behavior: 'auto'
                  })
                  groupHousing()
                }} >
                    Visualize Charts
                </Button>
                </div>
    )
}