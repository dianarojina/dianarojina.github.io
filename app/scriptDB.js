var database = firebase.database();
var ref = database.ref('Points');

let button = document.getElementById('button');
button.addEventListener('click', function () {
  ref.on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      data = childSnapshot.val();
      console.log(data);
    });
  });
});
