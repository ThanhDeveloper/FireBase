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
  var tblUsers = document.getElementById('tbl_users_list');
  var databaseRef = firebase.database().ref('users/');
  var rowIndex = 1;
  
  databaseRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
     var childKey = childSnapshot.key;
     var childData = childSnapshot.val();

     var row = tblUsers.insertRow(rowIndex);
     var cellId = row.insertCell(0);
     var cellName = row.insertCell(1);
     var cellPrices =row.insertCell(2);
     cellId.appendChild(document.createTextNode(childKey));
     cellName.appendChild(document.createTextNode(childData.user_name));
     cellPrices.appendChild(document.createTextNode(childData.Prices));
     rowIndex = rowIndex + 1;
   });
  });

 // Display Chatbox Animation 
  function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
//Assign user chat
var app = angular.module('app', ['firebase']);
app.controller('chatCtrl', ['$scope', '$firebase', function($scope, $firebase) {
    var name = prompt("Enter your name: ", '');
    $scope.name = name;
    $scope.chatMessage = "";
    var ref = new Firebase("https://chatting-9cdea.firebaseio.com/");
    var sync = $firebase(ref);
    $scope.chatMessages = sync.$asArray();
    $scope.sendChat = function() {
        var chatMessage = {
            name: name,
            message: $scope.chatMessage
        };
        $scope.chatMessages.$add(chatMessage);
        $scope.chatMessage = "";
    }
    $scope.clear = function() {
        for(var i = 0; i < $scope.chatMessages.length; i++) {
            $scope.chatMessages.$remove($scope.chatMessages[i]);
        }
    }
}]);