var search = function(){
  var $flickrSearch = $("#flickr-search").val();
  // using the public feed
 /// var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

 //using feed that requires API key
  var flickrBaseURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search"
  //&api_key=f9181ad6f35e3b3481e4840dc95d8905&tags=potato&sort=relevance&format=json&nojsoncallback=1

  var api_key = "&api_key=fa3e0832f30851339c73d3dd3c27f961";
  var tags = "&tags=" + $flickrSearch;
  var tagsDog = "&tags=" + $flickrSearch + ",dog";
  var sort = "&sort=relevance";
  var format = "&format=json";
  var nojsoncallback = "&nojsoncallback=1";

  var flickrReq = flickrBaseURL + api_key + tags + sort + format + nojsoncallback;
  var flickrReqDog = flickrBaseURL + api_key + tagsDog + sort + format + nojsoncallback;

  console.log("flickrReq", flickrReq);

  function showPhotosDog(data) {
    var nextDog = Math.floor(Math.random() * 20) + 1;
    //console.log("nextDog", nextDog);
    console.log("data", data);
    var currentDogPhoto = '<img src="' + data.items[nextDog].media.m + '">';
    var currentDogTitle = '<a href="' + data.items[nextDog].link + '">' + data.items[nextDog].title + '</a>';
    $('#dogHeader').html($flickrSearch + " with dogs");
    $('#photo-dog').html(currentDogPhoto);
    $("#dogCaption").html(currentDogTitle);
  }
  function showPhotosNoDog(data) {
    var nextItem = Math.floor(Math.random() * 20) + 1;
   // console.log("next no dog", nextItem);
    console.log("data.items", data.items);
    var currentPhoto = '<img src="' + data.items[nextItem].media.m + '">';
    var currentTitle = '<a href="' + data.items[nextItem].link + '">' + data.items[nextItem].title + '</a>';
    $('#nodogHeader').html($flickrSearch + " without dogs");
    $('#photo-nodog').html(currentPhoto);
    $("#nodogCaption").html(currentTitle);

  }
  console.log("before get json");
  $.getJSON(flickrReq, showPhotosNoDog);
  $.getJSON(flickrReqDog, showPhotosDog);
  //$.getJSON(flickrAPI, options, showPhotosNoDog);
  //$.getJSON(flickrAPI, optionsWDog, showPhotosDog);
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
  console.log("submit search form");
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

