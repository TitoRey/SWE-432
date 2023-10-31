document.addEventListener('DOMContentLoaded', function() {
  const removeSong = document.getElementById("remove-song");
  if (removeSong)
  {
    removeSong.addEventListener('click', function(e) {
      confirm("Are you sure you want to remove this song?");
      e.target.closest("tr").remove();
    });
  }

  let a = 1;
  var b = 2;
  if (a > b) { console.log("Wow, this is really wrong..."); }
  else { console.log('This math makes sense!'); }


  let truthy = true; 
  let falsy = false;

  if ( truthy && falsy ) { console.log("This should not log..."); }
  else if (truthy) { console.log("Using 'else if'!"); }
  if ( truthy || falsy ) { console.log("This should log!"); }
  if (!falsy) { console.log("This should log too!"); }
  
  let fooList = [ 1, 2, 3];
  fooList.forEach(function(item) {
    console.log(item); 
  })


  let DJ = { 
    first_name: 'Tito',
    last_name: 'Reynoso',
    age: 21,
    YOE: 2
  };

  console.log(DJ.first_name);
  DJ.first_name = 'Robert';
  console.log(DJ.first_name);
  DJ.favoriteFood = 'Combo Fried Rice (Sorry I\'m hungry lol)';
  console.log(DJ.favoriteFood);
  console.log(DJ);
});

function infoIcon() {
  alert("Should you wish, please use the garbage icon to remove the song from the playlist!");
}