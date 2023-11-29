var playlistData = {
  song: null,
  timeSlot: null
};

function addToPlaylist() {
  var button = document.getElementById("Playlist_Button");
  button.textContent = "Added to Playlist";

  setTimeout(function () {
    button.textContent = "Add to Playlist";
    button.blur();
  }, 3000);

  var songSelect = document.getElementById("select1");
  var timeSlotSelect = document.getElementById("select2");

  playlistData.song = songSelect.value;
  playlistData.timeSlot = timeSlotSelect.value;

  console.log(playlistData);

  alert("Button was clicked!");
}
