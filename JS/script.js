var search = function(){
  var $flickrSearch = $("#flickr-search").val();
  var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  var options = {
    tags: $flickrSearch,
    format: "json"
  };
  var optionsWDog = {
    tags: $flickrSearch + " ,dog",
    format: "json"
  };
  function showPhotosDog(data) {
    var nextDog = Math.floor(Math.random() * 20) + 1;
    console.log("nextDog", nextDog);
    console.log(data.items);
    var currentDogPhoto = '<img src="' + data.items[nextDog].media.m + '">';
    var currentDogTitle = '<a href="' + data.items[nextDog].link + '">' + data.items[nextDog].title + '</a>';
    $('#dogHeader').html($flickrSearch + " with dogs");
    $('#photo-dog').html(currentDogPhoto);
    $("#dogCaption").html(currentDogTitle);
  }
  function showPhotosNoDog(data) {
    var nextItem = Math.floor(Math.random() * 20) + 1;
    console.log("next Item", nextItem);
    console.log(data.items);
    var currentPhoto = '<img src="' + data.items[nextItem].media.m + '">';
    var currentTitle = '<a href="' + data.items[nextItem].link + '">' + data.items[nextItem].title + '</a>';
    $('#nodogHeader').html($flickrSearch + " without dogs");
    $('#photo-nodog').html(currentPhoto);
    $("#nodogCaption").html(currentTitle);

  }
  $.getJSON(flickrAPI, options, showPhotosNoDog);
  $.getJSON(flickrAPI, optionsWDog, showPhotosDog);
}

var clearChoices = function(){
  $("#photo-nodog").removeClass("highlight");
  $("#photo-dog").removeClass("highlight");
}

var clearVerdict = function(){
  $("#verdict-text").html("");
}

$('#search-form').submit(function(event) {
  clearVerdict();
  search();
  event.preventDefault();
});

$("#again-button").click(function(event){
  clearChoices();
  clearVerdict();
  search();
});

$("#withDogs-button").click(function(event){
  $("#photo-dog").addClass("highlight");
  $("#photo-nodog").removeClass("highlight");
});

$("#withoutDogs-button").click(function(event){
  $("#photo-nodog").addClass("highlight");
  $("#photo-dog").removeClass("highlight");
});

$("#vote-button").click(function(event){
  var checkNoDog = $("#photo-nodog").hasClass("highlight");
  var checkDog = $("#photo-dog").hasClass("highlight");
  if (checkNoDog){
    $("#verdict-text").html("Dogs drool...");
  } else if (checkDog){
    $("#verdict-text").html("Dogs rule!");
  } else {
    $("#verdict-text").html("Please make a selection");
  }
  clearChoices();
});

