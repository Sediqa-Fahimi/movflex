import movies from './movies';
import { select } from 'd3';

const value = movies();
document.getElementById('test').textContent = value;

const div = select('div');

const svg = div.append('svg')
                .attr('width',500)
                .attr('height',500);

const cir = svg.append('circle')
                .attr('r',50)
                .attr('cx',500/2)
                .attr('cy',500/2)

