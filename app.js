var firebaseConfig = {
    apiKey: "AIzaSyDKeTh5Y-EBF25AHc1beqQ4Fbkfg0kpasM",
    authDomain: "web-quickstart-55ba1.firebaseapp.com",
    databaseURL: "https://web-quickstart-55ba1.firebaseio.com",
    projectId: "web-quickstart-55ba1",
    storageBucket: "web-quickstart-55ba1.appspot.com",
    messagingSenderId: "240895900923",
    appId: "1:240895900923:web:ec4344a868938b4784045e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore()

const docRef = firestore.doc('samples/sandwich-data')
const outputHeader = document.querySelector('#hotDogOutput')
const inputTextField = document.querySelector('#latestHotDogStatus');
const saveButton = document.querySelector('#saveButton')
const loadButton = document.querySelector('#loadButton')

saveButton.addEventListener('click', function () {
    const textToSave = inputTextField.value;
    console.log("I am going to save " + textToSave + ' to Firestore');
    docRef.set({
        hotDogStatus: textToSave
    }).then(function () {
        console.log('Status saved!')
    }).catch(function (error) {
        console.log('Got an error: ', error)
    })
})

loadButton.addEventListener('click', function () {
    docRef.get().then(function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data();
            outputHeader.innerText = 'Hot dog status: ' + myData.hotDogStatus;
        }
    }).catch(function (error) {
        console.log('Got an error: ', error)
    })
})

getRealtimeUpdates = function () {
    docRef.onSnapshot(function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data();
            console.log('Check out this Document I recieved ', doc)
            outputHeader.innerText = 'Hot dog status: ' + myData.hotDogStatus;
        }
    })
}

getRealtimeUpdates()