import * as d3 from 'd3';
import d3Tip from 'd3-tip';
d3.tip = d3Tip;

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
  // var meanGenerator = d3.randomUniform(10);
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
    data.push({grade: grade, value: avg});
  }
  data.columns = ['grade', 'months'];
  data.format = 'm';
  data.y = "↑ Months"

  return data
}

const createGraph = (climbData) => {
  let data = cleanData(climbData);
  console.log('tip', tip);
  let margin = ({top: 30, right: 0, bottom: 30, left: 20})
  let height = 500;
  let width = 600;
  let coloridx = 0
  let colors = ['#fbb4ae', '#b3cde3', '#b3cde3', '#b3cde3', '#ccebc5', '#ccebc5', '#decbe4', '#decbe4', '#f584ef', '#f584ef'];
  let hoverColor = '#EDF5E1'

  let x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  let y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top]);

  let yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, data.format))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(data.y));

  let xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(i => data[i].grade).tickSizeOuter(0))

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong>Months:</strong> <span style='color:red'>" + d.value.toFixed(2) + "</span>";
    })

  const svg = d3.select("body").append("svg")
    .attr("viewBox", [0, 0, width, height]);

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
      // .on('mouseover', tip.show)
      .on('mouseover', function(pair, idx, bars) {
        bars[idx].style.fill = 'black';
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