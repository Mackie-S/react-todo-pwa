import firebase from "firebase";
import { db } from "./firebase";

export const initGet = async (uid) => {
  const todo = await db.collection("todo")
  .orderBy("createdAt", "desc")
  .where("uid", "==", uid);

  return todo.get().then((snapShot) => {
    let todos = [];
    snapShot.forEach((doc) => {
      console.log(doc);
      console.log(doc.data());
      todos.push({
        id: doc.id,
        content: doc.data().content,
        isComplete: doc.data().isComplete,
      });
    });
    return todos;
  });
};

export const addTodo = (content, uid) => {
  db.collection("todo").add({
    content: content,
    uid: uid,
    isComplete: false,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(), // firebaseのサーバーの時間を反映
  });
};

export const todoDelete = (id) => {
  db.collection("todo").doc(id).delete();
}

export const toggleComplete = async (id) => {
  const todo = await db.collection("todo").doc(id).get();
  return db.collection("todo").doc(id).update({
    // もしチェックされたToDoが未完了ならisCompleteをtrue
    // もしチェックされたToDoが完了ならisCompleteをfalse
    // if (todo.data().isComplete) のように括弧内に判断値を入れない場合はtrue or falseで判定してくれるので便利
    isComplete: todo.data().isComplete ? false : true,
  });
}
