(function() {

  // Your web app's Firebase configuration
  var config = {
    apiKey: "AIzaSyBwV_iwKb85p8vyM-cIbwZLpNkapY4u1kE",
    authDomain: "uofthacks-265501.firebaseapp.com",
    databaseURL: "https://uofthacks-265501.firebaseio.com",
    projectId: "uofthacks-265501",
    storageBucket: "uofthacks-265501.appspot.com",
    messagingSenderId: "403230996570",
    appId: "1:403230996570:web:effb33dd69a756a3218063",
    measurementId: "G-JS737CP792"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  firebase.analytics();
  // Get a reference to the database service
  var database = firebase.database();

  //Get elements
  const preObject = document.getElementById('recent');

  //Create reference
  const dbRefObject = firebase.database().ref().child('recent');

}());
var ROT = 0;
function mostrecent(){
    var ref = firebase.database().ref("recent");
    ref.orderByKey().on("child_added", function(snapshot) {
        var idd = snapshot.child("img").val();
        updatebal();
        rtrans(idd);
        changeimg(idd);

    });
}
mostrecent();
function changeimg(n) {

  document.getElementById("pername").innerHTML = n;
  document.getElementById("pers").src = "https://image1213.s3.us-east-2.amazonaws.com/" + n + ".png";
}
function updatebal(){
    var ref = firebase.database().ref("recent");
    ref.orderByKey().on("child_added", function(snapshot) {
        var money = snapshot.child("money").val();

        document.getElementById("balance").innerHTML = money +".00";

    });
}
function deposit(){
    var moneyf = document.getElementById("dep").value;
    var ref = firebase.database().ref("recent");
    var ip = "";
    ref.orderByKey().on("child_added", function(snapshot) {
        var id = snapshot.child("img").val();
        var tmoney = parseInt(snapshot.child("money").val()) + parseInt(moneyf);

        ip = id;
        firebase.database().ref('recent/' + id).set({
                img: id,
                money: tmoney,
        });
        updatebal();
    });

    var time1 = Date()

    firebase.database().ref('tr/' + ip +'/').push({
            lorw: "l",
            money: "$" + moneyf,
            time: time1.toString(),
    });
    rtrans(ip);
}

function withdrawl(){
    var moneyf = document.getElementById("wit").value;
    var ref = firebase.database().ref("recent");
    var ip = "";
    ref.orderByKey().on("child_added", function(snapshot) {
        var id = snapshot.child("img").val();
        var tmoney = snapshot.child("money").val() - moneyf;

        ip = id;
        firebase.database().ref('recent/' + id).set({
                img: id,
                money: tmoney,
        });
        updatebal();
    });
    var time1 = Date()

    firebase.database().ref('tr/' + ip +'/').push({
            lorw: "w",
            money: "-$" + moneyf,
            time: time1.toString(),
    });
    rtrans(ip);
}
function loan(){
    var moneyf = document.getElementById("loan").value;
    var ref = firebase.database().ref("recent");
    var ip = "";
    ref.orderByKey().on("child_added", function(snapshot) {
        var id = snapshot.child("img").val();

        ip = id;
        updatebal();
    });
    var time1 = Date()

    firebase.database().ref('tr/' + ip +'/').push({
            lorw: "d",
            money: "$" + moneyf,
            time: time1.toString(),
    });
    rtrans(ip);
}


function rtrans(place){
    var ref = firebase.database().ref("tr/" + place);
    cleanup();
    ref.orderByKey().on("child_added", function(snapshot) {
        createPostElement(snapshot.child("money").val(), snapshot.child("time").val(),snapshot.child("lorw").val());
    });

}

function createPostElement(money, dat, lo){
    var html = '<div class = "card>' +
                        '<div class="col-sm-4 pls">' +
                          '<div id =\"' + lo +'\" class="card blue-grey darken-1">' +
                            '<div class="card-content white-text">' +
                              '<h2 style = "text-align: center;margin-top: 10px" class="card-title">' + money +".00" +'</h2>'+
                              '<hr>' +
                              '<h6> Date: ' + dat + '</p>'+
                            '</div>'+
                          '</div>'+
                        '</div>' +
                      '</div>';
    var newish = document.createElement('div');


    newish.innerHTML = html;
    if (ROT %2 == 0){
        document.getElementById("left").appendChild(newish);
    } else{
        document.getElementById("right").appendChild(newish);
    }
    ROT++;
}

function cleanup(){
    ROT = 0;
    document.getElementById("left").innerHTML = "";
    document.getElementById("right").innerHTML = "";
}
