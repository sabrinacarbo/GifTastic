// Api Key: bXQQP277SeEAtY1ITvMjH1g0MaaOx1By

//===================== GLOBAL VARIABLES =======================

var looneyTunes = ["Bugs Bunny", "Tweety", "Daffy Duck", "Porky Pig", "Elmer Fudd", "Sylvester", "Foghorn Leghorn", "Road Runner", "Cool Cat", "Gabby Goat"]

var queryURL = 'http://api.giphy.com/v1/gifs/search?api_key=bXQQP277SeEAtY1ITvMjH1g0MaaOx1By&limit=10&q=';


//======================== CONDITIONALS ========================

$(document).ready(function () {

  //Creates buttons for static array items
  function staticButtons(static) {

    //Use a loop to create buttons for each item within the array
    static.forEach(function (element) {
      var container = $("<button>");
      container.addClass("static-btn"); 
      container.attr("data-name", element);
      container.text(element);
      $("#buttons").append(container);
    });

  };
  staticButtons(looneyTunes);
  

  //Grabs still and animated photos from Giphy  ======== ON CLICK =======
  function showImage(url, still, animated) {
    var image = $("<img>");

    image.attr({
      src: url,
      "data-animate": animated,
      "data-still": still,
      "data-state": "still",
    });
    return image;
  };


  //Pulling giphy image urls from data array ======== ON CLICK =======
  function displayGiphy(response) {
    // console.log("Response: " + response);

    var data = response.data;
    for (var i = 0; i < data.length; i++) {
      // console.log(data[i].images);
      var animated = data[i].images.fixed_width.url;
      var still = data[i].images.fixed_width_still.url;
      var url = still

      //Adds image to images class
      $(".images").append(showImage(url, still, animated));
    };

  };


  //Pulls request from Giphy API ======== ON CLICK =======
  function grabGiphy(val) {
    $(".images").empty();
    $.ajax({
      url: (queryURL + val),
      method: "GET"
    }).then(function (data) {
      // console.log("Data: ", data);
      displayGiphy(data);

    }).catch(function (error) {
      console.log("Error: ", error);

    });
  }


  function searchGiphyByButtonText() {
    var name = $(this).html();
    grabGiphy(name);

  };


 //Loop that if new item is added to array a button is produced
  function createButton(){
    event.preventDefault();
    $("#buttons").empty();
    var val = $("#searchText").val();
    $("#searchText").val("");
    looneyTunes.push(val);
    staticButtons(looneyTunes);
    grabGiphy(val);
  }

  function showAnimated(){
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }

  $(document).on("click", ".static-btn", searchGiphyByButtonText);
  $(document).on("click", "#searchBtn", createButton);
  $(document).on("click", ".images img", showAnimated);



  //Gif should display rating

});