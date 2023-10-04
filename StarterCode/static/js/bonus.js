function Gauge(sample){
    d3.json(url).then((data) => {

        let metadata = data.metadata;
        
        let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        let result = resultArray[0];
        let washFreq = result.wfreq;


// gauge

        let gauagedata = [
            {
                mode: "gauge",
                type: "indicator",
                value: washFreq,
        
                gauge: {
                    shape: "angular",
                    bar: {
                        color: "blue",
                        line: {
                            color: "red",
                            width: 4
                        },  
                        thickness: 0
                    },
                    bgcolor: "#388",
                    bordercolor: "#a89d32",
                    borderwidth: 3,
                    axis: {
                        range: [0,9],
                        visible: true,
                        tickmode: "array",
                        tickvals: [0,1,2,3,4,5,6,7,8,9],
                        ticks: "outside"
                    },
                    
                        
                            
                    steps: [
                    { range: [0, 1], color: "#f8f3ec" },
                    { range: [1,2], color: "#f4f1e4" },
                    { range: [2,3], color: "#e9e7c9" },
                    { range: [3,4], color: "#e5e8b0" },
                    { range: [4,5], color: "#d5e599" },
                    { range: [5,6], color: "#b7cd8f" },
                    { range: [6,7], color: "#8bc086" },
                    { range: [7,8], color: "#89bc8d" },
                    { range: [8,9], color: "#84b589" }
                    
                    ]
                        
                    
                
              }    }
        ]
        
        var theta = 93.5
        var r = 0.7
        var x_head = r * Math.cos(Math.PI/180*theta)
        var y_head = r * Math.sin(Math.PI/180*theta)
        
        let layout = {
          xaxis: {range: [0, 1], showgrid: false, 'zeroline': false, 'visible': false},
          yaxis: {range: [0, 1], showgrid: false, 'zeroline': false, 'visible': false},
          showlegend: false,
          annotations: [
            {
              ax: 0.5,
              ay: 0,
              axref: 'x',
              ayref: 'y',
              x: 0.5+x_head,
              y: y_head,
              xref: 'x',
              yref: 'y',
              showarrow: true,
              arrowhead: 9,
            }
          ]
        };
        Plotly.newPlot('gauge', gauagedata, layout)












// var data = [
//     {
//       domain: { x: [0, 1], y: [0, 1] },
//       value: washFreq,
//       title: { text: "Belly Button Washing Frequency" },
//       type: "indicator",
//       mode: "gauge+number",
//       labels:["0-1","1-2","2-3","3-4","4-5","5-6","6-7","7-8","8-9"],
//       text:["0-1","1-2","2-3","3-4","4-5","5-6","6-7","7-8","8-9"],
//       textInfo : "text", 
//       gauge: {
        
//         axis: { range: [null, 9] },
//         steps: [
//           { range: [0, 1], color: "#f8f3ec" },
//           { range: [1,2], color: "#f4f1e4" },
//           { range: [2,3], color: "#e9e7c9" },
//           { range: [3,4], color: "#e5e8b0" },
//           { range: [4,5], color: "#d5e599" },
//           { range: [5,6], color: "#b7cd8f" },
//           { range: [6,7], color: "#8bc086" },
//           { range: [7,8], color: "#89bc8d" },
//           { range: [8,9], color: "#84b589" }
          
//         ]
       
        
//       }
//     }
//   ];
  
//   var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
//   Plotly.newPlot('gauge', data, layout)

 })};