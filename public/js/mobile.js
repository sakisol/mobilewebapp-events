//mobile.js

console.log(events);

//Upon re-load: this will hide all of the other pages and only show the landing page

var allPages = document.getElementsByClassName("page");

for (var i = 0; i < allPages.length; i++) {
  allPages[i].style.display = "none"; //hide all pages
}

document.getElementById("index").style.display = "block"; //show only the landing page

var elems;

function init() {
  elems = document.querySelectorAll("[data-target]");
  console.log(elems);
  for (var i = 0; i < elems.length; i++) {
    //add an event listener to each data-target
    //if click, execute the named function
    elems[i].addEventListener("click", hidePage);
  }
} //end of init function

function hidePage() {
  console.log(this);
  var value = this.getAttribute("data-target");

  //which icon is clicked
  // var divSelected = document.querySelectorAll("[data-target]:active");
  // console.log(divSelected);

  // var activePage = divSelected[0].attributes[0].value;
  //which page is selected
  // console.log(activePage);

  var allPages = document.getElementsByClassName("page"); //all div have the class name "page" assigned

  for (var i = 0; i < allPages.length; i++) {
    allPages[i].style.display = "none"; //hide all pages
  }
  document.getElementById(value).style.display = "block";
  // document.getElementById(value).style.display = "block"; //only show the active/selected page//activePage is an ID
} //end of function hidePage
//   console.log ("i'm alive", e.target.getAttribute("data-target"))

init();
// hidePage();

//EVENTS PAGE//

//connect JSON object
searchEvents = events.eventList;
// var searchEvents = events;

console.log(searchEvents);

function getObjectInfo() {
  //LOOP THROUGH EVENTS OBJ//

  for (var i = 0; i < searchEvents.length; i++) {
    var eventID = searchEvents[i].id;

    var eventname = searchEvents[i].event;

    var eventstart = searchEvents[i].event_start;

    var eventend = searchEvents[i].event_end;

    var starttime = searchEvents[i].start_time;

    var endtime = searchEvents[i].end_time;

    var tagline = searchEvents[i].tagline;

    var imgpath = searchEvents[i].img;

    var img2 = searchEvents[i].img_2;

    var iframeMap = searchEvents[i].location;

    var date = eventstart + " - " + eventend;

    var time = starttime + " - " + endtime;

    console.log(eventID);

    var div = document.createElement("div");

    //assign unique event ID# to div
    div.setAttribute("data-event", eventID);

    //div style
    (div.style.borderStyle = "groove"), "inset";
    div.style.marginLeft = "3px";
    div.style.marginRight = "3px";
    div.style.marginTop = "30px";
    div.style.paddingLeft = "5px";
    div.style.paddingRight = "5px";

    //image
    var image = document.createElement("img");

    image.setAttribute("src", imgpath);
    image.setAttribute("height", "70");
    image.setAttribute("width", "70");
    image.setAttribute("alt", "no image");

    div.appendChild(image);

    document.getElementById("eventbox").appendChild(div);

    //add event name to div
    var headline = document.createElement("h5");
    var headlineInfo = document.createTextNode(eventname);

    headline.appendChild(headlineInfo);

    document.getElementById("eventbox").appendChild(headline);

    div.appendChild(headline);

    //add text from object
    var para = document.createElement("p"); //create p element
    var text = document.createTextNode(tagline);

    para.appendChild(text);

    document.getElementById("eventbox").appendChild(para);

    div.appendChild(para);

    //add date info
    var datesection = document.createElement("p");
    var dateinfo = document.createTextNode(date);

    datesection.appendChild(dateinfo);

    document.getElementById("eventbox").appendChild(datesection);

    div.appendChild(datesection);

    //    } //end of function createEventDetail

    div.addEventListener("click", function(e) {
      detailEvent(this.getAttribute("data-event"));
      //            console.log(this.getAttribute("data-event"))
    });
  }
} //end of function getObjectInfo

