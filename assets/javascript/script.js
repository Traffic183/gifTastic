$(document).ready(function() {

  var animals = [
    "kitten and puppies", "dog and cat", "dog and chimp", "dog and fox", "dog and goat", "goat and horse", "chicken and puppies","elephant and dog", "chimp and tiger", "goat and cat", "deer and dog", "pig and dog", "pig and cat", "cow and dog"
  ];

  function populateBtns(animalArray, classToAdd, gifArea) {
    $(gifArea).empty();

    for (var i = 0; i < animalArray.length; i++) {
      var btn = $("<button>");
      btn.addClass(classToAdd);
      btn.attr("data-type", animalArray[i]);
      btn.text(animalArray[i]);
      $(gifArea).append(btn);
    }
  }

  $(document).on("click", ".animal-button", function() {
    $("#animals").empty();
    $(".animal-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=RbkwVHMyVNieK3a5eT3ORLOAPs3h24bK&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var animalDiv = $("<div class=\"animal-item\">");

          var rating = results[i].rating;

          var gifText = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;
          var animalImage = $("<img>");
          animalImage.attr("src", still);
          animalImage.attr("data-still", still);
          animalImage.attr("data-animate", animated);
          animalImage.attr("data-state", "still");
          animalImage.addClass("animal-image");

          animalDiv.append(gifText);
          animalDiv.append(animalImage);

          $("#animals").append(animalDiv);
        }
      });
  });

  $(document).on("click", ".animal-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    var newAnimal = $("input").eq(0).val();

    if (newAnimal.length > 2) {
      animals.push(newAnimal);
    }

    populateBtns(animals, "animal-button", "#animal-buttons");

  });

  populateBtns(animals, "animal-button", "#animal-buttons");
});
