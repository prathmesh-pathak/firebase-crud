import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyBIhplEK5x66E1ebYDxWYWFPk9i094o8Mg",
    authDomain: "demoproject-71bec.firebaseapp.com",
    databaseURL: "https://demoproject-71bec-default-rtdb.firebaseio.com/",
    projectId: "demoproject-71bec",
    storageBucket: "demoproject-71bec.appspot.com",
    messagingSenderId: "731576663899",
    appId: "1:731576663899:web:a4d3fd28d83ed0d8d5a47e"
}

firebase.initializeApp(config);

const dbRef = firebase.database().ref();
const usersRef = dbRef.child('users');

const userListUI = document.getElementById("userList");
usersRef.on("child_added", snap => {
    let user = snap.val();
    let $li = document.createElement("li");
    $li.innerHTML = user.name;
    $li.setAttribute("child-key", snap.key);
    $li.addEventListener("click", userClicked).userListUI.append($li);
});

function userClicked(e) {
    var userID = e.target.getAttribute("child-key");
    const userRef = dbRef.child('users/' + userID);
    const userDetailUI = document.getElementById("userDetail");
    userDetailUI.innerHTML = ""
    userRef.on("child_added", snap => {
        var $p = document.createElement("p");
        $p.innerHTML = snap.key + " - " + snap.val().userDetailUI.append($p);
    });
}