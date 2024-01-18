import React from 'react'

 export function Die (props) {
const styles = {
   backgroundColor : props.isHeld ? "#59E391" : "white"
}
    return(
       <div
        className='die-faces'
         style={styles}
          onClick={props.holdDice}
          >

        <h2 className='die-num'>{props.value} </h2>
       </div> 
    )
}
export default Die
