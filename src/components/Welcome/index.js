import React,{useState, useEffect, useContext, Fragment} from 'react'
import { FirebaseContext } from '../Firebase'
import { useNavigate } from "react-router-dom"
import Logout from '../Logout'
import Quiz from '../Quiz'

const Welcome = () => {

    const firebase = useContext(FirebaseContext)

    let history = useNavigate()

    const [userSession, setUserSession] = useState(null)
    const [userData, setUserData] = useState({})

    useEffect(() => {
    
        //ça va gerer l'authentification s'il est connecté ou pas
     let listenner = firebase.auth.onAuthStateChanged(user => {
          user ? setUserSession(user) : history('/')
      })

      if (!!userSession) {
        firebase.user(userSession.uid)
        .get()
        .then( doc => {
            if (doc && doc.exists) {
                const myData = doc.data();
                setUserData(myData)
            }
        })
        .catch( error => {
            console.log(error);
        })
    } 

      return() => {
          listenner()
      }
    }, [firebase, history, userSession]);

    return userSession === null ? (
        <Fragment>
            <div className="loader">
                
            </div>
        </Fragment>
    ) : (
        <div className="quiz-bg">
        <div className="container">
            <Logout />
            <Quiz userData={userData}/>
        </div>
    </div>
    )
}

export default Welcome
