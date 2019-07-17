// Init Firebase
var config = {
  apiKey: "AIzaSyAl9CIcgX9BWX5WvM8hd_W-PcGnLhilmBk",
  authDomain: "nestmevents.firebaseapp.com",
  databaseURL: "https://nestmevents.firebaseio.com",
  projectId: "nestmevents",
  storageBucket: "",
  messagingSenderId: "300143900987"
};
var fbApp = firebase.initializeApp(config);

auth = firebase.auth();
db = fbApp.database();

var eventsRef = db.ref("events");
console.log("eventsRef: " + eventsRef);

var clubsRef = db.ref("clubs");
console.log("eventsRef: " + clubsRef);

var myEventsRef = db.ref("myevents");
console.log("myeventsRef: " + myEventsRef)

// Dom7
var $$ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
  id: 'io.framework7.testapp',
  root: '#app',
  domCache: true,
  xhrCache: false,
  theme: theme,
  routes: routes,
  navbar: {
   hideOnPageScroll: true,
   showOnPageScrollTop: true,
   scrollTopOnTitleClick: true,
   showOnPageScrollEnd: true
 },
  statusbar: {
    enabled: true,
    overlay: true,
    iosTextColor: 'white',
    iosBackgroundColor: '#7B1FA2',
    iosOverlaysWebView: true,
    scrollTopOnClick: true,
  },
  panel: {
     swipe: 'left',
   },
   input: {
    scrollIntoViewOnFocus: true,
    scrollIntoViewCentered: true,
  },
  touch: {
    tapHold: true,
    tapHoldDelay: 750
  }
});

var loginScreen = app.loginScreen.create({
  el: '.login'
})

var signupScreen = app.popup.create({
  el: '.signup'
})






/*
$$(document).on('page:init', '.page[data-name="profile"]', function (e) {
  //$$('#profile_name').html(app.user.displayName);
  //app.router.refreshPage()
})

var createAccountScreen = app.popup.create({
  el: '.create-account-screen',
  on: {
    opened: function () {
      console.log('Create Account Screen opened')
    }
  }
})

var authorizationScreen = app.popup.create({
  el: '.authorization-screen',
  on: {
    opened: function () {
      console.log('Authorization Screen opened')
    },
  }
})
*/
