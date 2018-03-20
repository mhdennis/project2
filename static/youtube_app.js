var views = {
  x: [71.73, 23.58, 1089.33, 102.64, 391.98, 456.8, 836.03, 595.63, 856.67],
  y: ["2010", "2011", "2012", "2013", "2014", "2015","2016", "2017", "2018"],
  name: 'ViewCount',
  type: 'bar',
  orientation: 'h',
  marker: {
    color: 'rgba(128,0,0,0.8)',
    width: 1
  },
};

var data = [views];
var layout = {
  title: 'YouTube Viewership of "Olympic" Channel by Year (in millions)',
  xaxis: {
    title: 'View Count',
    titlefont: {
      family: 'Arial, monospace',
      size: 14,
      color: '000000'
    }
  },
  yaxis: {
    title: 'Year',
    titlefont: {
      family: 'Arial, monospace',
      size: 14,
      color: '000000'
    }
  }
};
Plotly.newPlot('YoutubeDiv', data, layout);