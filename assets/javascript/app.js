

// initial array of topics
var topics = ["Mandelbrot", "Timelapse Stars", "Timelapse Flowers", "Timelapse Lightning-storm", "Sunset", "Volcano", "Sea", "Dancing Bird", "Groot"];
var button;

function createButtons() {                                           // to display gif data
    $("#giphy-button").empty();                                           // deletes gifs prior to adding new gifs to prevent double buttons
    for (var i = 0; i < topics.length; i++) {                        // loops through array to create buttons
        var button = $("<button>" + topics[i] + "</button>");                     // button
        button.addClass("gifButtons");                               // add class
        button.attr("data-name", topics[i]);                         // add attribute 
        button.text(topics[i]);
        $("#giphy-button").append(button);
        // console.log(button);

        $("#add-Gif").on("click", function (event) {
            event.preventDefault;
            var newGif = $("#add-Gif").val().trim();
            topics.push(newGif);
            createButtons();
        })
    }
}
createButtons();

$(document).on("click", ".gifButtons", getGIFs);

function getGIFs() {                                                 // display content 

    var giphy = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=Aunvr19ZrKnV6rmZATqD5j8hzwTeGScI&limit=10";

    $.ajax({                                                         //ajax call for giphy API
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var response = response.data;
        for(loop) response.data   //here
        // var giphyDiv = $("<div>");
        // var gifImage= $("<img>");





        // var rating = response.rating;
        // var ratingCopy = $("<p>").text("Rating: " + rating);
        // giphyDiv.append(ratingCopy);


    });
}



// getGIFs();


// onclick events-    button appears
// onclick events-    gif appears
// onclick events-    newButton and submit