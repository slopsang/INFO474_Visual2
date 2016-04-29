// main javascript file

$(document).ready(function() {
    d3.csv('data/Global Sport Finances.csv', function(error, allData) {

        var sports = [];
        var everySport = [];
        var uniqueSport = [];
        var events = ['Baseball', 'Basketball', 'Boxing', 'Cricket', 'Football', 'Golf', 'Racing', 'Soccer', 'Tennis', 'Track'];
        // sort the data alphabetically so that color can match with legend later
        allData.sort(function(a, b) { return d3.ascending(a.events, b.events); });
        // allData.sort(function(a, b) { return d3.ascending(a.Sport, b.Sport); });
        console.log(allData);

        // make first dropdown filter
        var dropdown = $('#tool');
        var li = $("<li></li>");
        li.text('All Kinds');
        li.attr('sport', 'All Kinds');
        dropdown.append(li);

        // eliminate duplicate values
        allData.forEach(function(d) {
            var item = d.Sport;
            everySport.push(item);
            $.each(everySport, function(i, el){
                if($.inArray(el, uniqueSport) === -1) uniqueSport.push(el);
            });
        });
        uniqueSport.forEach(function(a, i) {
            sports.push(uniqueSport[i]);
        });
        sports.forEach(function(d) {
            var li = $("<li></li>");
            li.text(d);
            li.attr('sport', d);
            dropdown.append(li);
        })

        // make second dropdown filter
        var totalS = [];
        var dropdown2 = $('#tool2');
        var li2 = $("<li class='li2'></li>")
            li3 = $("<li class='li3'></li>")
            li4 = $("<li class='li4'></li>")
            li5 = $("<li class='li5'></li>");
        li2.text('View All');
        dropdown2.append(li2);
        li3.text('View Salary > 50,000,000');
        dropdown2.append(li3);
        li4.text('View Salary > 25,000,000');
        dropdown2.append(li4);
        li5.text('View Salary > 10,000,000');
        dropdown2.append(li5);

        var xScale;
        var yScale;
        var currentData;
        var colorScale = d3.scale.category10();

        // set margin for actual visual
        var margin = {left: 100, bottom: 100, top: 50, right: 50};
        var color = d3.scale.category10();
        var height = 700 - margin.top - margin.bottom;
        var width = 1000 - margin.right - margin.left;

        var svg = d3.select('#vis')
                    .append('svg')
                    .attr('width', 1000)
                    .attr('height', 700);

        // append a 'g' element in which to place the chart
        var g = svg.append('g')
                    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
                    .attr('height', height)
                    .attr('width', width);

        // append an xaxis label to the svg
        var xAxisLabel = svg.append('g')
                            .attr('transform', 'translate(' + margin.left + ', ' + (margin.top + height) + ')')
                            .attr('class', 'axis');

        // append an yaxis label to the svg
        var yAxisLabel = svg.append('g')
                            .attr('transform', 'translate(' + margin.left + ', '+ margin.top + ')')
                            .attr('class', 'axis');

        // append text to label
        var xAxisText = svg.append('text')
                            .attr('transform', 'translate(' + (margin.left + width/2) + ', ' + (margin.top + height + 40) + ')')
                            .attr('class', 'title');

        // append text to label
        var yAxisText = svg.append("text")
                            .attr('transform', 'translate(' + (margin.left - 90) + ', ' + (margin.top + height/2) + ') rotate(-90)')
                            .attr('class', 'title');
        
        // set x-scale and y-scale
        var setScales = function() {
            var xMin = d3.min(allData, function(d) { return +d.Pay; });
            var xMax = d3.max(allData, function(d) { return +d.Pay; });
            var yMin = d3.min(allData, function(d) { return +d.Endorsements; });
            var yMax = d3.max(allData, function(d) { return +d.Endorsements; });

            xScale = d3.scale.linear().domain([xMin, xMax]).range([0, width]);
            yScale = d3.scale.linear().domain([yMin, yMax]).range([height, 0]);
        };

        // set x-axes and y-axes
        var setAxes = function() {
            var xAxes = d3.svg.axis()
                            .scale(xScale)
                            .orient('bottom');
            var yAxes = d3.svg.axis()
                            .scale(yScale)
                            .orient('left');

            xAxisLabel.transition().duration(1500).call(xAxes);
            yAxisLabel.transition().duration(1500).call(yAxes);

            xAxisText.text("Pay in 2014 (dollar)");
            yAxisText.text("Endorsement (dollar)");
        };

        // filter dataset based on user choice and return appropriate data
        var filterData = function(sport) {
            if (sport == 'Baseball') {
                var viewing = currentData = allData.filter(function(d) {
                    console.log("inside filter function: " + currentData);
                    return d.Sport == sport;
                });
            } else if (sport == 'Basketball') {
                currentData = allData.filter(function(d) {
                    return d.Sport == 'Basketball';
                });
            } else if (sport == 'Boxing') {
                currentData = allData.filter(function(d) {
                    return d.Sport == 'Boxing'
                })
            } else if (sport == 'Cricket') {
                currentData = allData.filter(function(d) {
                    return d.Sport == 'Cricket'
                })
            } else if (sport == 'Football') {
                currentData = allData.filter(function(d) {
                    return d.Sport == 'Football'
                })
            } else if (sport == 'Golf') {
                currentData = allData.filter(function(d) {
                    return d.Sport == 'Golf'
                })
            } else if (sport == 'Racing') {
                currentData = allData.filter(function(d) {
                    return d.Sport == 'Racing'
                })
            } else if (sport == 'Soccer') {
                currentData = allData.filter(function(d) {
                    return d.Sport == 'Soccer'
                })
            } else if (sport == 'Tennis') {
                currentData = allData.filter(function(d) {
                    return d.Sport == 'Tennis'
                })
            } else if (sport == 'Track') {
                currentData = allData.filter(function(d) {
                    return d.Sport == 'Track'
                })
            } else {
                currentData = allData;
            }
        };

        // filter dataset based on total income of Athlete and return appropriate data
        var filterSalary = function(salary) {
            if (salary == 50000000) {
                currentData = allData.filter(function(d) {
                    return d.Total > 50000000;
                })
            } else if (salary == 25000000) {
                currentData = allData.filter(function(d) {
                    return d.Total > 25000000;
                })
            } else if (salary == 10000000) {
                currentData = allData.filter(function(d) {
                    return d.Total > 10000000;
                })
            } else {
                currentData = allData;
            };
        };

        // draw the chart
        var draw = function(data) {
            setScales(data);
            setAxes();

            var circles = g.selectAll('circle')
                            .data(data, function(d) {
                                return d.Athlete;
                            });

            circles.enter().append('circle')
                            .attr('r', 10)
                            .attr('cx', 1000)
                            .attr('cy', 1) 
                            .attr('fill', function(d) { return color(d.events) })
                            .attr('title', function(d) { return d.Athlete })
                            .style('opacity', 0.7);

            circles.exit()
                .transition()
                .duration(1200)
                .remove();

            circles.transition().duration(1500)
                    .attr('r', 10)
                    .attr('cx', function(d) { return xScale(d.Pay) })
                    .attr('cy', function(d) { return yScale(d.Endorsements) })
                    .attr('fill', function(d) { return colorScale(d.Sport) }) // give a transition when loading
                    .attr('title', function(d) { return d.Athlete})
                    .style('opacity', 0.7);

            $('circle').tooltip({
                'container': 'body',
                'placement': 'top'
            });
        };

        // draw all the data before filtering
        draw(allData);

        // declare onclick functions
        $('li').on('click', function() {
            console.log('click!');
            var val = $(this).attr('sport');
            console.log(val);
            filterData(val);
            draw(currentData);
        });
        $('.li2').on('click', function() {
            console.log('view all')
            draw(allData);
        });
        $('.li3').on('click', function() {
            var val = 50000000;
            console.log('li3 ' + val);
            filterSalary(val);
            draw(currentData);
        });
        $('.li4').on('click', function() {
            var val = 25000000;
            console.log('li4 ' + val);
            filterSalary(val);
            draw(currentData);
        });
        $('.li5').on('click', function() {
            var val = 10000000;
            console.log('li5 ' + val);
            filterSalary(val);
            draw(currentData);
        });
    });
});
