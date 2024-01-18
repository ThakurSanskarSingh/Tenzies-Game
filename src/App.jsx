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


    useEffect( ()=> {
     const allHeld = dice.every(die => die.isHeld)
     const firstValue = dice[0].value
     const allSameValue = dice.every(die => die.value === firstValue)
     if(allHeld && allSameValue){
      setTenzies(true)
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
  <button onClick={Roll} className='roll-dice'> {Tenzies ? "New Game" : "Roll"}</button>

     </main>

    
      
         
  )
}

export default App
