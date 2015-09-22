var search = function(){
  //get search term entered by user
  var $flickrSearch = $("#flickr-search").val();

  //using feed that requires API key
  var flickrBaseURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search"

  var maxResults = 50; // cannot be more than 500

  var api_key = "&api_key=fa3e0832f30851339c73d3dd3c27f961";
  var tags = "&tags=" + $flickrSearch;
  var tagsDog = "&tags=" + $flickrSearch + ",dog,pet";
  var sort = "&sort=relevance";
  var total = "&per_page=" + maxResults;
  var format = "&format=json";
  var nojsoncallback = "&nojsoncallback=1";

  //assemble the parts into complete request
  var flickrReq = flickrBaseURL + api_key + tags + sort + total + format + nojsoncallback;
  var flickrReqDog = flickrBaseURL + api_key + tagsDog + sort + total + format + nojsoncallback;

  function showPhotosDog(data) {
    //randomly choose a photo from the array returned
    var nextDog = Math.floor(Math.random() * maxResults) + 1;

    var farm = data.photos.photo[nextDog].farm;
    var server = data.photos.photo[nextDog].server;
    var id = data.photos.photo[nextDog].id;
    var secret = data.photos.photo[nextDog].secret;

    //assemble the parts into a complete URL for the photo
    var photoURL = "https://farm" + farm + ".staticflickr.com/" + server
    + "/" + id + "_" + secret + "_z.jpg";  //underscore letter signals size of resultb
    // z medium 640, 640 on longest side
    // c medium 800, 800 on longest side
    // b large, 1024 on longest side
    // h large 1600, 1600 on longest side

    var owner = data.photos.photo[nextDog].owner;
    var attrURL = "https://www.flickr.com/photos/" + owner + "/" + id + "/";
    var title = data.photos.photo[nextDog].title;

    //assemble HTML for img and title link
    var currentDogPhoto = '<img src="' + photoURL + '">';
    var currentDogTitle = '<a href="' + attrURL + '">' + title + '</a>';

    $('#dogHeader').html($flickrSearch + " with dogs");
    $('#photo-dog').html(currentDogPhoto);
    $("#dogCaption").html(currentDogTitle);
  }

  function showPhotosNoDog(data) {
    var nextItem = Math.floor(Math.random() * maxResults) + 1;

    var farm = data.photos.photo[nextItem].farm;
    var server = data.photos.photo[nextItem].server;
    var id = data.photos.photo[nextItem].id;
    var secret = data.photos.photo[nextItem].secret;

    //assemble the parts into a complete URL for the photo
    var photoURL = "https://farm" + farm + ".staticflickr.com/" + server
    + "/" + id + "_" + secret + "_z.jpg";  //underscore letter signals size of result
    // z medium 640, 640 on longest side
    // c medium 800, 800 on longest side
    // b large, 1024 on longest side
    // h large 1600, 1600 on longest side

    var owner = data.photos.photo[nextItem].owner;
    var attrURL = "https://www.flickr.com/photos/" + owner + "/" + id + "/";
    var title = data.photos.photo[nextItem].title;

    //assemble HTML for img and title link
    var currentPhoto = '<img src="' + photoURL + '">';
    var currentTitle = '<a href="' + attrURL + '">' + title + '</a>';
    $('#nodogHeader').html($flickrSearch + " without dogs");
    $('#photo-nodog').html(currentPhoto);
    $("#nodogCaption").html(currentTitle);

  }
  $.getJSON(flickrReq, showPhotosNoDog);
  $.getJSON(flickrReqDog, showPhotosDog);
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

