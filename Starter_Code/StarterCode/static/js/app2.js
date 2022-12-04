function buildMetadata(sample){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let metadata = data.metadata;
        let arrayResults = metadata.filter(bob => bob.id == sample);
        let result = arrayResults[0];
        let div = d3.select("#sample-metadata");
        div.html("");
        Object.entries(result).forEach(([key, value]) => {
          div.append("li").text(`${key} : ${value}`);

      });

        
  
      });
    }

function buildCharts(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        
        let samples = data.samples
        let arrayResults = samples.filter(bob => bob.id == sample);
        let result= arrayResults[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;
 
        var LayoutBubble = {
            margin: { t: 0 },
            xAxis: { title: "OTU ID" },
            hoverMode: "closest"
        };

        var DataBubble = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    color: otu_ids,
                    size: sample_values
                }
            }
        ];

        Plotly.newPlot("bubble", LayoutBubble, DataBubble)

        let yticks = otu_ids.slice(1, 10).map(otuID => `OTU ${otuID}`).reverse();
        var BarData= [{
            y: yticks,
            x: sample_values.slice(0,10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h"
        }]
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", BarData, barLayout)
     
        });
      }
      
      let select = d3.select("#selDataset");


      d3.json("samples.json").then((data) => {
          var sampleNames = data.names;
          sampleNames.forEach((sample) => {
              select
                  .append("option")
                  .text(sample)
                  .property("value", sample);
          });
      
          const firstSample = sampleNames[0];
          buildCharts(firstSample);
          buildMetadata(firstSample);
      });
      
       function optionChanged(newSample) {
          buildCharts(newSample);
          buildMetadata(newSample);
      }
      








    //   function init(){
    //     dropdown = d3.select("selDataset");
    //     d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    //       var names= data.names;
    //       for(var i = 0; i < names.length; i++){
    //         dropdown.append("option").text(names[i]).property("value", names[i]);
    //       }
     
    //     indexfirst= names[0]
    //     buildCharts(indexfirst)
    //     buildMetadata(indexfirst)
    //   })
    //   }
    //   function optionChanged(newSample){
    //     buildCharts(newSample),
    //     buildMetadata(newSample)
    //   }
    
      
    
    //   init()