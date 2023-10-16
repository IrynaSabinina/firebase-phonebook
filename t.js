firestore()
    .collection("users")
    .doc("gGfShU50P4MF1gE0L5aHo9SFS0h2")
    .listCollections()
    .then((subCollections) => {
        subCollections.forEach((subCollection) => {
            console.log('Found subcollection with id:', subCollection.id);
            subCollection
                .get()
                .then((array) => {
                    if(array.length == 0) {
                        console.log("No documents found in collection");
                    }

                    array.docs.forEach((doc) => {
                        console.log("Found document! Document name: ", doc.id);
                        console.log(doc.data());
                    });
                });
        });
    });




try{
    const snapShot = collection( database, "users/gGfShU50P4MF1gE0L5aHo9SFS0h2/stables");     //this function returns CollectionReference[https://firebase.google.com/docs/reference/js/v8/firebase.firestore.CollectionReference] 
    const data = await getDocs(snapShot); //Here is possible error. function getDocs expect Query as a parameter, but not the CollectionSnapshot
    console.log("data", data.empty); // this is "true"
} catch (error) {
    console.log("error", error);
}
        

const rules: "{"rules": 
{"users": {"$uid": {".read\": true, ".write": "auth != null"     }}   }}"