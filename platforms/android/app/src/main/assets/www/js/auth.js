/**
 * Handles the sign in button press.
 */
function toggleSignIn() {
  var email = $$('#email').val();
  var password = $$('#password').val();

  if (email.length < 4) {
    app.dialog.alert('Please enter an email address.', '');
    clearPW();
    return;
  }
  if (password.length < 4) {
    app.dialog.alert('Please enter a valid password.', '');
    clearPW();
    return;
  }

  // Sign in with email and pass.
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
    // Waits for sign in promise to return success.

    refreshEventPage(); // Checks whether to refresh UI by club or month.
    loginScreen.close({animate: true}); // Close login screen.

  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      app.dialog.alert('Wrong password.', '');
    } else {
      alert(errorMessage);
    }
    console.log(error);

    // On error clear password input.
    clearPW();
  });
}


/**
 * Handles the sign up button press.
 */
function handleSignUp() {
  var email = $$('#new-email').val();
  var password = $$('#new-password').val();
  var confirm = $$('#confirm-password').val();

  if (password.length < 4) {
    app.dialog.alert('Your password is too short.', 'NEST+m Event Tracker');
    clearCreatePW()
    return;
  }

  if (password != confirm) {
    app.dialog.alert('Your passwords do not match.', 'NEST+m Event Tracker');
    clearCreatePW()
    return;
  }

  // Create new account with email and pass.
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: $$('#new-name').val(),
    }).then(function() {
      console.log("displayName added");
    }).catch(function(error) {
      console.log(error);
    });

    // Semd email verification for new users.
    sendEmailVerification();
    authorizationScreen.open({animate: true}) // Opens auth screen.

  }, function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
        app.dialog.alert('The password is too weak.', 'NEST+m Event Tracker');
    }
    else {
      alert(errorMessage);
    }
    console.log(error);

    // On error clear input fields.
    clearCreatePW();
  });
}


/**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
  firebase.auth().currentUser.sendEmailVerification().then(function() {
    app.dialog.confirm('Email Authorication Sent', 'NEST+m Event Tracker')
  });
}

function sendPasswordReset() {
  var email = document.getElementById('email').value;
  firebase.auth().sendPasswordResetEmail(email).then(function() {
      app.dialog.alert('Password Reset Email Sent!', 'NEST+m Event Tracker');
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/invalid-email') {
        app.dialog.alert('That email is not valid.', 'NEST+m Event Tracker');
    }
    else if (errorCode == 'auth/user-not-found') {
        app.dialog.alert('That user is not found.', 'NEST+m Event Tracker');
    }
    console.log(error);
  });
}
/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
  // Listening for auth state changes.
  firebase.auth().onAuthStateChanged(function(user) {

    // If user is signed in.
    if (user) {

      app.user = user

      firebase.database().ref("admins/" + user.uid).once("value", (snapshot) => {
         var admin = snapshot.val();
         if (admin == user.email){
             user.admin = true;
           } else {
             user.admin = false;
           }
         })

      loginScreen.close({
        animate: true
      });

      if (!user.emailVerified) {
        authorizationScreen.open({
            animate: true
          });
      }
      else {
        getMyEvents();
      }
    }
    else {
      // User is signed out.
      console.log("Signed Out");
      // Call login screen
      loginScreen.open({
        animate: true
      });
    }


  });
}

console.log(app.user)
// get event notification roomInfo
// make a list of my events
function getMyEvents() {
  var myEvents = [];
  var myEventKeys = [];
  var dateMyEventAdded = [];
  var myEventInfo = [];

  var myEventData;
  myEventsRef.orderByKey().equalTo(app.user.uid).limitToFirst(1).on("child_added", function(snapshot) {
    myEventData = snapshot.val();

    for (var key in myEventData) {
      myEvents.push(myEventData[key].eventkey);
      myEventKeys.push(key);
      dateMyEventAdded.push(myEventData[key].dateadded);
      myEventInfo.push(myEventData[key]);
    }

    // 0 index is the key of the event, 1 index is the key of my event, 2 is date my event added
    app.user.events = [myEvents, myEventKeys, dateMyEventAdded, myEventInfo];
    getNotifications();
  })
}

function continueIndex() {
  loginScreen.open({
      animate: true
    });
}

function confirmOk() {
  app.dialog.confirm('Are you sure you want to log out?', 'NEST+m Event Tracker', function() {
    firebase.auth().signOut();
    loginScreen.open({
        animate: true
      });
  });
}

function clearPW() {
  $$('#password').val("");
}

function clearCreatePW() {
  $$('#confirm-password').val("");
  $$('#new-password').val("");
}
