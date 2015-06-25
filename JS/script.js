

$('#search-form').submit(function(event) {
  var $flickrSearch = $("#flickr-search").val();

  console.log("sending search tags:", $flickrSearch);

  var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  var options = {
    tags: $flickrSearch,
    format: "json"
  };
  function showPhotos(data) {
    var photoList = '<ul>';
    $.each(data.items, function(i, photo) {
      photoList += '<li>';
      photoList += '<a href="' + photo.link + '">';
      photoList += '<img src="' + photo.media.m + '"></a></li>';
    });
    photoList += '</ul>';
    $('.photo-container').html(photoList);
  }

  event.preventDefault();

  $.getJSON(flickrAPI, options, showPhotos);
});


$('#search-formDog').submit(function(event) {
  var $flickrSearchDog = $("#flickr-searchDog").val() + " & dog";

  console.log("sending search tags:", $flickrSearchDog);

  var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  var options = {
    tags: $flickrSearchDog,
    format: "json"
  };
  function showPhotos(data) {
    var photoList = '<ul>';
    $.each(data.items, function(i, photo) {
      photoList += '<li>';
      photoList += '<a href="' + photo.link + '">';
      photoList += '<img src="' + photo.media.m + '"></a></li>';
    });
    photoList += '</ul>';
    $('.photo-container').html(photoList);
  }

  event.preventDefault();

  $.getJSON(flickrAPI, options, showPhotos);
});
