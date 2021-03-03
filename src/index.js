
import { csv, select, scaleLinear, max, scaleBand, axisBottom, axisLeft} from 'd3';

document.addEventListener("DOMContentLoaded",()=>{

    const svg = select('svg');
    const margin = 200;
    const width = +svg.attr('width') - margin;
    const height = +svg.attr('height') - margin;

    const xScale = scaleBand()
        .range([0, width])
        .padding(0.4);
    
    const yScale = scaleLinear()
        .range([height, 0]);

    const g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");


    csv("./data/tvs_movies.csv").then((data) => {
        data.forEach(d => {
            d.year = parseFloat(d.year);
            d.tv_shows = parseFloat(d.tv_shows);
            d.movies = parseFloat(d.movies);
        });

        xScale.domain(data.map(d => d.year));
        yScale.domain([0, max(data, d => d.tv_shows)]);
        
        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(axisBottom(xScale));

        g.append("g")
            .call(axisLeft(yScale)
            .ticks(10));

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", d => xScale(d.year))
         .attr("y", d => yScale(d.tv_shows))
         .attr("width", xScale.bandwidth())
         .attr("height", d => height - yScale(d.tv_shows));

    }).catch(err => {
        if(err) throw err;
    })
});


