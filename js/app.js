console.log("App Running")

$(document).ready(function () {
$(".js-song-search-form").on("submit", getSong);
$(".js-btn-play").on("click", playTheSong)
$('.js-player').on('timeupdate', printTime);
});

function getSong (eventThing) {
	eventThing.preventDefault();

 var songInput = $(".js-song-search").val();
 console.log(songInput);

 $.ajax({
		type: "GET",
		url: `https://api.spotify.com/v1/search?type=track&q=${songInput}`,
		success: displaySong,
		error: handleError,
	});	

};

function displaySong(songInfo){
	$( ".js-btn-play" ).removeClass( "disabled" );

console.log(songInfo);

// songTrack = songInfo.tracks.href

var songTrack = songInfo.tracks.items[0].preview_url
console.log(songInfo.tracks.items[0].preview_url)

$(".js-player").attr("src",songTrack)


var songArtistName = `${songInfo.tracks.items[0].artists[0].name}`
console.log(songArtistName)
$(".js-song-artist").text(songArtistName);

var songName = `${songInfo.tracks.items[0].name}`
console.log(songName);

$(".js-song-title").text(songName);

var songImage = songInfo.tracks.items[0].album.images[0].url
console.log(songInfo.tracks.items[0].album.images[0].url)
$(".js-cover").attr("src",songImage)

}

function playTheSong(){
	


	if ($(".js-btn-play").hasClass("playing")){

	$(".js-player").trigger("pause");
	$(".js-btn-play").removeClass("playing");
}
     else {

	$(".js-player").trigger("play");
	$(".js-btn-play").addClass("playing");
};
};

// Define a function to print the player's current time
function printTime () {
  var current = $('.js-player').prop('currentTime');
console.log(current)
  $("progress").attr("value",current)
}










function handleError (errorThing) {
	console.log("Song search error");
	console.log(errorThing.responseText);
}