
import { csv, select } from 'd3';

document.addEventListener("DOMContentLoaded",()=>{

    const svg = select('svg');

    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const render = data =>{
        svg.selectAll('rect').data(data)
            .enter().append('rect')
                .attr('width',300)
                .attr('height',300)

    };

    csv("./data/tvs_movies.csv").then((data) => {
        data.forEach(d => {
            d.year = parseFloat(d.year);
            d.tv_shows = parseFloat(d.tv_shows);
            d.movies = parseFloat(d.movies);
        });
        render(data);
    });
});

