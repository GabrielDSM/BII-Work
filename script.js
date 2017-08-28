var V241IGroup;
var volumeChart;
var compChart;
window.dataRef;

d3.json('newDatatest2.json', function (data) {
    // var lineChart2 = dc.lineChart("#dc-line-chart-2"); //dc = d3 & crossfilter interface to make it easier to graph
    volumeChart = dc.barChart('#monthly-volume-chart');
    var dataCrossfilter = crossfilter(data);

    var dateFormat = d3.time.format('%Y%m%d');
    var numberFormat = d3.format('.2f');

    data.forEach(function (d) {
        d.dd = dateFormat.parse(d.date);
        d.month = d3.time.month.ceil(d.dd); // pre-calculate month for better performance
    });

    console.log(dataCrossfilter.size());
    var byDate = dataCrossfilter.dimension(function(d) {return d.date});
    console.log(byDate);
    console.log();

    var byMonth = dataCrossfilter.dimension(function(d) {return d.month});
    var grouped = byMonth.group();
    console.log(grouped.all());

    console.log();

    // three reduce functions to use for plotting
    function retrieveAdd(attr) {
        return function(p, v) {
            freq = +v[attr].freq;
            return freq;
        };
    }
    function retrieveRemove(attr) {
        return function(p, v) {
            freq = 0;
            return freq;
        };
    }
    function retrieveInit() {
        return freq = 0;
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
    var mutationArray = new Array();
    for (var i = 0; i < d3.keys(data[0]).length; i++) {
        if (i != 0 && i != 22  && i != 23 && i != 24) {
            mutationArray.push(String(d3.keys(data[0])[i]));
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
    V241IGroup = byMonth.group().reduce(retrieveAdd('V241I'), retrieveRemove('V241I'), retrieveInit);

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

    console.log(V453AGroup.all()); // dataCrossfilter log

    // Current position : Managed to declare the groups (non-hardcoded) ie based on the given file and not dependent on being off the testing data
    // cuurent predicament : need to figure out how im going to declare the dc.line-chart inside the compose.
    compChart = dc.compositeChart('#dc-composite');

    // attemp at generalizing ther line chart declarations for the composite chart
    // does not currently contain line labels and nor should it contain differing line colors
    var lineChartArray = new Array();
    /*for (var plotGroup in groupArray) {
        var tempLineChart = dc.lineChart(compChart);
        tempLineChart.group(plotGroup)
        lineChartArray.push(tempLineChart);
    }*/
    for (var i = 0; i < mutationArray.length; i++) {
        if (i != 0) {
            lineChartArray.push(dc.lineChart(compChart).group(groupArray[i], mutationArray[i]));
        }
    }

    console.log(lineChartArray);


    compChart.compose([
        dc.lineChart(compChart)
            .colors('magenta')
            .group(V81AGroup, 'V81A'),
        dc.lineChart(compChart)
            .group(G77RGroup, 'G77R'),
        dc.lineChart(compChart)
            .colors('red')
            .group(I188TGroup, 'I188T'),
        dc.lineChart(compChart)
            .colors('brown')
            .group(K260RGroup, 'K260R'),
        dc.lineChart(compChart)
            .colors('orange')
            .group(K469NGroup, 'K469N'),
        dc.lineChart(compChart)
            .colors('green')
            .group(L127FGroup, 'L127F'),
        dc.lineChart(compChart)
            .colors('purple')
            .group(V453AGroup, 'V453A'),
        dc.lineChart(compChart)
            .colors('pink')
            .group(I314MGroup, 'I314M'),
        dc.lineChart(compChart)
            .colors('yellow')
            .group(I34VGroup, 'I34V'),
        dc.lineChart(compChart)
            .colors('teal')
            .group(V13IGroup, 'V13I'),
        dc.lineChart(compChart)
            .colors('olive')
            .group(V264IGroup, 'V264I'),
        dc.lineChart(compChart)
            .colors('cyan')
            .group(N270KGroup, 'N270K'),
        dc.lineChart(compChart)
            .colors('crimson')
            .group(I321VGroup, 'I321V'),
        dc.lineChart(compChart)
            .colors('gray')
            .group(N248DGroup, 'N248D'),
        dc.lineChart(compChart)
            .colors('maroon')
            .group(N44SGroup, 'N44S'),
        dc.lineChart(compChart)
            .colors('turquoise')
            .group(L40IGroup, 'L40I'),
        dc.lineChart(compChart)
            .colors('tan')
            .group(N200SGroup, 'N200S'),
        dc.lineChart(compChart)
            .colors('violet')
            .group(K432EGroup, 'K432E'),
        dc.lineChart(compChart)
            .colors('indigo')
            .group(N386KGroup, 'N386K'),
        dc.lineChart(compChart)
            .colors('limegreen')
            .group(N369KGroup, 'N369K'),
        dc.lineChart(compChart)
            .colors('royalblue')
            .group(V241IGroup, 'V241I')
    ])
        .dimension(byMonth)
        .width(990)
        .height(450)
        .transitionDuration(1000)
        .mouseZoomable(true)
        .x(d3.time.scale().domain([new Date(2015, 12, 1), new Date(2017, 03, 31)]))
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
            if (i != 0 && i != 22  && i != 23 && i != 24) {
                // console.log(d[d3.keys(d)[i]]);
                numOfDiffMuts += d[d3.keys(d)[i]].freq;
            }
        }
        return Math.ceil(numOfDiffMuts)/100;
    });

    volumeChart.width(966)
        .height(100)
        .margins({top: 20, right: 25, bottom: 20, left: 30})
        .dimension(byMonth)
        .group(volumeByMonthGroup)
        .centerBar(false)
        .gap(-2.5) // bar spacing - 50 as currently ; 1 some touching some not ; -2 almost no gaps, -3 no gaps
        .x(d3.time.scale().domain([new Date(2015, 12, 1), new Date(2017, 03, 31)]))
        .round(d3.time.month.round)
        .alwaysUseRounding(true)
        .xUnits(d3.time.months)
        .elasticX(false);

    volumeChart.y(d3.scale.linear().domain([13,16]));
    volumeChart.yAxis().ticks(0);

    /*var counter = 0;
    var valueTable = dc.dataTable('.dc-data-table');
    valueTable.dimension(byMonth)
        .group(function (d){
            var format = d3.format('02d');
            return d.dd.getFullYear() + '/' + d.dd.getMonth();
        })
        .size(17)
        .columns([

            {
                label: 'V81A occurences',
                format: function(d) {
                    return +d.V81A.numOcc;
                }
            },
            {
                label: 'Month Total',
                format: function(d) {
                    return +d.V81A.totOcc;
                }
            },
            {
                label: 'Frequency',
                format: function(d) {
                    return +d.V81A.freq;
                }
            }
        ]
            [{  // trial 1
                label: 'Mutations',
                format: function() {
                    return mutationArray
                }
            }]
            [{ // trial 2
                label: 'Mutations',
                format: function(d) {
                    var tempArray = new Array();
                    var toReturn = d3.keys(d)[counter%23];
                    counter++;
                    for (var i = 1; i < d3.keys(d).length - 2; i++) {
                        if (d[d3.keys(d)[i]] != 0) {
                            tempArray.push(d3.keys(d)[i]);
                        }
                    }
                    return tempArray;
                }
            }]
        )
        .order(d3.ascending)
        .on('renderlet', function(table) {
            table.selectAll('.dc-table-group').classed('info', true)
        });
    console.log(valueTable);*/

    // Generating static html table
    var valueTable = "<table><tr><th>Mutations</th><th>Occurrences</th><th>Total</th><th>Frequency (%)</th></tr>"; // header
    var tableBody = "";
    var periodHeader = "";

    var occurencesArray = new Array();
    var totalArray = new Array();
    var len;
    data.forEach(function (d, index) {
        if (index == 0) {
            periodHeader += "<tr class=\"dc-table-group info\"><td class=\"dc-table-label\" colspan=\"4\">Period: "
                            + d3.time.format('%Y/%m')(d.dd) + " - ";
        }
        if (index == data.length - 1) {
            periodHeader += d3.time.format('%Y/%m')(d.dd) + "</td></tr>";
        }

        len = d3.keys(d).length;

        for (var i = 0; i < d3.keys(d).length; i++) {
            if (i != 0 && i != 22  && i != 23 && i != 24) {
                if (index == 0) {
                    occurencesArray.push(d[d3.keys(d)[i]].numOcc);
                    totalArray.push(d[d3.keys(d)[i]].totOcc);
                } else {
                    occurencesArray[i - 1] += d[d3.keys(d)[i]].numOcc;
                    totalArray[i - 1] += d[d3.keys(d)[i]].totOcc;
                }
            }
        }
    });
    for (var i = 0; i < len; i++) {
        if (i != 0 && i != 22  && i != 23 && i != 24) {
            var freq = occurencesArray[i - 1] / totalArray[i - 1];
            tableBody += "<tr><td>" + d3.keys(data[0])[i] + "</td><td>" + occurencesArray[i - 1] + "</td><td>"
                            + totalArray[i - 1] + "</td><td>" + freq.toFixed(3) + "</td></tr>";
        }
    }
    valueTable += periodHeader;
    valueTable += tableBody;
    valueTable += "</table>";
    document.getElementById('table').innerHTML = valueTable;


    window.dataRef = compChart.children()[0].data();

    function redrawTable(dataRef) {
        var valueTable = "<table><tr><th>Mutations</th><th>Occurrences</th><th>Total</th><th>Frequency (%)</th></tr>"; // header
        var tableBody = "";
        var periodHeader = "";
        var periodLen = window.dataRef[0].values.length;

        var len;

        var occurencesArray = new Array();
        var totalArray = new Array();


        data.forEach(function (d, index) {
            for(var i = 0; i < periodLen; i++) {
                if (d.dd.getTime() == window.dataRef[0].values[i].x.getTime()) {
                    if (i == 0) {
                        periodHeader += "<tr class=\"dc-table-group info\"><td class=\"dc-table-label\" colspan=\"4\">Period: "
                                        + d3.time.format('%Y/%m')(d.dd) + " - ";
                    }
                    if (i == periodLen - 1) {
                        periodHeader += d3.time.format('%Y/%m')(d.dd) + "</td></tr>";
                    }

                    len = d3.keys(d).length;

                    for (var j = 0; j < d3.keys(d).length; j++) {
                        if (j != 0 && j != 22  && j != 23 && j != 24) {
                            if (i == 0) {
                                occurencesArray.push(d[d3.keys(d)[j]].numOcc);
                                totalArray.push(d[d3.keys(d)[j]].totOcc);
                            } else {
                                occurencesArray[j - 1] += d[d3.keys(d)[j]].numOcc;
                                totalArray[j - 1] += d[d3.keys(d)[j]].totOcc;
                            }
                        }
                    }
                }
            }
        });
        for (var i = 0; i < len; i++) {
            if (i != 0 && i != 22  && i != 23 && i != 24) {
                var freq = occurencesArray[i - 1] / totalArray[i - 1];
                tableBody += "<tr><td>" + d3.keys(data[0])[i] + "</td><td>" + occurencesArray[i - 1] + "</td><td>"
                                + totalArray[i - 1] + "</td><td>" + freq.toFixed(3) + "</td></tr>";
            }
        }
        valueTable += periodHeader;
        valueTable += tableBody;
        valueTable += "</table>";
        document.getElementById('table').innerHTML = valueTable;
    }

    const BARCHART = document.getElementById("monthly-volume-chart");

    function d3MouseDown(e) {
        var o = d3.event;
        d3.event = e;
        argumentz[0] = this.__data__;
        try {
            listener.apply(this, argumentz);
        } finally {
            d3.event = o;
        }
    }

    function d3TouchStart(e) {
        var o = d3.event;
        d3.event = e;
        argumentz[0] = this.__data__;
        try {
            listener.apply(this, argumentz);
        } finally {
            d3.event = o;
        }
    }

    function multipleMouseDown() {
        d3MouseDown;
        redrawTable;
    }

    function multipleTouchStart() {
        d3TouchStart;
        redrawTable;
    }


    BARCHART.onclick = redrawTable;
    BARCHART.onmousedown = multipleMouseDown;
    BARCHART.ontouchstart = multipleTouchStart;
    BARCHART.onchange = redrawTable;
    BARCHART.onmouseup = redrawTable;
    BARCHART.ontouchend = redrawTable;
    BARCHART.onmouseenter = redrawTable;
    BARCHART.onmouseleave = redrawTable;

    dc.renderAll();
});


// // // Testing csv formatted data
// d3.csv('MutFreqs_E10CalRef.csv', function (data) {
//     var secondCrossfilter = crossfilter(data);
//     var dateFormat = d3.time.format('%m/%d/%Y');
//     var numberFormat = d3.format('.2f');
//
//     data.forEach(function (d) {
//         d.dd = dateFormat.parse(d.date);
//         d.month = d3.time.month(d.dd); // pre-calculate month for better performance
//         for (var i=0; i < d3.keys(d).length; i++) {
//             //d[d3.keys(d)[i]]) = +d[d3.keys(d)[i]]); // coerce frequency values to numbers
//         }
//     });
//
//     var byDate = secondCrossfilter.dimension(function(d) {return d.dd}); // crossfilter dimension based on date
//
//     console.log("below is output related to mutations associated to gisaid isolate EPI_ISL_207653, i.e. A/California/07/2009 with passage E10");
//     console.log("csv crossfilter: ", secondCrossfilter);
//     console.log("size: ", secondCrossfilter.size());
//     console.log("date dimension: ", byDate);
//     console.log("click on the 'Object' in the inspector below to see the values inside the first position of the date dimension")
//     console.log("first value of dimension: ", byDate.top(1));
//
//
//     dc.renderAll();
// });


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
