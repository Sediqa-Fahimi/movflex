
import { csv, select, scaleLinear, max, scaleBand, axisBottom, axisLeft, scaleOrdinal} from 'd3';

document.addEventListener("DOMContentLoaded",()=>{

    const margin = {top: 30, right: 30, bottom: 70, left: 60};
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = select("#my_dataviz")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

    // Initialize the X axis
    const x = scaleBand()
        .range([ 0, width ])
        .padding(0.2);
    const xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")

    // Initialize the Y axis
    const y = scaleLinear()
        .range([ height, 0]);
    const yAxis = svg.append("g")
        .attr("class", "myYaxis")



    function update(selectedVar) {

        csv("./data/tvs_movies.csv").then((data) => {
            data.forEach(d => {
                d.year = parseFloat(d.year);
                d.tv_shows = parseFloat(d.tv_shows);
                d.movies = parseFloat(d.movies);
            });

            x.domain(data.map(function(d) { return d.year; }))
            xAxis.transition().duration(1000).call(axisBottom(x))

            // Add Y axis
            y.domain([0, max(data, function(d) { return +d[selectedVar] }) ]);
            yAxis.transition().duration(1000).call(axisLeft(y));

            // variable u: map data to existing bars
            const u = svg.selectAll("rect")
                .data(data)

            // update bars
            u
                .enter()
                .append("rect")
                .merge(u)
                .transition()
                .duration(1000)
                    .attr("x", function(d) { return x(d.year); })
                    .attr("y", function(d) { return y(d[selectedVar]); })
                    .attr("width", x.bandwidth())
                    .attr("height", function(d) { return height - y(d[selectedVar]); })
                    .attr("fill", "#69b3a2")
    

        }).catch(err => {
            if(err) throw err;
        })

    }

    update('tv_shows');
    // update('movies');
});


