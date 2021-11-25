import app from "firebase/compat/app"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const config = {
    apiKey: "AIzaSyDiJv0u6D4Iang9HRMZ9hwGWiT1nQReBKE",
    authDomain: "marvel-quiz-74d97.firebaseapp.com",
    projectId: "marvel-quiz-74d97",
    storageBucket: "marvel-quiz-74d97.appspot.com",
    messagingSenderId: "283460402970",
    appId: "1:283460402970:web:6f2481b2d0e49a016cb6a3"
  }

class Firebase {
    constructor(){
        app.initializeApp(config)
        this.auth = app.auth()
        this.db = app.firestore()

    }
    //Inscription
    signupUsers  = (email, password) => this.auth.createUserWithEmailAndPassword(email, password)

    //Connexion

    singinUsers = (email, password) => this.auth.signInWithEmailAndPassword(email, password)

    //Déconnexion

    loggedOutUsers = () => this.auth.signOut()

      // Récupérer le mot de passe
      passwordReset = email => this.auth.sendPasswordResetEmail(email); 

    // firestore
    user = uid => this.db.doc(`users/${uid}`)
    
}
export default Firebase