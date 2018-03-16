/*** Make news article counts and google trends chart.
 *  Kevin Yao, 18/14/3 - 
 * https://github.com/Kevinxy00
 */

// For reference: https://plot.ly/javascript/dropdowns/


var $news_chart = document.getElementById("news_api");
var $newsAndGoogle_selector = document.getElementById("newsAndGoogle_menu");

// Plot the first chart, the NYT
url = "/nyt_articles"
Plotly.d3.json(url, function(error, response){
    // For news api, store response year & article_hits in arrays
    var years = [];
    var article_hits = [];
    // only get the last 30 years, so bar chart is not too cluttered
    for (var i=0; i<31; i++){
        years.push(response[i].year)
        article_hits.push(response[i].article_hits)
    } 
    var title = "New York Times Olympics Mentions by Year";
    plot_bar(years, article_hits, title);

    
}); // end plotly js

/* Function to plot bar graphs. 
* Parameters: time as x, some measurement as y, & a graph title
*/
function plot_bar(time, measure, barTitle){
    // *** Loop to determine if year is an olympic year. 
    /* ONLY for year data ***/
    // color array to be filled
    var color_arr = [];
    // if counter divisible by 2 then winter; else == summer
        // to be incremented in the else statement to keep track of winter vs. summer
    var counter = 0;
    for (var i=0; i<time.length; i++){

        // Do only for year data.
        if (time[i].toString().length == 4){
            // before separate years for summer and winter olympics
            if (time[i]<1994) {
                // if the year falls under an olympic year
                if (time[i] % 4 == 0) {
                    // restyle bar as Red
                    color_arr.push("rgb(255,0,0)");
                }
                else {
                    // gray if not olympic year
                    color_arr.push("rgb(160,160,160)")
                }
            }
            // if time at index i is greater than or = 1994, alternate blue and yellow
            else {
                // if the year is even and counter is even (winter)
                if ((time[i] % 2 == 0) && (counter % 2 == 0)){
                    color_arr.push("rgb(0,0,255)") // blue
                    counter++;
                }
                // if the year is even and counter is odd (summer)
                else if ((time[i] % 2 == 0) && (counter % 2 != 0)){
                    color_arr.push("rgb(255,255,0)") //yellow
                    counter++;
                }
                // if year is odd (not olympic year)
                else {
                    color_arr.push("rgb(160,160,160)") //gray
                } 
            }
        } // end if (time[i].length == 4)
    } // end isOlympicYear? for loop 

    var trace1 = {
        x: time,
        y: measure,
        type: "bar",
        marker: {
            color: color_arr
        }
    };

    var data = [trace1];

    var layout = {
        title: barTitle,
        annotations: [
        {
            x: 1992,
            y: 1600,
            xref: 'x',
            yref: 'y',
            text: '1992:<br>Last year of combined<br>summer and winter Olympics',
            showarrow: true,
            arrowhead: 7,
            ax: 0,
            ay: -60
        }
        ],
        xaxis: {
            tickangle: -90
        }
    };

    // for updating marker colors if switch from google chart to another chart
    var update_marker = {color: color_arr}; 

    // Create new plot if there is none, otherwise just restyle

    if ($news_chart.children.length == 0){ // if there is no plot under "#news_api"
        console.log("Plotting a new bar chart!")
        Plotly.newPlot("news_api", data, layout);
    }
    else {
        console.log("Restyling! loading new bar chart!")
        Plotly.restyle("news_api", "x", [time]);
        Plotly.restyle("news_api", "marker", [update_marker])
        Plotly.restyle("news_api", "y", [measure]);
        Plotly.relayout("news_api", layout);
    }

} // end Plot_bar()

