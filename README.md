
# movflex



<img src="https://github.com/Sediqa-Fahimi/movflex/blob/main/assets/images/moveflexhomepage.png" alt="Home page" />



### [Live demo here](https://sediqa-fahimi.github.io/movflex/)



## Overview

Movflex is a data visualization learning project. Here you can find information about the total number of Netflix's movies and TV Shows and other categories from 2010 until 2020. Select your desired category to get information for that category. The data comes from [Kaggle.com: TV Shows and Movies listed on Netflix.](https://www.kaggle.com/shivamb/netflix-shows)



## Technologies used:

* **JavaScript** for application functionality.
* **HTML**, **CSS**, and **SVG** for page structure and design.
* **D3.js** library to create interactive data visualization.



## Code Snippet:

In order to display the total number of movies on hover effect, added mouseover and mouseout event listeners to the "rect" svg nodes. These event listeners will manipulate the opacity of the "rect" object for styling purposes, then they display or hide a div containing the total number read from the data object.


```javascript
//index.js

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
```



#### To use on local machine, run the following commands first:

>npm install

>npm run dev-server




                

