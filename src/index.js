// import movies from './movies';
import { csv } from 'd3';
//
// const value = movies();
// document.getElementById('test').textContent = value;
// const div = select('div');
// div.append('svg');
document.addEventListener("DOMContentLoaded",()=>{

    csv("./data/data.csv").then((data) => {
        data.forEach(d => {
            d.release_year = parseFloat(d.release_year);
        });
        console.log(data);
    });
});

