import * as firebase from "firebase";
const _firebase = firebase.default;

var firebaseConfig = {
  apiKey: "AIzaSyBCD0qieqjbP8gC4XETRy0MduE0QCuXBqc",
  authDomain: "pico-rainbow.firebaseapp.com",
  databaseURL: "https://pico-rainbow-default-rtdb.firebaseio.com",
  projectId: "pico-rainbow",
  storageBucket: "pico-rainbow.appspot.com",
  messagingSenderId: "786470097259",
  appId: "1:786470097259:web:b1c6cd98d9fa19c183bc2e",
  measurementId: "G-Z6EX7P85DW",
};

class Firebase {
  firebase;
  database;
  roomRef;
  currentUserId;

  constructor(roomID) {
    this.firebase = _firebase?.apps?.length
      ? _firebase.app()
      : _firebase?.initializeApp(firebaseConfig);
    this.database = this.firebase.database();
    this.roomRef = this.database.ref().child(`room-${roomID}`);
  }

  onCursorPositionChanged = ({ x, y }) => {
    // console.log("send position: ", this.currentUserId);
    if (!this.currentUserId) {
      return;
    }
    this.roomRef
      .child(`users/${this.currentUserId}`)
      .set({ id: this.currentUserId, x, y });
    this.roomRef.child(`users/${this.currentUserId}`).onDisconnect().remove();
  };

  monitorCursors = (cb) => {
    this.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;

        this.currentUserId = uid;
        this._monitorCursors(cb);
      } else {
      }
    });

    this.firebase.auth().signInAnonymously();
  };

  _monitorCursors = (cb) => {
    this.roomRef.child("users").once("value", (snap) => {
      snap.forEach((item) => {
        if (item.key === this.currentUserId) {
          return;
        }
        cb("add", item.key, item.val());
      });
    });

    this.roomRef.child("users").on("child_added", (snap) => {
      if (snap.key === this.currentUserId) {
        return;
      }

      cb("add", snap.key, snap.val());
    });
    this.roomRef.child("users").on("child_changed", (snap) => {
      if (snap.key === this.currentUserId) {
        return;
      }

      cb("change", snap.key, snap.val());
    });

    this.roomRef.child("users").on("child_removed", (snap) => {
      cb("remove", snap.key);
    });
  };

  monitorDocument = (cb) => {
    this._monitorDocument(cb);
    // this.firebase.auth().signInAnonymously();
  };
  _monitorDocument = (cb) => {
    this.roomRef.child("document").on("value", (snap) => {
      cb("change", snap.val());
    });
  };
  onDocumentChanged = (document) => {
    // console.log("send doc: ", document);
    this.roomRef.child(`document`).set(document);
  };
  leaveRoom = () => {
    this.roomRef.child(`users/${this.currentUserId}`).remove();
  };
  disconnect = () => {
    this.roomRef.off();
  };
}

const getFirebaseInstance = (roomID) => {
  return new Firebase(roomID);
};

export { getFirebaseInstance };
