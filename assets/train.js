    var config = {
        apiKey: "AIzaSyDI2z0VEnzCRk7Abqlsj3asn5MahxftaCY",
        authDomain: "trainschedule-5612b.firebaseapp.com",
        databaseURL: "https://trainschedule-5612b.firebaseio.com",
        projectId: "trainschedule-5612b",
        storageBucket: "trainschedule-5612b.appspot.com",
        messagingSenderId: "973332768316"
    };
    firebase.initializeApp(config);

    var dataRef = firebase.database();

    // Initial Values
    var name = "";
    var destination = "";
    var firstTrain = 0;
    var frequency = 0;

    // Capture Button Click
    $("#addTrain").on("click", function(event) {
        event.preventDefault();

        // YOUR TASK!!!
        // Code in the logic for storing and retrieving the most recent user.
        // Don't forget to provide initial data to your Firebase database.
        name = $("#name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrain = $("#firstTrain-input").val().trim();
        frequency = $("#frequency-input").val().trim();

        // Code for the push
        dataRef.ref().push({

            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });

    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    dataRef.ref().on("child_added", function(childSnapshot) {

        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().firstTrain);
        console.log(childSnapshot.val().frequency);
        // console.log(childSnapshot.val().joinDate);


    });

    //Handle the errors

    function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    }

    dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

        // Change the HTML to reflect
        $("#trainName").html(snapshot.val().name);
        $("#destination").html(snapshot.val().destination);
        $("#frequency").html(snapshot.val().frequency);
        // $("#nextArrival").html(snapshot.val().comment);
        // $("#minAway").html(snapshot.val().comment);
    });
