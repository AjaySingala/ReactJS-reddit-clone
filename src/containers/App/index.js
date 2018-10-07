import React, { Component } from 'react';
import * as firebase from "firebase";

import config from './firebase-config';

class App extends Component {
  constructor() {
    super();

    // Initialize Firebase
    firebase.initializeApp(config);
  }

  state = {
    posts: [],
    loading: true
  };


  componentWillMount() {
    // Initialize Cloud Firestore through Firebase
    var db = firebase.firestore();

    // Disable deprecated features
    db.settings({
      timestampsInSnapshots: true
    });

    let _this = this;

    // // Add a record.
    // db.collection("users").add({
    //   first: "Ada",
    //   last: "Lovelace",
    //   born: 1815
    // })
    //   .then(function (docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    //   })
    //   .catch(function (error) {
    //     console.error("Error adding document: ", error);
    //   });
    //
    // // Then read it.
    // db.collection("users").get().then((snapshot) => {
    //   snapshot.forEach((doc) => {
    //     console.log(`${doc.id} => ${doc.data().first}`);
    //   });
    // });

    let postList = [];

    db.collection("posts").get().then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().title}`);
        let item = {
          id: doc.id,
          title: doc.data().title,
          upvote: doc.data().upvote,
          downvote: doc.data().downvote
        };
        postList.push(item);
      });

      _this.setState({
        posts: postList,
        loading: false
      });
    });

    // // Original code. Not working.
    //let postsRef = firebase.database().ref('posts');

    // postsRef.on('value', function (snapshot) {
    //   console.log(snapshot.val());

    //   _this.setState({
    //     posts: snapshot.val(),
    //     loading: false
    //   });
    // });
  }

  render() {
    return (
      <div className="App">
        {this.props.children && React.cloneElement(this.props.children, {
          //firebaseRef: firebase.database().ref('posts'),
          db: firebase.firestore(),
          posts: this.state.posts,
          loading: this.state.loading
        })}
      </div>
    );
  }
}

export default App;


// import React, { Component } from 'react';
// import * as firebase from "firebase";

// import config from './firebase-config';

// class App extends Component {
//   constructor() {
//     super();

//     // Initialize Firebase
//     firebase.initializeApp(config);
//   }

//   state = {
//     posts: [],
//     loading: true
//   };

//   componentWillMount() {
//     let postsRef = firebase.database().ref('posts');

//     let _this = this;

//     postsRef.on('value', function(snapshot) {
//       console.log(snapshot.val());

//       _this.setState({
//         posts: snapshot.val(),
//         loading: false
//       });
//     });
//   }

//   render() {
//     return (
//       <div className="App">
//         {this.props.children && React.cloneElement(this.props.children, {
//           firebase: firebase.database(),
//           posts: this.state.posts,
//           loading: this.state.loading
//         })}
//       </div>
//     );
//   }
// }

// export default App;
