function buildMetadata(sample){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let metadata = data.metadata;
        // Filter the data for the object with the desired sample number - DONE
        // ​let otusort = data.sort((a, b) => b.id - a.id);
        resultarray = metadata.filter(bob => bob.id == sample);
        let results = resultarray[0];
        let div = d3.select("#sample-metadata");
        div.html("");
        Object.entries(result).forEach(([key, value]) => {
          div.append("li").text(`${key} : ${value}`);

      });

        
        //for loop is taking each 'row' and attaching each key/row to the associated data and providing to user
          //for (panel in results){paneldata.append("p").text(`${panel}: ${paneldata[panel]}`)};
        // slicedData = otusort.slice(0, 10);
        // Use d3 to select the panel with id of `#sample-metadata`- DONE      
            // Assign the value of the dropdown menu option to a letiable
            // Initialize an empty array for the country's data
          // Call function to update the chart
        // Use `.html("") to clear any existing metadata    ​
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.   ​
  
        // BONUS: Build the Gauge Chart ... give this a try if you have time.  Otherwise don't add anything.
        
      });
    }

      function buildCharts(sample) {
        d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        //   put the data into a variable
        //   filter the data using 'sample'
        //   grab the first entry [0]
        let samples = data.samples
        // let samplesort = samples.sort((a, b) => b.id - a.id);
        let arrayResults = samples.filter(bob => bob.id == sample);
        let result= arrayResults[0];

          let otu_ids = result.otu_ids;
          let otu_labels = result.otu_labels;
          let sample_values = result.sample_values;
        //   let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        // var trace1= [{
        //   x:sample_values.slice(0,10).reverse(),
        //   y:yticks
        // }]
        var bubblelayout = {
          margin: { t: 0 },
          xaxis: { title: "OTU ID" },
          hovermode: "closest",
      };

      var bubbledata = [
          {
              x: otu_ids,
              y: sample_values,
              text: otu_labels,
              mode: "markers",
              marker: {
                  color: otu_ids,
                  size: sample_values,
              }
          }
      ];

      Plotly.newPlot("bubble", bubblelayout, bubbledata)

        let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        var trace1= [{
          x:sample_values.slice(0,10).reverse(),
          y:yticks
        }]

          // Build a Bubble Chart
        //   https://plotly.com/javascript/bubble-charts/
          // Plotly.newPlot("bubble", bubbleData, bubbleLayout);
            // slice the data down to 10 items  
            //you will probably want to reverse them to get them into desc order
          //create trace
            // create layout  (title is enough)
            // draw your plot Plotly.newPlot()
          
          
        });
      }
      
      function init(){
        //use d3 to select the dropdown element ($selDataset)
        dropdown = d3.select("selDataset");
        d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        // Use the list of sample names to populate the select options
          var names= data.names;
          for(var i = 0; i < names.length; i++){
            dropdown.append("option").text(names[i]).property("value", names[i]);
          }
        //loop through names from sample names
        //append option ​
        // use the first sample from the list to build the intial plots
        // run build charts
        // run build metadata
        indexfirst= names[0]
        buildCharts(indexfirst)
        buildMetadata(indexfirst)
      })
      }
      function optionChanged(newSample){
        buildCharts(newSample),
        buildMetadata(newSample)
      }
        //Fetch new data each time a row sample is selected
        // run build charts
        // run build metadata
      
    
      init()