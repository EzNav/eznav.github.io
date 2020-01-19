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
function update(thingy, agga){
    oldtore(thingy,agga);
    
    var ref = firebase.database().ref("recent");
    ref.orderByKey().on("child_added", function(snapshot) {
        var idd = snapshot.child("img").val();
        var monies = snapshot.child("money").val();
        if (idd != thingy){
            retold(idd, monies);
        }
    });
   
}
function oldtore(id, mon){
    var ref = firebase.database().ref("old");
    var check = 0;
    ref.orderByKey().on("child_added", function(snapshot) {
        var n = snapshot.child("img").val()
        if (n == id){
            check = 1;
            firebase.database().ref('recent/' + id).set({
                img: id,
                money: snapshot.child("money").val(),
        });
        }
            
        
    });
    if (check == 0){
        firebase.database().ref('recent/' + id).set({
                img: id,
                money: mon,
        });
    }
}
function retold(id, mon){
    var check = 0;

    firebase.database().ref('old/' + id).set({
            img: id,
            money: mon,
    });

    firebase.database().ref("recent/"+id).remove();
}

function rimp(money){
    
}


function dimp(money){
    
}
function ndata(nam){
    
    firebase.database().ref('recent/' + nam).set({
        img: nam,
        money: 5500,
    });
    
}
function click1() {
  //ndata("loo");
  //checkifthere("yoo","100");
  update("noo",400);
  //oldtore("noo",5500)
}

function idk() {
    
  var database = firebase.database();

  var objectRef = database.ref('object');
  objectRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
    });
  });
}
