function getNotifications() {
  // get value by key
  var notedate = 0;
  var plural = '';
  var clubs = '';
  var clubnum = 0;
  var notification;
  var a = 'a ';
  var myNotifications = [];
  var myNoteKeys = [];
  var myEvents = app.user.events[0];
  var myEventKeys = app.user.events[1];
  var dateMyEventAdded = app.user.events[2];
  var myEventInfo = app.user.events[3];

  // for each event in myevents, check for notifications by event key
  for (var i = 0; i < myEvents.length; i++) {
    eventsRef.orderByKey().equalTo(myEvents[i]).limitToFirst(1).on("child_added", function(snapshot) {
      var eventData = snapshot.val();

      // if there are notifications
      if (typeof eventData.notifications != 'undefined') {
        for (var noteKey in eventData.notifications) {

          // when a notification is deleted it is no longer undefined
            if (eventData.notifications[noteKey].datenow > dateMyEventAdded[i] & (typeof myEventInfo[i][noteKey] == 'undefined')) {
              eventData.notifications[noteKey].title = eventData.name;
              eventData.notifications[noteKey].myeventkey = myEventKeys[i];
              var datenow = eventData.notifications[noteKey].datenow;
              eventData.notifications[noteKey].datenow = timeSince(datenow);

              myNotifications.push(eventData.notifications[noteKey]);
              myNoteKeys.push(noteKey);

              if (!sessionStorage[noteKey]) {
              // check that clubs doesn't already contain this club & this notificaiton not already screen
              // prepares the pop up notification
                if (!clubs.includes(eventData.club)) {
                  if (clubnum > 0) {
                    clubs += ', ';
                  }
                  clubs += eventData.club;
                }
                clubnum++;

                // so that pop up doesn't continue the entire day
                sessionStorage[noteKey] = true;
                if (typeof eventData.lastnote != 'undefined') {
                  notedate = Math.max(notedate, eventData.lastnote);
                }
            }
          }

            if (i == myEvents.length - 1) {
              if (clubnum > 1) {
                plural = 's';
                a = '';
              }

              if (clubnum > 0){
                  notification = {
                  title: clubs,
                  titleRightText: timeSince(notedate),
                  subtitle: 'You have ' + a + ' new notification' + plural,
                  text: 'Please check the notifications menu',
                  closeButton: true,
                };
                var myNotification = app.notification.create(notification);
                myNotification.open();
                myNotification.on('click', function() {
                  app.router.navigate('/mynotifications/')
                  myNotification.close();
                })
              }
            }
          }
        }

    })
  }
  app.user.notifications = [myNotifications, myNoteKeys];


  setNotificationsCount();
}

function setNotificationsCount() {
  var numberNotifications = app.user.notifications[0].length;
  var numberSpan = (numberNotifications > 0) ? "<span class='badge color-red'>" + numberNotifications + "</span>": "";
  $$('#numberNotifications').html(numberSpan);
}

function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  if (interval == 1) {
    return "1 day ago";
  }
  interval = Math.floor(seconds / 3600);
  var daysOfWeek = ["Sun ", "Mon ", "Tue ", "Wed ", "Thu ", "Fri ", "Sat "];
  var weekday;
  if (interval > 5) {
    var d = new Date(date);
    var hours = d.getHours();
    var ampm;
    if (hours > 11 && hours != 24) {
      ampm = " PM";
    }
    else {
      ampm = " AM";
    }
    if (hours > 12) {
      hours -= 12;
    }
    weekday = d.getDay();
    if (weekday == new Date().getDay()){
      weekday = "";
    }
    else {
      weekday = daysOfWeek[weekday];
    }
    var minutes = d.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return weekday + hours+ ':' + minutes + ampm;
  }
  if (interval >= 1) {
    return interval + "h ago";
  }

  interval = Math.floor(seconds / 60);
  if (interval > 15) {
    return interval + "m ago";
  }
  return "now";
}
