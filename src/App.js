import Die from "./Die"
import "./index.css"
import React from"react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import { click } from "@testing-library/user-event/dist/click"
export default function App() {

  const[dice,setDice]=React.useState(allNewDice)
  const [tenzies, setTenzies]=React.useState(false)
  function generateNewDie(){
    return{
      value: Math.ceil(Math.random()*6),
       isHeld:false, 
       id: nanoid()
    }
    
  }
  function allNewDice(){
    const newNum=[]
    for (let i = 0; i < 10; i++) {
      newNum.push(generateNewDie()) 
    }
   return newNum
  }

  function Roll(){
    if(tenzies===true){ 
      setTenzies(prev=>(!prev))
      setDice(allNewDice)
    }
      else{
        setDice(prev=>prev.map(die=>{
          return die.isHeld? die: generateNewDie()  
        }))
      }
    
  
  }
 const[clickno, setclickno]=React.useState(0)
//  const set=()=>{
//   setclickno(clickno++)
//  }

  function holdDice(id){
    setDice(prev=>prev.map(die=>{
      return die.id==id?{...die,isHeld:!die.isHeld} : die
    }))
    dice.forEach(die=>{
      (die.isHeld===true)?setclickno(clickno++):setclickno(clickno--)
    })
   }
    
   
   
   React.useEffect(()=>{
       const allheld=dice.every(die=> die.isHeld)
       const firstvalue=dice[0].value
       const allsamevalue=dice.every(die => die.value===firstvalue)
       if (allheld && allsamevalue) {
         setTenzies(true)
         console.log("you won")
       }
      },[dice])

   const [button,setButton]=React.useState("Roll")

    React.useEffect(()=>{
      if (tenzies=== true) {
        setButton("New Game")
      }
      else{
        setButton("Roll")
        
      }
    })


   

  const diceElements= dice.map(die=><Die value={die.value} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)}/>)
  return (
    <main>
      {tenzies && <Confetti/> }
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container" >
        {diceElements}  
      </div>
      <button className="roll-dice" onClick={Roll}>{button}</button>
      <div>
      <span className="clicks">clicks:</span><span className="clickcount">{clickno}</span>
      </div>
    </main>
  );
}

