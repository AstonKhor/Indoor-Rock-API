// import * as d3 from 'd3';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import { range, max } from 'd3-array';
import d3Tip from 'd3-tip';
import { scaleBand, scaleLinear } from "d3-scale";
// d3.tip = d3Tip;
import data from '../data/graphData.json';

const cleanData = (climbData) => {
  let data = [];
  var gradeMap = {
    // 'v0-': {sum: 0, count: 0},
    'v0': {sum: 0, count: 0},
    'v1': {sum: 0, count: 0},
    'v2': {sum: 0, count: 0},
    'v3': {sum: 0, count: 0},
    'v4': {sum: 0, count: 0},
    'v5': {sum: 0, count: 0},
    'v6': {sum: 0, count: 0},
    'v7': {sum: 0, count: 0},
    'v8': {sum: 0, count: 0},
    'v9': {sum: 0, count: 0},
  };
  for (let i = 0; i < climbData.length; i++) {
    for (let grade in gradeMap) {
      if (climbData[i][grade] && climbData[i][grade] !== NaN && typeof climbData[i][grade] === 'number') {
        gradeMap[grade].sum += climbData[i][grade];
        gradeMap[grade].count++;
      }
    }
  }
  console.log('map', gradeMap);
  
  for (let grade in gradeMap) {
    let avg = gradeMap[grade].sum / gradeMap[grade].count;
    //change from s to months
    avg = avg / (3600 * 24 * 30);
    data.push({grade: grade, value: avg, count: gradeMap[grade].count});
  }

  return data
}

const createGraph = (climbData, graph) => {
  // let data = cleanData(climbData);
  // console.log('data', data);
  climbData = data
  data.columns = ['grade', 'months'];
  data.format = 'm';
  data.y = "↑ Months"

  let margin = ({top: 30, right: 0, bottom: 30, left: 20})
  let height = 500;
  let width = 600;
  let coloridx = 0
  let colors = ['#fbb4ae', '#fbb4ae', '#b3cde3', '#b3cde3', '#ccebc5', '#ccebc5', '#decbe4', '#decbe4', '#eecbec', '#eecbec'];
  let hoverColor = '#05386B';

  let x = scaleBand()
    .domain(range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);
 
  let y = scaleLinear()
    .domain([0, max(data, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top]);

  let yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(axisLeft(y).ticks(null, data.format))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(data.y));

  let xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(axisBottom(x).tickFormat(i => data[i].grade).tickSizeOuter(0))

  var tip = d3Tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return (
        `<div style="font-weight: bold; padding: 12px; background: #e3e3e3; border-radius: 5px;">
          <div style="font-size: 18px; text-align: center">
          ${d.grade.toUpperCase()}
          </div>
          <div>
            <span style='font-weight: bold;'>
              Months:
            </span> 
            <span style='color: #05386B; text-decoration: underline; font-weight: bold;'>
              ${d.value.toFixed(2)}
            </span>
          </div>
          <div>
            ${d.count} Climbs
          </div>
        </div>
        <div style="content: ''; display: block; width: 0; height: 0; position: absolute; border-top: 8px solid #e3e3e3; border-left: 8px solid transparent; border-right: 8px solid transparent; left: 43%; bottom: -8px;">
        </div>`
      );
    });

  const svg = select("#climbGraph").append("svg")
    .attr("viewBox", [0, 0, width, height])

  svg.call(tip);

  svg.append("g")
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("fill", () => { coloridx++; return colors[coloridx - 1]})
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.value))
      .attr("height", d => y(0) - y(d.value))
      .attr("width", x.bandwidth())
      .on('mouseover', function(pair, idx, bars) {
        bars[idx].style.fill = hoverColor;
        tip.show.call(this, pair, idx, bars);
      })
      .on('mouseout', function(pair, idx, bars) {
        bars[idx].style.fill = colors[idx];
        tip.hide.call(this, pair, idx, bars);
      })

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

}

export default createGraph;