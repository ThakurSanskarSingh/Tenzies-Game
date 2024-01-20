import React, { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import Die from "./components/die.jsx"
import { nanoid } from 'nanoid'







function App() {
  function allNewDice () {
   let newDice = []
   for(let i = 0;i<10 ;i++){
    newDice.push({
       value : Math.ceil(Math.random() * 6),
        isHeld : false ,
        id : nanoid()
      })
   }
   return newDice
    }
    const [dice , setDice] = useState(allNewDice())
    const [Tenzies , setTenzies] = useState(false)
    const[second , setSecond] = useState(0)
    const[minute , setMinute] = useState(0)
    const [interValid,setInterValid] = useState(null)


  
    useEffect(() => {
     const timer = setInterval(() => {
          setSecond(second+1)
          if(second === 59) {
            setMinute(minute+1)
            setSecond(0)
          }
        }, 1000);
        setInterValid(timer)
      return ()=> clearInterval(timer)
    },[second,minute])

    const restart = () => {
       setSecond(0)
      setMinute(0)
    }
    const stop = () => {
      clearInterval(interValid)
    }


    useEffect( ()=> {
     const allHeld = dice.every(die => die.isHeld)
     const firstValue = dice[0].value
     const allSameValue = dice.every(die => die.value === firstValue)
     if(allHeld && allSameValue){
      setTenzies(true)
      stop();
      console.log("You Won")
     }
    },[dice])
    

    function Roll() {
          if(!Tenzies){
            
            setDice(oldDice => oldDice.map(
              die => {
               return die.isHeld ? die : 
               {
                 value : Math.ceil(Math.random() * 6),
                  isHeld : false ,
                  id : nanoid()
                }
                
              }
            ))
          }  else {
            restart();
            setTenzies(false)
            setDice(allNewDice())
          }
     
      
    }
    function holdDice(id) {
          setDice(oldDice => oldDice.map(
      die => {
        return die.id === id ? {...die , isHeld: !die.isHeld}: die 
      }
     ))
    }

    
    const diceElements = dice.map(die => (
    <Die key = {die.id} value = {die.value} isHeld = {die.isHeld} holdDice = {() => holdDice(die.id)}/>
    ))

  return (
   
  
  <main>
     <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. <br/>
             Click each die to freeze it at its current value between rolls.
             </p>
   
  <div className="dice-container">
    
  {diceElements}

  </div>
  <div className="time">
    <h2>Time taken : </h2>
    <h2>{minute<10? "0" + minute : minute} : {second < 10 ? "0" + second : second}</h2>
  </div>
  <button onClick={Roll} className='roll-dice'> {Tenzies ? "New Game" : "Roll"}</button>

     </main>

    
      
         
  )
}

export default App
