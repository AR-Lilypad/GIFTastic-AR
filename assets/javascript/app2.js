

// initial array of topics
var topics = ["Mandelbrot", "Timelapse Stars", "Timelapse Flowers", "Timelapse Lightning-storm", "Sunset", "Volcano", "Sea", "Dancing Bird", "Groot"];
var button;

function createButtons() {                                              // to display gif data
    $("#giphy-button").empty();                                         // deletes gifs prior to adding new gifs to prevent double buttons
    for (var i = 0; i < topics.length; i++) {                           // loops through array to create buttons
        var button = $("<button>" + topics[i] + "</button>");           // button
        button.addClass("gifButtons");                                  // add class
        button.attr("data-name", topics[i]);                            // add attribute 
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

    // This function handles events where a movie button is clicked
    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var gif = $("#gif-input").val().trim();

        // Adding movie from the textbox to our array
        topics.push(gif);

        // Calling renderButtons which handles the processing of our movie array
        createButtons();
    });

}
createButtons();

$(document).on("click", ".gifButtons", getGIFs);                           //event listener for all class=".gifButtons"

function getGIFs() {                                                      // display content 

    var giphy = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=Aunvr19ZrKnV6rmZATqD5j8hzwTeGScI&limit=10";

    $.ajax({                                                              //ajax call for giphy API
        url: queryURL,
        method: "GET"
    }).then(function (response) {                                         // data return from API
        console.log(response);
        var response = response.data;                                     // array of results returned 

        for (var i = 0; i < response.length; i++) {                       // loop results of the array for individual topics
            var giphyDiv = $("<div>");                                    // container for the individual gifs
            var rating = response[i].rating;                              // ratings to display for the gifs
            var ratingCopy = $("<p>").text("Rating: " + rating);          // p tag for ratings display on html
            var giphyImg = $("<img>");                                    // image tag
            giphyImg.attr("src", response[i].images.fixed_height_still.url);    //src attribute of results data properties
            giphyImg.attr("data-still", response[i].images.fixed_height_still.url);
            giphyImg.attr("data-animate", response[i].images.fixed_height_still.url);
            giphyImg.attr("data-state", "still");
            giphyDiv.append(ratingCopy);                                  // adds the rating and image to the giphyDiv
            giphyDiv.append(giphyImg);
            $("#gifsHere").prepend(giphyDiv);                             // 'prints giphy to html
        }
    })

    $("#gifsHere").on("click", function (event) {                             //setting up the still/animate/still function
        event.preventDefault();

        var state = $(this).attr("data-state");

        if (state === "still") {                                             // If the image's state is still, update its src attribute to what its data-animate value is. 
            $(this).attr("src", $(this).attr("data-animate"));               // Then, set the image's data-state to animate
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));                 // Else set src to the data-still value
            $(this).attr("data-state", "still");
        }
    })
}