// fuction for dropdown menu change. Called by <select id="newsAndGoogle_menu" ... >
function ChangeNewsAndGoogle_menu(event){
    console.log("selected value: " + event.value);
    var selected = event.value;
    // plot NYT chart if that option is selected
    if (selected == "New York Times"){
        url = "/nyt_articles"
        Plotly.d3.json(url, function(error, response){
            // For news api, store response year & article_hits in arrays
            var years = [];
            var article_hits = [];
            // only get the last 30 years, so bar chart is not too cluttered
            for (var i=0; i<31; i++){
                years.push(response[i].year)
                article_hits.push(response[i].article_hits)
            } 
            console.log("NYT article counts: " + article_hits);

            title = "New York Times Olympics Mentions by Year";
            plot_bar(years, article_hits, title);
        });// end plotly.d3.json
    } // end if NYT

    else if (selected == "The Guardian"){
        url = "/guardian_articles"
        Plotly.d3.json(url, function(error, response){
            // For news api, store response year & article_hits in arrays
            var years = [];
            var article_hits = [];
            // only get the last 30 years, so bar chart is not too cluttered
            for (var i=0; i<31; i++){
                years.push(response[i].year)
                article_hits.push(response[i].article_hits)
            } 
            console.log("The Guardian article counts: " + article_hits);

            title = "The Guardian Olympics Mentions by Year";
            plot_bar(years, article_hits, title);
        });// end plotly.d3.json
    } // end if Guardian
    else if (selected == "Google Trends"){ 
        url = "/google_trends"
        Plotly.d3.json(url, function(error, response){
            // For news api, store response year & article_hits in arrays
            var months = [];
            var trend = [];
            // get all months from 2004 - March 2018
            for (var i=0; i<response.length; i++){
                months.push(response[i].month)
                trend.push(response[i].trend)
            } 
            title = "Google Trends by Month";
            plot_Google_bar(months, trend, title);
        });// end plotly.d3.json
    }
}; // end dropdown menu change function

/** Special function just for the google trends data
 * since a multitude of minor features for plot_bar() mess up for this data **/
function plot_Google_bar(time, measure, barTitle) {
 // *** Loop to determine if year is an olympic year. 
    // color array to be filled
    var color_arr = [];
    // if counter divisible by 2 then winter; else == summer
        // to be incremented in the else statement to keep track of winter vs. summer
    var counter = 0;
    // counter to keep track of months (to get same color for each month of a year)
    var month_count = 0;
    for (var i=0; i<time.length; i++){
        // Get the year, since data format is string "YYYY-MM"
        var time_slice = parseInt(time[i].slice(0, 4));
        // Do only for year data.
        if (time_slice.toString().length == 4){
        
            // if time at index i is greater than or = 1994, alternate blue and yellow
                // could delete the starting if statem't, but I figure one more safeguard
            if (time_slice>1994) {
                // if the year is even and counter is even (summer, reversed from plot_bar())
                if ((time_slice % 2 == 0) && (counter % 2 == 0) && (month_count<12)){
                    color_arr.push("rgb(255,255,0)") //yellow
                    month_count++;
                }
                // if the year is even and counter is odd (winter, reversed from plot_bar())
                else if ((time_slice % 2 == 0) && (counter % 2 != 0) && (month_count<12)){
                    color_arr.push("rgb(0,0,255)") // blue
                    month_count++;
                }
                // if year is odd (not olympic year)
                else {
                    color_arr.push("rgb(160,160,160)") //gray
                    month_count++;
                } 

                // Reset counter every 12 months after an olympic
                if ((time_slice % 2 == 0) && (month_count==12)) {
                    month_count = 0;
                    counter++;
                }
                else if ((time_slice % 2 != 0) && (month_count==12)) {
                    month_count = 0;
                }
            } // end if (time_slice>1994) 
        } // end if (time[i].length == 4)
    } // end isOlympicYear? for loop 

    var update_marker = {
        color: color_arr
    };

    var layout = {
        title: barTitle,
        annotations: [
        {
            x: "2004-01",
            y: 75,
            xref: 'x',
            yref: 'y',
            text: '2004:<br>Start of Google<br>Trends data',
            showarrow: true,
            arrowhead: 7,
            ax: 0,
            ay: -40
        }
        ],
        xaxis: {
            tickangle: -90
        } 
    };

    console.log("Restyling! loading new bar chart!")
    Plotly.restyle("news_api", "x", [time]);
    Plotly.restyle("news_api", "marker", [update_marker]);
    Plotly.restyle("news_api", "y", [measure]);
    Plotly.relayout("news_api", layout);
}
