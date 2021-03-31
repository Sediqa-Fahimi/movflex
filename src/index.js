
import { csv, select, scaleLinear, max, scaleBand, axisBottom, axisLeft, event } from 'd3';

document.addEventListener("DOMContentLoaded",()=>{

    const margin = {top: 30, right: 10, bottom: 70, left: 120};
    const width = 740 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = select(".chart")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

    const x = scaleBand()
        .range([ 0, width ])
        .padding(0.2);
    const xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "X-axis")

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
                .call(axisBottom(x))
                .append("text")
                .attr("y", height - 250)
                .attr("x", width - 100)
                .attr("text-anchor", "end")
                .attr("font-size","10px")
                .attr("fill", "black")
                .attr("letter-spacing", "0.2em")
                .text("Year");
                

            y.domain([0, max(data, d => +d[selectedVar] )]);
            yAxis.call(axisLeft(y))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "-5.1em")
                .attr("text-anchor", "end")
                .attr("font-size","10px")
                .attr("fill", "black")
                .attr("letter-spacing", "0.2em")
                .text("Total Number");
                



            const u = svg.selectAll("rect")
                .data(data)
            
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
                .duration(800)
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