function detailEvent(id) {
  var selectedEvent;
  //    console.log(id);
  for (var i = 0; i < searchEvents.length; i++) {
    if (searchEvents[i].id == id) {
      selectedEvent = searchEvents[i];
    }
  }

  console.log(selectedEvent);

  document.getElementById("events").style.display = "none";
  document.getElementById("eventDetail").style.display = "block";

  document.getElementById("eventdetailbox").style.display = "block";

  //add image
  var otherimage = document.createElement("img");

  otherimage.setAttribute("src", selectedEvent.img_2);

  document.getElementById("otherimg").appendChild(otherimage);

  //add event name
  var h1 = (document.createElement("h1").innerHTML = selectedEvent.event);
  document.getElementById("eventdetailbox").append(h1);

  //add location map
  var iframe = document.createElement("iframe");

  iframe.setAttribute("src", selectedEvent.location);

  document.getElementById("map").appendChild(iframe);

  //add address info to map

  var mapbox = document.createElement("div");

  var makep = document.createElement("p");
  //    var makep2 = document.createElement("p");
  //    var makep3 = document.createElement("p");

  var ptext = document.createTextNode(selectedEvent.address.venue);

  makep.appendChild(ptext); //append the created text to the p tag

  document.getElementById("map").appendChild(mapbox); //append the created text to the p tag created to the div with the id=map

  mapbox.appendChild(makep); //append the p tag to var called makep

  //
  var linebreak = document.createElement("br"); //create linebreak
  document.getElementById("map").appendChild(linebreak); //add linebreak to div id=map

  //next line of text
  ptext = document.createTextNode(selectedEvent.address.street);

  //append next line of text to div id=map
  document.getElementById("map").appendChild(ptext);

  mapbox.appendChild(ptext);
}

getObjectInfo();

document.getElementById("footer").addEventListener("click", clearPage);

function clearPage() {
  document.getElementById("eventdetailbox").innerHTML = "";
  document.getElementById("map").innerHTML = "";
  document.getElementById("otherimg").innerHTML = "";
}

clearPage();

//CHAT//
document.getElementById("login").addEventListener("click", login);
document.getElementById("create-post").addEventListener("click", writeNewPost);

//document.getElementById("logOUT").addEventListener("click", logout);
document.getElementById("logOUTChat").addEventListener("click", logout);

getPosts();

function login() {
  // https://firebase.google.com/docs/auth/web/google-signin
  //Provider
  var provider = new firebase.auth.GoogleAuthProvider();

  //How to signin
  firebase.auth().signInWithPopup(provider); //  console.log("login")

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.

      document.getElementById("chat").style.display = "block";
      document.getElementById("loginpage").style.display = "none"; //newaddition
    } else {
      // No user is signed in.
      //      alert("You are not signed in!");
      document.getElementById("chat").style.display = "none";
    }
  });
} //end of function login

function logout() {
  firebase
    .auth()
    .signOut()
    .then(
      function() {
        // Sign-out successful.
        document.getElementById("chat").style.display = "none";

        document.getElementById("loginpage").style.display = "none";

        alert("Congrats, you have signed-out successfully!");

        document.getElementById("index").style.display = "block";
      },
      function(error) {
        // An error happened.

        alert("try again!");
      }
    );
}

function writeNewPost() {
  // https://firebase.google.com/docs/database/web/read-and-write

  //Values from HTML
  var text = document.getElementById("textInput").value; //get what is written inside the box

  var name = firebase.auth().currentUser.displayName; //path to access the username

  var objectToSend = {
    message: text + " ",
    author: name
  };

  firebase
    .database()
    .ref("test")
    .push(objectToSend);

  document.getElementById("textInput").value = "";

  console.log(objectToSend);

  // Values
  //  console.log("write");
}

function getPosts() {
  //Get messages

  firebase
    .database()
    .ref("test")
    .on("value", function(data) {
      var posts = document.getElementById("posts");

      posts.innerHTML = "";

      //     console.log(data.val());

      var messages = data.val();

      for (var key in messages) {
        //       var text = document.createElement("div");
        var text = document.createElement("tr");

        var element = messages[key];

        text.append(element.message);
        text.append(element.author);

        posts.append(text);
      }
    });

  console.log("getting posts");
}

//function getChat() {
//
//    for (var i = 0; i < document.querySelectorAll('[data-chat]').length; i++) {
//        //add an event listener to data-chat
//        //if click, execute the named function
//        document.querySelectorAll('[data-chat]')[i].addEventListener("click", addBadge);
//    }
//
//} //end of function

//    var i = 0;
//
//    function addBadge() {
//
//        i++;
//        document.getElementById('badgenum').value = i;
//        document.getElementById("badgenum").innerHTML = i;
//    }

//getChat()
//addBadge()

//END OF CHAT//
