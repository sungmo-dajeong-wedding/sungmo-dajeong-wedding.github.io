import { db } from "./firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export type GuestbookItem = {
  id: string;
  name: string;
  message: string;
  password: string;
  createdAt?: any;
};

export async function addGuestbook(name: string, message: string, password: string) {

  await addDoc(collection(db, "guestbook"), {
    name,
    message,
    password,
    createdAt: serverTimestamp()
  });

}


// export async function getGuestbook(): Promise<GuestbookItem[]> {
//   const q = query(collection(db, "guestbook"), orderBy("createdAt", "desc"));
//   const snapshot = await getDocs(q);

//   return snapshot.docs.map((doc) => {
//     const data = doc.data();

//     return {
//       id: doc.id,
//       name: data.name,
//       message: data.message
//     };
//   });
// }

export function subscribeGuestbook(callback: (data: GuestbookItem[]) => void) {

  const q = query(
    collection(db, "guestbook"),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {

    const data: GuestbookItem[] = snapshot.docs.map((docu) => {
      const d = docu.data();

      return {
        id: docu.id,
        name: d.name,
        message: d.message,
        password: d.password,
        createdAt: d.createdAt
      };
    });

    callback(data);
  });

  return unsubscribe;
}

export async function deleteGuestbook(id: string) {
  await deleteDoc(doc(db, "guestbook", id));
}