 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCtwwcz03YiJQt5B5fFkBAQWgaP3-Hc0Kg",
    authDomain: "hermesdata-3b137.firebaseapp.com",
    databaseURL: "https://hermesdata-3b137.firebaseio.com",
    projectId: "hermesdata-3b137",
    storageBucket: "hermesdata-3b137.appspot.com",
    messagingSenderId: "507316697523"
  };
  firebase.initializeApp(config);

  //Load Dataset on table
  var tblCakes = document.getElementById('tbl_Cakes_list');
  var databaseRef = firebase.database().ref('Cakes/');
  var rowIndex = 1;
  
  databaseRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
     var childKey = childSnapshot.key;
     var childData = childSnapshot.val();

     var row = tblCakes.insertRow(rowIndex);
     var cellId = row.insertCell(0);
     var cellName = row.insertCell(1);
     var cellPrices =row.insertCell(2);
     cellId.appendChild(document.createTextNode(childKey));
     cellName.appendChild(document.createTextNode(childData.Cakename));
     cellPrices.appendChild(document.createTextNode(childData.Prices));
     rowIndex = rowIndex + 1;
   });
  });

  //function


  function saveCake(){
   var Cakename = document.getElementById('Cakename').value;
   var Prices= document.getElementById('Prices').value;
   var uid = firebase.database().ref().child('Cakes').push().key;
   
   
   var data = {
    Cakeid: uid,
    Cakename: Cakename,
    Prices :Prices
  }

  var updates = {};
  updates['/Cakes/' + uid] = data;
  firebase.database().ref().update(updates);

  alert('The user is created successfully!');
  reload_page();
}


function updateCake(){
 var Cakename = document.getElementById('Cakename').value;
 var Cakeid = document.getElementById('Cakeid').value;
 var Prices = document.getElementById('Prices').value;
 var data = {
  Cakeid: Cakeid,
  Cakename: Cakename,
  Prices :Prices
}

var updates = {};
updates['/Cakes/' + Cakeid] = data;
firebase.database().ref().update(updates);

alert('The user is updated successfully!');

reload_page();
}

function deleteCake(){
 var Cakeid = document.getElementById('Cakeid').value;

 firebase.database().ref().child('/Cakes/' + Cakeid).remove();
 alert('The user is deleted successfully!');
 reload_page();
}

function reload_page(){
 window.location.reload();
}