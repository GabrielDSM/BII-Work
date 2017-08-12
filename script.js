d3.json('testingdata.json', function (data) {
    // var lineChart2 = dc.lineChart("#dc-line-chart-2"); //dc = d3 & crossfilter interface to make it easier to graph
    var volumeChart = dc.barChart('#monthly-volume-chart');
    var tester = crossfilter(data);

    var dateFormat = d3.time.format('%d/%m/%Y');
    var numberFormat = d3.format('.2f');

    data.forEach(function (d) {
        d.dd = dateFormat.parse(d.date);
        d.month = d3.time.month(d.dd); // pre-calculate month for better performance
    });

    console.log(tester.size());
    var byDate = tester.dimension(function(d) {return d.date});
    console.log(byDate);
    console.log();

    var byMonth = tester.dimension(function(d) {return d.month});
    var grouped = byMonth.group();
    console.log(grouped.all());

    console.log();

    // three reduce functions to use for plotting
    function retrieveAdd(attr) {
        return function(p, v) {
            ++p.count;
            p.freq += +v[attr];
            return p;
        };
    }
    function retrieveRemove(attr) {
        return function(p, v) {
            --p.count;
            p.freq -= +v[attr];
            return p;
        };
    }
    function retrieveInit() {
        return {count: 0, freq: 0};
    }



    /* // three reduce functions for slider chart
    function combineAdd() {
        return function(p, v) {
            console.log(v);
            data.forEach(function (v) {
                    for (var i=0; i < d3.keys(v).length; i++) {
                        if (i != 0 || i != 22 || i != 23) {
                            if (d3.keys(v)[i] != 0) {
                                ++p.numberOfMuts;
                            }
                        }
                    }
                }
            );
        }
    }
    function combineRemove() {
        return function(p, v) {
            numberOfMuts = 0;
        }
    }
    function combineInit() {
        return numberOfMuts = 0;
    } */

    var groupArray = new Array();
    for (var i = 0; i < d3.keys(data[0]).length; i++) {
        if (i != 0 && i != 22  && i != 23) {
            groupArray.push(byMonth.group().reduce(retrieveAdd(d3.keys(data[0])[i]), retrieveRemove(d3.keys(data[0])[i]), retrieveInit));
        }
    }
    console.log(groupArray);

    // All of these groups are now in the array above ^ (verified)
    var V81AGroup = byMonth.group().reduce(retrieveAdd('V81A'), retrieveRemove('V81A'), retrieveInit);
    var G77RGroup = byMonth.group().reduce(retrieveAdd('G77R'), retrieveRemove('G77R'), retrieveInit);
    var I188TGroup = byMonth.group().reduce(retrieveAdd('I188T'), retrieveRemove('I188T'), retrieveInit);
    var K260RGroup = byMonth.group().reduce(retrieveAdd('K260R'), retrieveRemove('K260R'), retrieveInit);
    var K469NGroup = byMonth.group().reduce(retrieveAdd('K469N'), retrieveRemove('K469N'), retrieveInit);
    var L127FGroup = byMonth.group().reduce(retrieveAdd('L127F'), retrieveRemove('L127F'), retrieveInit);
    var V453AGroup = byMonth.group().reduce(retrieveAdd('V453A'), retrieveRemove('V453A'), retrieveInit);
    var I314MGroup = byMonth.group().reduce(retrieveAdd('I314M'), retrieveRemove('I314M'), retrieveInit);
    var I34VGroup = byMonth.group().reduce(retrieveAdd('I34V'), retrieveRemove('I34V'), retrieveInit);
    var V13IGroup = byMonth.group().reduce(retrieveAdd('V13I'), retrieveRemove('V13I'), retrieveInit);
    var V264IGroup = byMonth.group().reduce(retrieveAdd('V264I'), retrieveRemove('V264I'), retrieveInit);
    var N270KGroup = byMonth.group().reduce(retrieveAdd('N270K'), retrieveRemove('N270K'), retrieveInit);
    var I321VGroup = byMonth.group().reduce(retrieveAdd('I321V'), retrieveRemove('I321V'), retrieveInit);
    var N248DGroup = byMonth.group().reduce(retrieveAdd('N248D'), retrieveRemove('N248D'), retrieveInit);
    var N44SGroup = byMonth.group().reduce(retrieveAdd('N44S'), retrieveRemove('N44S'), retrieveInit);
    var L40IGroup = byMonth.group().reduce(retrieveAdd('L40I'), retrieveRemove('L40I'), retrieveInit);
    var N200SGroup = byMonth.group().reduce(retrieveAdd('N200S'), retrieveRemove('N200S'), retrieveInit);
    var K432EGroup = byMonth.group().reduce(retrieveAdd('K432E'), retrieveRemove('K432E'), retrieveInit);
    var N386KGroup = byMonth.group().reduce(retrieveAdd('N386K'), retrieveRemove('N386K'), retrieveInit);
    var N369KGroup = byMonth.group().reduce(retrieveAdd('N369K'), retrieveRemove('N369K'), retrieveInit);
    var V241IGroup = byMonth.group().reduce(retrieveAdd('V241I'), retrieveRemove('V241I'), retrieveInit);

    /* lineChart2
    //     //.renderArea(true)
    //     .width(990)
    //     .height(500)
    //     .transitionDuration(1000)
    //     .margins({top: 30, right: 50, bottom: 25, left: 40})
    //     .dimension(byMonth)
    //     .mouseZoomable(true)
    //     .x(d3.time.scale().domain([new Date(2016, 0, 1), new Date(2017, 03, 31)]))
    //     .round(d3.time.month.round)
    //     .xUnits(d3.time.months)
    //     .elasticY(true)
    //     .legend(dc.legend().x(800).y(10).itemHeight(13).gap(5))
    //     .brushOn(false)
    //     .group(V81AGroup, 'V81A (hopefully)')
    //     .valueAccessor(function (d) {
    //         return d.value.freq;
    //     })
    //     .stack(G77RGroup, 'G77R (hopefully)', function (d) {
    //         return d.value.freq;
    //     })
    //     .stack(I188TGroup, 'I188T (hopefully)', function (d) {
    //         return d.value.freq;
    //     })
    //     .stack(K260RGroup, 'K260R (hopefully)', function (d) {
    //         return d.value.freq;
    //     })
    //     .stack(K469NGroup, 'K469N (hopefully)', function (d) {
    //         return d.value.freq;
    //     })
    //     .stack(L127FGroup, 'L127F (hopefully)', function (d) {
    //         return d.value.freq;
    //     })
    //     .stack(V453AGroup, 'V453A (hopefully)', function (d) {
    //         return d.value.freq;
    //     })
    //     .stack(I314MGroup, 'I314M (hopefully)', function (d) {
    //         return d.value.freq;
    //     })
    //     .stack(I34VGroup, 'I34V (hopefully)', function (d) {
    //         return d.value.freq;
    //     })
    //     .stack(V13IGroup, 'V13I (hopefully)', function (d) {
    //         return d.value.freq;
    //     })
    //
    */

    console.log(V453AGroup.all()); // tester log

    // Current position : Managed to declare the groups (non-hardcoded) ie based on the given file and not dependent on being off the testing data
    // cuurent predicament : need to figure out how im going to declare the dc.line-chart inside the compose.
    var compChart = dc.compositeChart('#dc-composite');

    // attemp at generalizing ther line chart declarations for the composite chart
    // does not currently contain line labels and nor should it contain differing line colors
    var lineChartArray = new Array();
    for (var plotGroup in groupArray) {
        var tempLineChart = dc.lineChart(compChart);
        tempLineChart.group(plotGroup)
            .valueAccessor(function (d) {
                return d.value.freq;
            })
        lineChartArray.push(tempLineChart);
    }

    compChart.compose([
        dc.lineChart(compChart)
            .colors('magenta')
            .group(V81AGroup, 'V81A')
            .valueAccessor(function (d) {
                return d.value.freq;
            }),
        dc.lineChart(compChart)
            .group(G77RGroup, 'G77R')
            .valueAccessor(function (d) {
                return d.value.freq;
            }),
        dc.lineChart(compChart)
            .colors('red')
            .group(I188TGroup, 'I188T')
            .valueAccessor(function (d) {
                return d.value.freq;
            }),
        dc.lineChart(compChart)
            .colors('brown')
            .group(K260RGroup, 'K260R')
            .valueAccessor(function (d) {
                return d.value.freq;
            }),
        dc.lineChart(compChart)
            .colors('orange')
            .group(K469NGroup, 'K469N')
            .valueAccessor(function (d) {
                return d.value.freq;
            }),
        dc.lineChart(compChart)
            .colors('green')
            .group(L127FGroup, 'L127F')
            .valueAccessor(function (d) {
                return d.value.freq;
            }),
        dc.lineChart(compChart)
            .colors('purple')
            .group(V453AGroup, 'V453A')
            .valueAccessor(function (d) {
                return d.value.freq;
            }),
        dc.lineChart(compChart)
            .colors('pink')
            .group(I314MGroup, 'I314M')
            .valueAccessor(function (d) {
                return d.value.freq;
            }),
        dc.lineChart(compChart)
            .colors('yellow')
            .group(I34VGroup, 'I34V')
            .valueAccessor(function (d) {
                return d.value.freq;
            }),
        dc.lineChart(compChart)
            .colors('teal')
            .group(V13IGroup, 'V13I')
            .valueAccessor(function (d) {
                return d.value.freq;
            }),
        dc.lineChart(compChart)
            .colors('olive')
            .group(V264IGroup, 'V264I')
            .valueAccessor(function (d) {
                return d.value.freq;
            }),
        dc.lineChart(compChart)
            .colors('cyan')
            .group(N270KGroup, 'N270K')
            .valueAccessor(function (d) {
                return d.value.freq;
            }),
        dc.lineChart(compChart)
            .colors('crimson')
            .group(I321VGroup, 'I321V')
            .valueAccessor(function (d) {
                return d.value.freq;
            }),
        dc.lineChart(compChart)
            .colors('gray')
            .group(N248DGroup, 'N248D')
            .valueAccessor(function (d) {
                return d.value.freq;
            }),
        dc.lineChart(compChart)
            .colors('maroon')
            .group(N44SGroup, 'N44S')
            .valueAccessor(function (d) {
                return d.value.freq;
            }),
        dc.lineChart(compChart)
            .colors('turquoise')
            .group(L40IGroup, 'L40I')
            .valueAccessor(function (d) {
                return d.value.freq;
            }),
        dc.lineChart(compChart)
            .colors('tan')
            .group(N200SGroup, 'N200S')
            .valueAccessor(function (d) {
                return d.value.freq;
            }),
        dc.lineChart(compChart)
            .colors('violet')
            .group(K432EGroup, 'K432E')
            .valueAccessor(function (d) {
                return d.value.freq;
            }),
        dc.lineChart(compChart)
            .colors('indigo')
            .group(N386KGroup, 'N386K')
            .valueAccessor(function (d) {
                return d.value.freq;
            }),
        dc.lineChart(compChart)
            .colors('limegreen')
            .group(N369KGroup, 'N369K')
            .valueAccessor(function (d) {
                return d.value.freq;
            }),
        dc.lineChart(compChart)
            .colors('royalblue')
            .group(V241IGroup, 'V241I')
            .valueAccessor(function (d) {
                return d.value.freq;
            })
    ])
        .dimension(byMonth)
        .width(990)
        .height(450)
        .transitionDuration(1000)
        .mouseZoomable(true)
        .x(d3.time.scale().domain([new Date(2016, 01, 1), new Date(2017, 03, 31)]))
        .round(d3.time.month.round)
        .xUnits(d3.time.months)
        .elasticY(true)
        .legend(dc.legend().x(835).y(20).itemHeight(13).gap(5).horizontal(1).legendWidth(150).itemWidth(50))
        .brushOn(false)
        .rangeChart(volumeChart);  // links the two charts

    // This is necessary to make the composite chart toggle-able but it means that there is no standard way to
    // filter other graphs as it is defined to be non-trivial so it is not in the standard dc library.
    // This means that it is possible, but will take more time
    compChart.on('pretransition.hideshow', function(chart) {
        chart.selectAll('g.dc-legend .dc-legend-item')
            .on('click.hideshow', function(d, i) {
                var subchart = chart.select('g.sub._' + i);
                var visible = subchart.style('visibility') !== 'hidden';
                subchart.style('visibility', function() {
                    return visible ? 'hidden' : 'visible';
                });
                d3.select(this).style('opacity', visible ? 0.2 : 1);
        });
    });

    // var sliderGroup = byMonth.group().reduce(combineAdd, combineRemove, combineInit);

    var volumeByMonthGroup = byMonth.group().reduceSum(function (d) {
        var numOfDiffMuts = 0; // per month
        for (var i = 0; i < d3.keys(d).length; i++) {
            if (i != 0 && i != 22  && i != 23) {
                // console.log(d[d3.keys(d)[i]]);
                numOfDiffMuts += d[d3.keys(d)[i]];
            }
        }
        return Math.ceil(numOfDiffMuts)/100;
    });

    volumeChart.width(1137)
        .height(100)
        .margins({top: 0, right: 20, bottom: 20, left: 206})
        .dimension(byMonth)
        .group(volumeByMonthGroup)
        .centerBar(false)
        .gap(-2.5) // bar spacing - 50 as currently ; 1 some touching some not ; -2 almost no gaps, -3 no gaps
        .x(d3.time.scale().domain([new Date(2016, 01, 1), new Date(2017, 03, 31)]))
        .round(d3.time.month.round)
        .alwaysUseRounding(true)
        .xUnits(d3.time.months)
        .elasticX(false);

    volumeChart.y(d3.scale.linear().domain([13,16]));
    volumeChart.yAxis().ticks(0);

    dc.renderAll();
});




