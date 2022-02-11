import { db } from "../firebase";

import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";

const messageCollectionRef = collection(db, "messages");
class MessageDataService{
    addMessages = (newMessage) => {
        return addDoc(messageCollectionRef, newMessage);
    };

    updateMessage = (id, updateMessage) =>{
        const messageDoc = doc(db, "messages" , id);
        return updateDoc(messageDoc, updateDoc);  
    };

    deleteMessage = (id) =>{
        const messageDoc = doc(db,"messages", id);
        return deleteDoc(messageDoc);
    };
    getAllMessages = () =>{
            return getDocs(messageCollectionRef);
    };

    getMessage = (id) =>{
        const messageDoc = doc(db, "messages", id);
        return getDocs(messageDoc);
    };
}


export default new MessageDataService();