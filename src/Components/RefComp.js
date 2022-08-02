import React, { useEffect } from 'react';
import { useRef } from 'react';



const RefComp = () => {
    const inputRef = useRef(null)

    console.log(inputRef)


  useEffect(()=>{
   inputRef.current.focus()
  },[])


  return (
    <div>
      <input ref={inputRef} />
      <button>Click</button>
    </div>
  )
}

export default RefComp
