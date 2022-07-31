let communityCalculation = obj;
let MAX_DATAPOINTS = 100;
let range;
let communityChart;
let chartOptions = {
    chart: { type: 'area', zoomType: 'x' },
    title: { text: 'Chart Title', useHTML: true },
    xAxis: { 
        crosshair: true,
        title: { text: 'Zeit [Stunde]'},
        type: 'datetime',
    },
    yAxis: { title: { text: 'Leistung [kWe.]' }	},
    tooltip: { shared: true },
    credits: { enabled: false },
    plotOptions: { 
        area: { fillOpacity: 0.7 , stacking: 'normal', lineWidth: 1}, 
        spline: {lineWidth: 3}, 
        series: { marker: { enabled: false }}
    },
    responsive: {
        rules: [{
            condition: { maxWidth: 500},
            chartOptions: {
                legend: { align: 'center', verticalAlign: 'bottom', layout: 'horizontal'}, 
                credits: { enabled: false }
            }
        }]
    }
};

let dt = createCommunityDatatableNormalized();
dt.shift();

// theme: Original
let original = {
    // chart: { height: 350},
    title: { text:  'Community Kennzahlen'},
    yAxis: {title: { text: null }},
    series: [         
        { name: "Netzbezug", color: '#cfc9d5', data: dt.map(d => [d[0], roundFloat(d[3], 2)]) },
        { name: "Netzeinspeisung", color: '#855a87', data: dt.map(d => [d[0], roundFloat(d[4], 2)]) },
        { name: "Eigenversorgung", color: '#b8dc45', data: dt.map(d => [d[0], roundFloat(d[1], 2)]) },
        { name: "PV Erzeugung", type: 'spline', color: '#fcf299', data: dt.map(d => [d[0], roundFloat(d[5], 2)]) },
        { name: "Strombedarf", type: 'spline', color: '#00deff', data: dt.map(d => [d[0], roundFloat(d[6], 2)]) },
    ],
    responsive: {
        rules: [{
            condition: { maxWidth: 350},
            chartOptions: {
                legend: { align: 'center', verticalAlign: 'bottom', layout: 'horizontal'}, 
                credits: { enabled: false }
            }
        }]
    }
};
let cOriginal = Highcharts.chart('community-chart', Highcharts.merge(chartOptions, original));


// theme: Summer
let summer = {
    // chart: { renderTo: 'unit-chart' },
    title: { text:  'Unit Kennzahlen'},
    plotOptions: {spline: {lineWidth: 4}},
    series: [         
        {   name: "Netzbezug", 
            color: '#f4ddbb', 
            lineColor: 'rgba(229, 129, 92, .15)',
            fillColor: {
                linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                stops: [
                [0, 'rgba(229, 129, 92, .9)'],
                [1, 'rgba(255,255,255,.5)']
                ]
            },
            data: dt.map(d => [d[0], roundFloat(d[3], 2)]) },
        {   name: "Netzeinspeisung", 
            color: '#f3a284', 
            lineColor: 'rgba(229, 129, 92, .25)',
            fillColor: {
                linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                stops: [
                    [0, 'rgba(252, 196, 145, 1)'],
                    [1, 'rgba(255,255,255,1)']
            ]},
            data: dt.map(d => [d[0], roundFloat(d[4], 2)]) },
        {   name: "Eigenversorgung", 
            color: '#a3edba', 
            marker: { fillColor: '#a3edba'},
            lineColor: 'rgba(67,235,217,.5)',
            fillColor: {
                linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                stops: [
                    [0, 'rgba(67,235,217,.9)'],
                    [1, 'rgba(163, 237, 186, .6)'],
            ]},
            data: dt.map(d => [d[0], roundFloat(d[1], 2)]) },
        { name: "PV Erzeugung", type: 'spline', color: '#fde79b', data: dt.map(d => [d[0], roundFloat(d[5], 2)]) },
        { name: "Strombedarf", type: 'spline', color: '#7dd6ff',  lineWidth: 3,data: dt.map(d => [d[0], roundFloat(d[6], 2)]) },
    ]
};

let cSummer = Highcharts.chart('unit-chart', Highcharts.merge(chartOptions, summer));

// theme: neutralDark
let dark = {
    // chart: { renderTo: 'building-chart' },
    title: { text:  'Building Demand'},
    series: [         
        { name: "Netzbezug", color: '#aca6d4', data: dt.map(d => [d[0], roundFloat(d[3], 2)]) },
        { name: "Netzeinspeisung", color: '#60609c', data: dt.map(d => [d[0], roundFloat(d[4], 2)]) },
        { name: "Eigenversorgung", color: '#a3edba', data: dt.map(d => [d[0], roundFloat(d[1], 2)]) },
        { name: "PV Erzeugung", type: 'spline', color: '#fcf299', data: dt.map(d => [d[0], roundFloat(d[5], 2)]) },
        { name: "Strombedarf", type: 'spline', color: '#a3acff', data: dt.map(d => [d[0], roundFloat(d[6], 2)]) },
    ]
};

let cDark = Highcharts.chart('building-chart', Highcharts.merge(chartOptions, dark));

// theme: haystack
let haystack = {
    // chart: { renderTo: 'building_prod-chart' },
    title: { text: 'Building Production'},
    series: [         
        { name: "Netzbezug", color: '#edecc0', data: dt.map(d => [d[0], roundFloat(d[3], 2)]) },
        { name: "Netzeinspeisung", color: '#e5e39b', data: dt.map(d => [d[0], roundFloat(d[4], 2)]) },
        { name: "Eigenversorgung", color: '#a1d49b', data: dt.map(d => [d[0], roundFloat(d[1], 2)]) },
        { name: "PV Erzeugung", type: 'spline', color: '#ffe792', data: dt.map(d => [d[0], roundFloat(d[5], 2)]) },
        { name: "Strombedarf", type: 'spline', color: '#99aecb', data: dt.map(d => [d[0], roundFloat(d[6], 2)]) },
    ]
};

let cHay = Highcharts.chart('building_prod-chart', Highcharts.merge(chartOptions, haystack));


function createCommunityDatatableNormalized() {
    let dt = [];
    dt.push([
        "Datum",
        "Eigenstrom",
        "EEGStrom",
        "Netzbezug",
        "Netzeinspeisung",
        "PV Produktion",
        "Strombedarf",
    ]);

    let startindex = 0;
    let endIndex = communityCalculation.timeSteps.length / 32;

    let stepLength = endIndex - startindex;
    let increment = 1;

    while (stepLength / increment > MAX_DATAPOINTS) {
        increment++;
    }

    for (let idx = startindex; idx < endIndex; idx = idx + increment) {
        const dTime = new Date(communityCalculation.timeSteps[idx]);

        let data = [];
        const comm = communityCalculation.community;
		// Mi's testing highcharts migration
        data.push(dTime.getTime());
        // ---
        data.push(comm.sum_self_cons1[idx]);
        data.push(comm.sum_self_cons2plus3[idx]);
        data.push(comm.grid_cons[idx]);
        data.push(comm.pv_surplus[idx]);
        data.push(comm.total_prod[idx]);
        data.push(comm.total_power_cons[idx]);
        dt.push(data);

    }

    return dt;
}

function roundFloat(float, digit) {
    return Number(parseFloat(float).toFixed(digit));
}