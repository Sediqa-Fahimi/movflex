
import { csv, select, scaleLinear, max, scaleBand, axisBottom, axisLeft, event } from 'd3';

document.addEventListener("DOMContentLoaded",()=>{

    const margin = {top: 30, right: 10, bottom: 70, left: 120};
    const width = 740 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = select(".chart")
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
        .attr("class", "X-axis")


    // Initialize the Y axis
    const y = scaleLinear()
        .range([ height, 0]);
    const yAxis = svg.append("g")
        .attr("class", "Y-axis")

    const div = select('body')
        .append('div')
        .attr('class', 'info-hint')
        .style('opacity', 0)

    function update(selectedVar) {

        csv("./data/categories.csv").then((data) => {
            data.forEach(d => {
                d.year = parseFloat(d.year);
                d.tv_shows = parseFloat(d.tv_shows);
                d.movies = parseFloat(d.movies);
            });

            x.domain(data.map(d => d.year));
            xAxis
                .transition()
                .duration(1000)
                .call(axisBottom(x))

            // Add Y axis
            y.domain([0, max(data, d => +d[selectedVar] )]);
            yAxis.transition().duration(1000).call(axisLeft(y));



            // variable u: map data to existing bars
            const u = svg.selectAll("rect")
                .data(data)
            
            // update bars
            u
                .enter()
                .append("rect")
                .merge(u)
                .on('mouseover', function(e,d){
                    select(this).transition().duration('50')
                    .attr('opacity', '.85');

                    div.transition()
                        .duration(50)
                        .style('opacity', 1);
                    console.log(e)
                    div.html(d[selectedVar])
                        .style('left', (e.pageX + 5) + 'px')
                        .style('top', (e.pageY - 15) + 'px')
                })
                .on('mouseout', function(e,d){
                    select(this).transition().duration('50')
                    .attr('opacity', '1');

                    div.transition()
                        .duration(50)
                        .style('opacity', 0);
                })
                .transition()
                .duration(1000)
                    .attr("x", d => x(d.year))
                    .attr("y", d => y(d[selectedVar]))
                    .attr("width", x.bandwidth())
                    .attr("height", d => height - y(d[selectedVar]))
                    .attr("fill", "#DF7172")
    

        }).catch(err => {
            if(err) throw err;
        })

    }
    update('tv_shows');
    select('#tv-shows-btn').on('click',() => update('tv_shows'));
    select('#movies-btn').on('click',() => update('movies'));
    select('#dramas-btn').on('click',() => update('dramas'));
    select('#comedies-btn').on('click',() => update('comedies'));
    select('#action-btn').on('click',() => update('action'));
    select('#kids-tv-btn').on('click',() => update('kids_tv'));
    
});


