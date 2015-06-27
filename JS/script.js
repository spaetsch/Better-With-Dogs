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
    var firstDogPhoto = '<a href="' + data.items[nextDog].link + '"><img src="' + data.items[nextDog].media.m + '"></a>';
    $('#withHeader').html($flickrSearch + " with dogs");
    $('#photo-dog').html(firstDogPhoto);
  }
  function showPhotosNoDog(data) {
    var nextItem = Math.floor(Math.random() * 20) + 1;
    console.log("next Item", nextItem);
    console.log(data.items);
    var firstPhoto = '<a href="' + data.items[nextItem].link + '"><img src="' + data.items[nextItem].media.m + '"></a>';
    $('#withoutHeader').html($flickrSearch + " without dogs");
    $('#photo-nodog').html(firstPhoto);
  }
  $.getJSON(flickrAPI, options, showPhotosNoDog);
  $.getJSON(flickrAPI, optionsWDog, showPhotosDog);
}

$('#search-form').submit(function(event) {
  search();
  event.preventDefault();
});

$("#again").click(function(event){
  search();
});

$("#withDogs").click(function(event){
  console.log("you have a soul");
  $("#verdict").html("Dogs rule");
  $("#photo-dog").addClass("highlight");
  $("#photo-nodog").removeClass("highlight");
});

$("#withoutDogs").click(function(event){
  console.log("you are soulless and empty");
  $("#verdict").html("Dogs drool");

  $("#photo-nodog").addClass("highlight");
  $("#photo-dog").removeClass("highlight");
});


