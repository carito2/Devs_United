
import firestore from "../firebase/firebase";


const getIdUser = (userProfile) => {
    return (
    firestore
        .collection("usersProfile").where("uid", "==", userProfile.uid)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => doc.id);                    
        })
    )
}

export default getIdUser;