// // Testing csv formatted data
d3.csv('MutFreqs_E10CalRef.csv', function (data) {
    var secondCrossfilter = crossfilter(data);
    var dateFormat = d3.time.format('%m/%d/%Y');
    var numberFormat = d3.format('.2f');

    data.forEach(function (d) {
        d.dd = dateFormat.parse(d.date);
        d.month = d3.time.month(d.dd); // pre-calculate month for better performance
        for (var i=0; i < d3.keys(d).length; i++) {
            //d[d3.keys(d)[i]]) = +d[d3.keys(d)[i]]); // coerce frequency values to numbers
        }
    });

    var byDate = secondCrossfilter.dimension(function(d) {return d.dd}); // crossfilter dimension based on date

    console.log("below is output related to mutations associated to gisaid isolate EPI_ISL_207653, i.e. A/California/07/2009 with passage E10");
    console.log("csv crossfilter: ", secondCrossfilter);
    console.log("size: ", secondCrossfilter.size());
    console.log("date dimension: ", byDate);
    console.log("click on the 'Object' in the inspector below to see the values inside the first position of the date dimension")
    console.log("first value of dimension: ", byDate.top(1));


    dc.renderAll();
});


//NASDAQ Chart
/*d3.csv('ndx.csv', function (data) {

    var dateFormat = d3.time.format('%m/%d/%Y');
    var numberFormat = d3.format('.2f');

    data.forEach(function (d) {
        d.dd = dateFormat.parse(d.date);
        d.month = d3.time.month(d.dd); // pre-calculate month for better performance
        d.close = +d.close; // coerce to number
        d.open = +d.open;
    });

    var lineChartOne = dc.lineChart("#dc-line-chart");

    var ndx = crossfilter(data);

    var moveMonths = ndx.dimension(function (d) {
        return d.month;
    });

    var monthlyMoveGroup = moveMonths.group().reduceSum(function (d) {
            return Math.abs(d.close - d.open);
    });

    var indexAvgByMonthGroup = moveMonths.group().reduce(
        function (p, v) {
            ++p.days;
            p.total += (v.open + v.close) / 2;
            p.avg = Math.round(p.total / p.days);
            return p;
        },
        function (p, v) {
            --p.days;
            p.total -= (v.open + v.close) / 2;
            p.avg = p.days ? Math.round(p.total / p.days) : 0;
            return p;
        },
        function () {
            return {days: 0, total: 0, avg: 0};
        }
    );
    var volumeByMonthGroup = moveMonths.group().reduceSum(function (d) {
        return d.volume / 500000;
    });

    lineChartOne
        .renderArea(true)
        .width(990)
        .height(200)
        .transitionDuration(1000)
        .margins({top: 30, right: 50, bottom: 25, left: 40})
        .dimension(moveMonths)
        .mouseZoomable(true)
        //.rangeChart(volumeChart)
        .x(d3.time.scale().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)]))
        .round(d3.time.month.round)
        .xUnits(d3.time.months)
        .elasticY(true)
        .renderHorizontalGridLines(true)
        .legend(dc.legend().x(800).y(10).itemHeight(13).gap(5))
        .brushOn(false)
        .group(indexAvgByMonthGroup, 'Monthly Index Average')
        .valueAccessor(function (d) {
            return d.value.avg;
        })
        .stack(monthlyMoveGroup, 'Monthly Index Move', function (d) {
            return d.value;
        })
        title(function (d) {
            var value = d.value.avg ? d.value.avg : d.value;
            if (isNaN(value)) {
                value = 0;
            }
            return dateFormat(d.key) + '\n' + numberFormat(value);
        });
    dc.renderAll();
});
*/
