import React,{useState, useContext} from 'react'
import {FirebaseContext} from "../Firebase"
import {Link, useNavigate } from "react-router-dom"

const SignUp = () => {

   
    let history = useNavigate()

    const firebase = useContext(FirebaseContext)

    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword:''
    }

    const [loginData, setLoginData] = useState(data)
    const [error, setError ] = useState('')

    const handleChange = e => {
        setLoginData({...loginData, [e.target.id]: e.target.value})

    }
    const handleSubmit = e => {
         e.preventDefault()
         const {email, password, pseudo } = loginData 
         firebase.signupUsers(email, password)
         .then(authUser => {
             return firebase.user(authUser.user.uid).set({
                 pseudo,
                 email
             })
         })
         .then(() => {
            setLoginData({...data});
            history('/welcome')
            
         })
         .catch(error => {
            setError(error)
            setLoginData({...data})
         })
    }

    const { pseudo, email, password, confirmPassword } = loginData 

    const btn = pseudo === '' || email === '' || password === '' || confirmPassword === '' || password !== confirmPassword
     ? <button disabled>Inscription</button> : <button>Inscription</button>

   //gestion erreur

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
               <div className="formBoxLeftSignup">
                 
               </div>
               <div className="formBoxRight">
                    <div className="formContent">

                    {error !== '' && <span>{error.message} </span>}

                        <h2>Inscription</h2>

                        <form onSubmit={handleSubmit}>
                                <div className="inputBox">
                                    <input onChange={handleChange} value={pseudo} type="text" id="pseudo" autoComplete="off" required />
                                    <label htmlFor="pseudo" >Pseudo</label>
                                </div>
                                <div className="inputBox">
                                    <input onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required />
                                    <label htmlFor="email" >Email</label>
                                </div>
                                <div className="inputBox">
                                    <input onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required />
                                    <label htmlFor="password" >Password</label>
                                </div>
                                <div className="inputBox">
                                    <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" autoComplete="off" required />
                                    <label htmlFor="confirmPassword" >Confirmer le mot de passe</label>
                                </div>
                                {btn}
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">Déjà inscrit ? Connectez-vous</Link>
                        </div>
                    </div>
               </div>
            </div>
        </div>
    )
}

export default SignUp
