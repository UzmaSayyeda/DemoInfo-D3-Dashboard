// use d3 library to read the data

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// display sample metadata on demographic panel

function SampleMetaData(sample){
    d3.json(url).then((data) => {

        let metadata = data.metadata;
        
        let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        let result = resultArray[0];

        let panelBody = d3.select("#sample-metadata");

    

        panelBody.html("")

        for (key in result){
            panelBody.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
        }
    });
}



function buildCharts(sample){
    
    // get values from the json
    
    d3.json(url).then((data) => {
        let samples = data.samples;
        let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        let result = resultArray[0];
        let otuIds = result.otu_ids;
        let otuLabels = result.otu_labels;
        let sampleValues = result.sample_values;
        let wfreq = result.wfreq

        // build bar chart

        yticks = otuIds.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();


        let barData = [
            {
                y : yticks,
                x : sampleValues.slice(0,10).reverse(),
                text : otuLabels.slice(0,10).reverse(),
                type : "bar",
                orientation : "h",
            }
        ];

        let barLayout = {
            title: "Top 10 Operational Taxonomic Units",
            margin : {t:30, l: 150}
        };
        Plotly.newPlot("bar", barData, barLayout);

        // bubble chart:

        let bubbleData = [
            {
                x : otuIds,
                y : sampleValues,
                text : otuLabels,
                mode : "markers",
                marker : {
                    size : sampleValues,
                    color : otuIds,
                    colorscale : "Earth"
                }
            }
        ]

        let bubbleLayout = {
            title : "Operational Taxonomic Units per Sample",
            margin : {t:0},
            hovermode : "closest",
            xaxis : {title: "OTU IDs"},
            margin : {t:30}
        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout)
    });


    /**
 * BONUS Solution
 * */
function buildGauge(wfreq) {
    // Enter the washing frequency between 0 and 180
    let level = parseFloat(wfreq) * 20;
  
    // Trig to calc meter point
    let degrees = 180 - level;
    let radius = 0.5;
    let radians = (degrees * Math.PI) / 180;
    let x = radius * Math.cos(radians);
    let y = radius * Math.sin(radians);
  
    // Path: may have to change to create a better triangle
    let mainPath = "M -.0 -0.05 L .0 0.05 L ";
    let pathX = String(x);
    let space = " ";
    let pathY = String(y);
    let pathEnd = " Z";
    let path = mainPath.concat(pathX, space, pathY, pathEnd);
  
    let data = [
      {
        type: "scatter",
        x: [0],
        y: [0],
        marker: { size: 12, color: "850000" },
        showlegend: false,
        name: "Freq",
        text: level,
        hoverinfo: "text+name"
      },
      {
        values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
        rotation: 90,
        text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
        textinfo: "text",
        textposition: "inside",
        marker: {
          colors: [
            "rgba(0, 105, 11, .5)",
            "rgba(10, 120, 22, .5)",
            "rgba(14, 127, 0, .5)",
            "rgba(110, 154, 22, .5)",
            "rgba(170, 202, 42, .5)",
            "rgba(202, 209, 95, .5)",
            "rgba(210, 206, 145, .5)",
            "rgba(232, 226, 202, .5)",
            "rgba(240, 230, 215, .5)",
            "rgba(255, 255, 255, 0)"
          ]
        },
        labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
        hoverinfo: "label",
        hole: 0.5,
        type: "pie",
        showlegend: false
      }
    ];
  
    let layout = {
      shapes: [
        {
          type: "path",
          path: path,
          fillcolor: "850000",
          line: {
            color: "850000"
          }
        }
      ],
      title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
      height: 500,
      width: 500,
      xaxis: {
        zeroline: false,
        showticklabels: false,
        showgrid: false,
        range: [-1, 1]
      },
      yaxis: {
        zeroline: false,
        showticklabels: false,
        showgrid: false,
        range: [-1, 1]
      }
    };
  
    let GAUGE = document.getElementById("gauge");
    Plotly.newPlot(GAUGE, data, layout);
  }
  
}

function init(){

    // initialize drop down with a default sample value

    let selector = d3.select("#selDataset");
    d3.json(url).then((data) => {
        let sampleNames = data.names;

        // loop through names and add to selector

        for (let i = 0; i < sampleNames.length; i++){

            selector
                .append("option")
                .text(sampleNames[i])
                .property("value", sampleNames[i]);
        };
        let firstSample = sampleNames[0];
        buildCharts(firstSample);
        SampleMetaData(firstSample);
        buildGauge(firstSample);
    });
}

// get new sample data each time 
function optionChanged(newSample) {
    
    buildCharts(newSample);
    SampleMetaData(newSample);
    buildGauge(newSample);
  }

// initialize dashboard
init();