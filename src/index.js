
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

    csv("./data/data.csv").then((data) => {
        data.forEach(d => {
            d.release_year = parseFloat(d.release_year);
        });
        render(data);
    });
});

