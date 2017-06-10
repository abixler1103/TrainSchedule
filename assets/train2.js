var config = {
    apiKey: "AIzaSyDI2z0VEnzCRk7Abqlsj3asn5MahxftaCY",
    authDomain: "trainschedule-5612b.firebaseapp.com",
    databaseURL: "https://trainschedule-5612b.firebaseio.com",
    projectId: "trainschedule-5612b",
    storageBucket: "trainschedule-5612b.appspot.com",
    messagingSenderId: "973332768316"
};
firebase.initializeApp(config);


var database = firebase.database();

// 2. Button for adding Employees
$("#addTrain").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#firstTrain-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding employee data
    var train = {
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    // Uploads employee data to the database
    database.ref().push(train);

    // Logs everything to console
    console.log("Train name " + name);
    console.log("Destination" + destination);
    console.log("First train time " + firstTrain);
    console.log("Frequency " + frequency);

    // Alert
    alert("New Train successfully added");

    // Clears all of the text-boxes
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;

    // Train Info
    // console.log(name);
    // console.log(destination);
    // console.log(firstTrain);
    // console.log(frequency);

    var currentTime = moment();
    console.log("Current time " + moment(currentTime).format("hh:mm"));

    var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "days");

    timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Difference in time: " + timeDiff);

    var remainder = timeDiff % frequency;
    console.log("Remainder: " + remainder);

    var minsUntilTrain = frequency - remainder;
    console.log("Time till Train: " + minsUntilTrain);

    var nextTrainTime = moment().add(minsUntilTrain, "minutes");
    console.log("Next arrival: " + moment(nextTrainTime).format("hh:mm"));

    // Prettify the employee start
    // var nextArrival = moment.unix(nextArrival).format("MM/DD/YY");

    // //     // Calculate the months worked using hardcore math
    // //     // To calculate the months worked
    // var minAway = moment().diff(moment.unix(nextArrival, "X"), "months");
    // console.log(minAway);



    //     // Add each train's data into the table
    $("#schedule > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
        frequency + "</td><td>" + moment(nextTrainTime).format("hh:mm") + "</td><td>" + minsUntilTrain + "</td></tr>");
});
