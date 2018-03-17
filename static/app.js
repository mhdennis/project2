new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
        
        labels: ["Sydney2000", "Salt Lake City 2002", "Athens 2004", "Torino 2006", "Beijing 2008", "Vancouver 2010","London 2012", "Sochi 2014", "Rio de Janeiro 2016"],
        datasets: [{
            label: "Average Olympic Viewership (millions)",
            yAxesID:  "y-axis-1",
            backgroundColor: ['rgba(225, 225, 0, 0.4)','rgba(0, 0, 225, 0.4)','rgba(225, 225, 0, 0.4)','rgba(0, 0, 225, 0.4)','rgba(225, 225, 0, 0.4)','rgba(0, 0, 225, 0.4)','rgba(225, 225, 0, 0.4)','rgba(0, 0, 225, 0.4)','rgba(225, 225, 0, 0.4)','rgba(0, 0, 225, 0.4)','rgba(225, 225, 0, 0.4)','rgba(0, 0, 225, 0.4)'],
            borderColor:     ['rgba(225, 225, 0, 0.1)','rgba(0, 0, 225, 0.1)','rgba(225, 225, 0, 0.1)','rgba(0, 0, 225, 0.1)','rgba(225, 225, 0, 0.1)','rgba(0, 0, 225, 0.1)','rgba(225, 225, 0, 0.1)','rgba(0, 0, 225, 0.1)','rgba(225, 225, 0, 0.1)','rgba(0, 0, 225, 0.1)','rgba(225, 225, 0, 0.1)','rgba(0, 0, 225, 0.1)'],
            data: [21.5, 31.9, 24.9, 20.2, 27.2, 24.4, 30.3, 21.4, 27.5]
        },
        {
            label: "Average Olympic Domestic Rights Fees (millions)",
            yAxisID: "y-axis-2",
            type: "line",
            borderColor: "#3cba9f",
            backgroundColor: "rgba(255,255,255,1)",
            data: [705, 545, 793.5, 613.4, 893, 820, 1181, 775, 1224],  
            fill: false
          }
        ]
    },
    options: {
        legend: {display: true},
        position: 'top',
        labels: {
            fontColor:'#333'
        },
        title: {
            display: true,
            text: "Average Olympic Viewership and Domestic Rights Fees",
            fontSize: 22
        },
        scales: {
            yAxes: [
                {
                    id:  "y-axis-1",
                    name: "Viewership (millions)",
                    position: "left",
                    ticks: {
                        beginAtZero:true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Viewership (millions)",
                        fontSize: 14
                      }
                },
                {
                    id:  "y-axis-2",
                    name: "Average Olympic Domestic Rights Fees (millions)",
                    position: "right",
                    ticks: {
                        beginAtZero:true
                        // max: 0,
                        // min: 14000
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Average Olympic Domestic Rights Fees (millions)",
                        fontSize: 14
                      }
                },
            ]
        }
    }
});




