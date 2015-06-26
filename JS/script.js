
$('#search-form').submit(function(event) {
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

  function showPhotosLeft(data) {
    var firstPhoto = '<a href="' + data.items[0].link + '"><img src="' + data.items[0].media.m + '"></a>';
    $('#withHeader').html($flickrSearch + " with dogs");
    $('#left1').html(firstPhoto);
  }

  function showPhotosRight(data) {
    var firstDogPhoto = '<a href="' + data.items[0].link + '"><img src="' + data.items[0].media.m + '"></a>';
    $('#withoutHeader').html($flickrSearch + " without dogs");
    $('#right1').html(firstDogPhoto);
  }

  event.preventDefault();
  $.getJSON(flickrAPI, options, showPhotosLeft);
  $.getJSON(flickrAPI, optionsWDog, showPhotosRight);
});


$("#withDogs").click(function(event){
  console.log("you have a soul")
});

$("#withoutDogs").click(function(event){
  console.log("you are soulless and empty")
});
