const firebaseConfig = {
        apiKey: "AIzaSyBbTUI9DJWvg44RgEs1B4cli03VTuXhRpY",
        authDomain: "zap-projeto-40365.firebaseapp.com",
        databaseURL: "https://zap-projeto-40365-default-rtdb.firebaseio.com",
        projectId: "zap-projeto-40365",
        storageBucket: "zap-projeto-40365.appspot.com",
        messagingSenderId: "14815144132",
        appId: "1:14815144132:web:97469b57ed5546c20e8191"
    };

firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Bem-vindo " + user_name +"!";

function addRoom()
{
    room_name = document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_name).update({
        purpose : "adding room name"
    });

    localStorage.setItem("room_name", room_name);

    window.location = "zap_page.html";
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
       roomNames = childKey;
       console.log("Nome da Sala - " + roomNames);
      row = "<div class='roomName' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name)
{
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "zap_page.html";
}

function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
  }
