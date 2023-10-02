// use d3 library to read the data

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// display sample metadata

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
    d3.json(url).then((data) => {
        let samples = data.samples;
        let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        let result = resultArray[0];
        let otuIds = result.otu_ids;
        let otuLabels = result.otu_labels;
        let sampleValues = result.sample_values;

        // build bar chart

        // yticks = otuIds.slice(0,10).map(otuID => {`OTU ${otuID}`}).reverse();
        yticks = otuIds.slice(0,10).map(otuID => {`OTU ${otuID}`}).reverse();

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
            title: "some title",
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
                    color : otuIds
                }
            }
        ]

        let bubbleLayout = {
            title : "some title",
            margin : {t:0},
            hovermode : "closest",
            xaxis : {title: "x axis"},
            margin : {t:30}
        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout)
    });
}

function init(){

    let selector = d3.select("#selDataSet");
    d3.json(url).then((data) => {
        let sampleNames = data.names;

        for (let i = 0; i < sampleNames.length; i++){

            selector
                .append("option")
                .text(sampleNames[i])
                .property("value", sampleNames[i]);
        };
        let firstSample = sampleNames[0];
        buildCharts(firstSample);
        SampleMetaData(firstSample);
    });
}
function optionChanged(newSample) {
    
    buildCharts(newSample);
    SampleMetaData(newSample);
  }

init();