const firebaseConfig = {
    apiKey: "AIzaSyCDbFKsk40E-N_sVU3JZyIJ6uIaYVG7apA",
    authDomain: "kwitter-a80f4.firebaseapp.com",
    databaseURL: "https://kwitter-a80f4-default-rtdb.firebaseio.com",
    projectId: "kwitter-a80f4",
    storageBucket: "kwitter-a80f4.appspot.com",
    messagingSenderId: "897719007620",
    appId: "1:897719007620:web:c337ca461302f00ddac5d1"
  };

  firebase.initializeApp(firebaseConfig);
  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");

function send()
{
// escrever o código da função
msg = document.getElementById("msg").value;
firebase.database().ref(room_name).push({
    name:user_name,
    message:msg,
    like:0
});

document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
     firebase_message_id = childKey;
     message_data = childData;
//Start code
     console.log(firebase_message_id);
       console.log(message_data);
       name = message_data['name'];
       message = message_data['message'];
     like = message_data['like'];
     name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
     message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
// Fazer o botão de like
like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
// Fazer o ícone de like
span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button><hr>";

    row = name_with_tag + message_with_tag + like_button + span_with_tag;
    document.getElementById("output").innerHTML += row; //Juntar tudo na variável   
    // Colocar a variável row no html
//End code
  } });  }); }
getData();

function updateLike(message_id)
{
console.log("clicked on like button - " + message_id);
button_id = message_id;
likes = document.getElementById(button_id).value;
updated_likes = Number(likes) + 1;
//Variável para o número atual de likes
// Variável que vai armazenar o número de likes incrementado
console.log(updated_likes);

// Firebase 
firebase.database().ref(room_name).child(message_id).update({
  like : updated_likes
});

}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location.replace("index.html");
}