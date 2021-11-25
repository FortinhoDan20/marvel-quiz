import React, { Component } from "react"; 
import Levels from "../Levels"
import { QuizMarvel } from "../quizMarvel";
import ProgressBar from "../ProgressBar";

class Quiz extends Component {

  state = {
    levelNames : ["debutant","confirme","expert"],
    quizLevel: 0,
    maxQuestions: 10,
    storedQuestions: [],
    question: null,
    options: [],
    idQuestion: 0,
    btnDisabled: true,
    userAnswer: null,
    score: 0

  }
  loadQuestions = level => {
    const fetchedArrayQuiz = QuizMarvel[this.state.idQuestion].quizz[level]

    if(fetchedArrayQuiz.length <= this.state.maxQuestions) {
       const newArray = fetchedArrayQuiz.map(({ answer, ...keepRest}) => keepRest)

       this.setState({
         storedQuestions:newArray
       })
    }else {
      console.log('Pas assez de questions')
    }
  }

  componentDidMount() {
    this.loadQuestions(this.state.levelNames[this.state.quizLevel])
  }

  componentDidUpdate(prevProps, prevState) {

    if(this.state.storedQuestions !== prevState.storedQuestions){
      this.setState({
        question:this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options
      })
    }
  }

  submitAnswer = option => {
    this.setState({
      userAnswer: option,
      btnDisabled: false
    })

  }

  nextQuestion = () => {
    if(this.state.idQuestion === this.state.maxQuestions - 1){

    }else {
      this.state(prevState => ({
        idQuestion: prevState.idQuestion + 1
      }))
    }
  }

  render() {

      const { pseudo } = this.props.userData

      
       const option = this.state.options.map((option, index) => {
          return(
            <p 
              key={index} 
              className={`answerOptions ${this.state.userAnswer === option ? "selected" : null} `}
              onClick={() => this.submitAnswer(option)}
            >
              {option}
            </p>
          )
        })

    return (
     <div>

       <h2>Pseudo: { pseudo} </h2>
       <Levels/>
       <ProgressBar/>
       <h2>{this.state.question}</h2>

        {option}
       <button disabled={this.state.btnDisabled} onClick={this.nextQuestion} className="btnSubmit">Suivant</button>
     </div>
    );
  }
}

export default Quiz;