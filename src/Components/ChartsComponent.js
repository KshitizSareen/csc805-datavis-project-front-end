/* eslint-disable react-hooks/exhaustive-deps */
import * as d3 from 'd3';
import React,{useEffect, useState} from 'react';
import { Chart } from "react-google-charts";

export default function ChartsComponent({chartsByListing,chartsByLocation,chartsByCategory}){
    
    const [xAxisValue,setXAxisValue] = useState();
    const [yAxisValue,setYAxisValue] = useState();
    var margin = {top: 50, right: 100, bottom: 50, left: 100};
    const width = window.parent.outerWidth/2.5;
    const height = window.parent.outerHeight/4.75;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight =  height + margin.top + margin.bottom;

    const horizontalBarChartRef = React.useRef(null);
    const horizontalbarChartXScale = d3.scaleBand().range([0,width]).padding(0.1);
    const horizontalbarChartYScale = d3.scaleLinear().range([height,0]);

    var horizontalbarChartXAxis = d3.axisBottom(horizontalbarChartXScale)
    var horizontalbarChartYAxis = d3.axisLeft(horizontalbarChartYScale)

    const verticalBarChartRef = React.useRef(null);
    const verticalBarChartXScale= d3.scaleLinear().range([0,width])
    const verticalBarChartYScale = d3.scaleBand().range([height,0]).padding(0.1);

    var verticalbarChartXAxis = d3.axisBottom(verticalBarChartXScale)
    var verticalbarChartYAxis = d3.axisLeft(verticalBarChartYScale)

    const lineChartRef = React.useRef(null)

    var lineXScale = d3.scaleLinear().range([0,width]);
    var lineYScale = d3.scaleLinear().range([height,0]);
  
    var lineXAxis = d3.axisBottom(lineXScale);
    var lineYAxis = d3.axisLeft(lineYScale);

    const  circleRadius = 3;


    useEffect(()=>{
        initializeHorizontalBarChart();
        initializeVerticalBarChart();
        initializeLineChart();
    },[height, margin.left, margin.top])

    const [pieChartData,setPieChartData] = useState([['Location','Count']])

    function initializeHorizontalBarChart()
    {
        
        var horizontalBarChartElem = d3.select(horizontalBarChartRef.current);
        horizontalBarChartElem.selectAll('*').remove();
        var horizontalBarChartSvg = horizontalBarChartElem.append("g").attr("transform",`translate(${margin.left},${margin.top})`);
        horizontalBarChartSvg.append("g").attr("class","xAxis")
        .attr("transform","translate(0,"+height+")")
        
        horizontalBarChartSvg.append("text")
        .attr("y", height+40)
        .attr("x", width/2)
        .attr("text-anchor", "middle")
        .text("Location");

        horizontalBarChartSvg.append("text")
        .attr("transform","rotate(-90)")
        .attr("x", -(height/2))
        .attr("y", -60)
        .attr("text-anchor", "middle")
        .text("Price");
    
        horizontalBarChartSvg.append("g")
        .attr("class","yAxis")

        horizontalBarChartElem.append("text")
   .attr("x", width/2)
   .attr("y", 35)
   .text("Location VS Price")

    }

    function initializeVerticalBarChart()
    {
        var verticalBarChartElem = d3.select(verticalBarChartRef.current);
        verticalBarChartElem.selectAll('*').remove();
        var verticalBarChartSvg = verticalBarChartElem.append("g").attr("transform",`translate(${margin.left},${margin.top})`);
        verticalBarChartSvg.append("g").attr("class","xAxis")
        .attr("transform","translate(0,"+height+")");
    
        verticalBarChartSvg.append("g")
        .attr("class","yAxis")

        verticalBarChartElem.append("text")
        .attr("x", width/2)
        .attr("y", 35)
        .text("Price VS Category")

        verticalBarChartSvg.append("text")
        .attr("y", height+40)
        .attr("x", width/2)
        .attr("text-anchor", "middle")
        .text("Price");

        verticalBarChartSvg.append("text")
        .attr("transform","rotate(-90)")
        .attr("x", -(height/2))
        .attr("y", -80)
        .attr("text-anchor", "middle")
        .text("Category");
    }

    function initializeLineChart()
    {
        var lineChartElem = d3.select(lineChartRef.current);
        lineChartElem.selectAll('*').remove();
        var lineSvg = lineChartElem.append("g").attr("transform",`translate(${margin.left},${margin.top})`);
        lineSvg.append("g").attr("class","xAxis").attr("transform","translate(0,"+height+")");
        lineSvg.append("g").attr("class","yAxis");
    
        lineSvg.append('g').attr('class','lines');

        lineChartElem.append("text")
        .attr("x", width/2)
        .attr("y", 35)
        .text("Listing Data")

        lineSvg.append("text")
        .attr("y", height+40)
        .attr("x", width/2)
        .attr("text-anchor", "middle")
        .text("Listing ID");

        lineSvg.append("text")
        .attr("transform","rotate(-90)")
        .attr("x", -(height/2))
        .attr("y", -60)
        .attr("text-anchor", "middle")
        .text("Value");

        /*
                    <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '20%',
          }}>
            <div style={{
              width: 200,
              height: 2,
              backgroundColor: '#4daf4a',
              alignSelf: 'center',
              marginBottom: '5%'
            }}/>
            <p>Max Price</p>
            </div>
            */
    }

    useEffect(()=>{

        setHorizontalBarChartData();
        resetPieChartData();
    },[chartsByLocation])

    useEffect(()=>{
        setVerticalBarChartData();
    },[chartsByCategory])

    useEffect(()=>{
        setLineChart();
    },[chartsByListing])


    function setHorizontalBarChartData(){
        var t = d3.transition()
        .duration(750)
        let xDomain=[]
        let yMax=0;
        let xDomainSet=new Set()

        let data = [];
        for(let i=0;i<chartsByLocation.length;i++)
        {
            let chartElem=chartsByLocation[i];
            let xValue = chartElem.Category;
            let splitXValue = xValue.split(" ");
            let newXValue=[];
            for(let j=0;j<splitXValue.length;j++)
            {
                let value = splitXValue[j];
                if(value!=="")
                {
                    newXValue.push(value[0].toUpperCase()+value.slice(1,value.length));
                }
            }
            let newXValueString = newXValue.join(' ');
            if(!xDomainSet.has(newXValueString))
            {
                xDomainSet.add(newXValueString)
                xDomain.push(newXValueString)
            }
            yMax = Math.max(yMax,chartElem.MinPrice,chartElem.MaxPrice,chartElem.AvgPrice)
            data.push({
                value: chartElem.MinPrice,
                category: newXValueString,
                key: 'MinPrice'
            })
            data.push({
                value: chartElem.AvgPrice,
                category: newXValueString,
                key: 'AvgPrice'
            })
            data.push({
                value: chartElem.MaxPrice,
                category: newXValueString,
                key: 'MaxPrice'
            })
        }
        horizontalbarChartXScale.domain(xDomain)
        horizontalbarChartYScale.domain([0,yMax])
        var svgEl = d3.select(horizontalBarChartRef.current);

        var svg = svgEl.select("g");
        svg.selectAll('.xAxis').transition(t).call(horizontalbarChartXAxis);
        svg.selectAll('.yAxis').transition(t).call(horizontalbarChartYAxis);

        var subgroups = ['MinPrice','AvgPrice','MaxPrice']
        
        const xzScale = d3.scaleBand().range([0,horizontalbarChartXScale.bandwidth()]).padding(0.05);
        xzScale.domain(subgroups)
        const zScale = d3.scaleOrdinal(subgroups, ['#e41a1c','#377eb8','#4daf4a']);


        const categoryElems =  svg.selectAll("rect")
        .data(data)

        categoryElems
        .enter()
        .append("rect").on('mouseover',(e,d)=>{
            setXAxisValue(d.category);
            setYAxisValue('$'+d.value);
          }).on('mouseout',()=>{
            setXAxisValue();
            setYAxisValue()
          })
        .merge(categoryElems)
        .transition(t)
          .attr("x", function(d) { if(d.key==="MinPrice") 
          {
            return horizontalbarChartXScale(d.category)
        }
    else if(d.key==="AvgPrice") 
{
    return horizontalbarChartXScale(d.category) + horizontalbarChartXScale.bandwidth()/3
}
else{
    return horizontalbarChartXScale(d.category) + (2*horizontalbarChartXScale.bandwidth())/3
}})
          .attr("y", function(d) { return horizontalbarChartYScale(d.value); })
          .attr("width", horizontalbarChartXScale.bandwidth() * 0.33 )
          .attr("height", function(d) { return height - horizontalbarChartYScale(d.value); })
          .attr("fill", function(d) { return zScale(d.key) });

        categoryElems.exit().remove();



    }

    function setVerticalBarChartData(){
        var t = d3.transition()
        .duration(750)
        let yDomain=[]
        let xMax=0;
        let yDomainSet=new Set()

        let data = [];
        for(let i=0;i<chartsByCategory.length;i++)
        {
            let chartElem=chartsByCategory[i];
            let yValue = chartElem.Category;
            let splitYValue = yValue.split(" ");
            let newYValue=[];
            for(let j=0;j<splitYValue.length;j++)
            {
                let value = splitYValue[j];
                if(value!=="")
                {
                    newYValue.push(value[0].toUpperCase()+value.slice(1,value.length));
                }
            }
            let newYValueString = newYValue.join(' ');
            if(!yDomainSet.has(newYValueString))
            {
                yDomainSet.add(newYValueString)
                yDomain.push(newYValueString)
            }
            xMax = Math.max(xMax,chartElem.MinPrice,chartElem.MaxPrice,chartElem.AvgPrice)
            data.push({
                value: chartElem.MaxPrice,
                category: newYValueString,
                key: 'MaxPrice'
            })
            data.push({
                value: chartElem.AvgPrice,
                category: newYValueString,
                key: 'AvgPrice'
            })
            data.push({
                value: chartElem.MinPrice,
                category: newYValueString,
                key: 'MinPrice'
            })
        }
        verticalBarChartXScale.domain([0,xMax])
        verticalBarChartYScale.domain(yDomain)
        var svgEl = d3.select(verticalBarChartRef.current);

        var svg = svgEl.select("g");
        svg.selectAll('.xAxis').transition(t).call(verticalbarChartXAxis);
        svg.selectAll('.yAxis').transition(t).call(verticalbarChartYAxis);

        var subgroups = ['MinPrice','AvgPrice','MaxPrice']
        
        const zScale = d3.scaleOrdinal(subgroups, ['#e41a1c','#377eb8','#4daf4a']);


        const categoryElems =  svg.selectAll("rect")
        .data(data)

        categoryElems
        .enter()
        .append("rect").on('mouseover',(e,d)=>{
            setXAxisValue('$'+d.value);
            setYAxisValue(d.category);
          }).on('mouseout',()=>{
            setXAxisValue();
            setYAxisValue()
          })
        .merge(categoryElems)
        .transition(t)
          .attr("x",0)
          .attr("y", function(d) { return verticalBarChartYScale(d.category)})
          .attr("width", d=> verticalBarChartXScale(d.value))
          .attr("height", verticalBarChartYScale.bandwidth())
          .attr("fill", function(d) { return zScale(d.key) })

        categoryElems.exit().remove();

    }

    function setLineChart(){

        console.log(chartsByListing)
        var t = d3.transition()
        .duration(750)

        var lineChartElem = d3.select(lineChartRef.current);
        var lineSvg = lineChartElem.select("g");

        let minY = Infinity
        let maxY = 0
        let minX = Infinity
        let maxX = 0
        let data = [];
        let priceData = [];
        let valueData= [];
        for(let i=0;i<chartsByListing.length;i++)
        {
            const categoryElem = chartsByListing[i];
            if(categoryElem.Odometer!=null)
            {
                maxY=Math.max(maxY,categoryElem.Price,categoryElem.Odometer)
                minY=Math.min(minY,categoryElem.Price,categoryElem.Odometer)
                valueData.push({
                    'value': categoryElem.Odometer,
                    'index': categoryElem.Index,
                    'Label': 'Miles'
                })
            }
            else{
                maxY=Math.max(maxY,categoryElem.Price,categoryElem.SqFeet)
                minY=Math.min(minY,categoryElem.Price,categoryElem.SqFeet)
                valueData.push({
                    'value': categoryElem.SqFeet,
                    'index': categoryElem.Index,
                    'Label': 'SqFeet'
                })
            }
            minX=Math.min(minX,categoryElem.Index)
            maxX=Math.max(maxX,categoryElem.Index)
            priceData.push({
                'value': categoryElem.Price,
                'index': categoryElem.Index,
                'Label': '$'
            })
        }
        data=[priceData,valueData]
        const circleData = priceData.concat(valueData)
        console.log(data);
        lineXScale.domain([minX, maxX]);
        lineYScale.domain([minY,maxY]);
      
        lineSvg.selectAll('.xAxis').transition(t).call(lineXAxis);
        lineSvg.selectAll('.yAxis').transition(t).call(lineYAxis);

        const color = d3.scaleOrdinal([0,1,2,3,4])
        .range(['#e41a1c','#377eb8'])

        var lines=lineSvg.selectAll(".line")
        .data(data)

        lines.enter().append("path")
        .attr("class","line")
        .merge(lines)
        .transition(t)
        .attr("fill","none")
        .attr("stroke",function(d,index){ return color(index)})
        .attr("stroke-width",1.5)
        .transition(t)
        .attr("d",function(d)
        {
          return d3.line().x(function(d){
            return lineXScale(d['index']);
          })
          .y(function(d){
            return lineYScale(d['value']);
          })(d)
        })

        var circles=lineSvg.selectAll(".circle").data(circleData)

        circles.enter().append("circle").on('mouseover',(e,d)=>{
            setXAxisValue("Listing ID "+d.index);
            if(d.Label==="$")
            {
            setYAxisValue(d.Label+d.value);
            }
            else
            {
            setYAxisValue(d.value+" "+d.Label);
            }
          }).on('mouseout',()=>{
            setXAxisValue();
            setYAxisValue()
          })
        .attr("class","circle")
        .merge(circles)
        .transition(t)
        .attr("fill","red")
        .attr("cx", d => lineXScale(d.index))
        .attr("cy", d => lineYScale(d.value))
        .attr("r", circleRadius)
      
        circles.exit().remove();

        lines.exit().remove();
    }

    function resetPieChartData(){

        let data = [['Location','Count']];
        for(let i=0;i<chartsByLocation.length;i++)
        {
            let chartElem=chartsByLocation[i];
            let xValue = chartElem.Category;
            let splitXValue = xValue.split(" ");
            let newXValue=[];
            for(let j=0;j<splitXValue.length;j++)
            {
                let value = splitXValue[j];
                if(value!=="")
                {
                    newXValue.push(value[0].toUpperCase()+value.slice(1,value.length));
                }
            }
            let newXValueString = newXValue.join(' ');
            data.push([newXValueString,chartElem.Count])
            setPieChartData(data);
        }

    }

      
      const options = {
        title: "Location By Count",
        backgroundColor: 'transparent'
      };

    return(
        <div id="charts" style={{
            width: window.parent.innerWidth,
            height: window.parent.innerHeight,
            backgroundColor: 'whitesmoke',
            display: 'flex',
            flexDirection: 'column',
            left: window.parent.innerWidth,
            top:0,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        }}>
            <div>X-Axis Value: {xAxisValue}</div>
            <div>Y-Axis Value: {yAxisValue}</div>
            <div style={{
                display: 'flex',
                width: window.parent.innerWidth,
                justifyContent: 'space-between'
            }}>
            <svg ref={horizontalBarChartRef} width={svgWidth} height={svgHeight}/>
            <svg ref={verticalBarChartRef} width={svgWidth} height={svgHeight}/>
            </div>
            <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '20%',
          }}>
            <div style={{
              width: 200,
              height: 2,
              backgroundColor: '#e41a1c',
              alignSelf: 'center',
              marginBottom: '5%'
            }}/>
            <p>Min Price</p>
            </div>
            <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '20%',
          }}>
            <div style={{
              width: 200,
              height: 2,
              backgroundColor: '#377eb8',
              alignSelf: 'center',
              marginBottom: '5%'
            }}/>
            <p>Avg Price</p>
            </div>
            <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '20%',
          }}>
            <div style={{
              width: 200,
              height: 2,
              backgroundColor: '#4daf4a',
              alignSelf: 'center',
              marginBottom: '5%'
            }}/>
            <p>Max Price</p>
            </div>
            <div style={{
                display: 'flex',
                width: window.parent.innerWidth,
                justifyContent: 'space-between'
            }}>
            <svg ref={lineChartRef} width={svgWidth} height={svgHeight}/>
            <Chart
      chartType="PieChart"
      data={pieChartData}
      options={options}
      width={svgWidth}
      height={svgHeight}
    />
    </div>
      </div>
    )
}