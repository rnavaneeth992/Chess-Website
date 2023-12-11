import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faLock, faPlay } from '@fortawesome/free-solid-svg-icons'

const ModuleBtn = ({name, status, myIndex, selectModule}) => {

 if (status === "locked") {
  return (
    <li className='hscroll-li'><button className='bg-purple-300 text-white rounded py-2 px-4 inline-flex space-x-4 items-center' disabled> <FontAwesomeIcon icon={faLock} /> <span className=' text-white'>{name}</span></button></li>
  )
 } else if (status === "complete") {
    return (
        <li className='hscroll-li'><button className='bg-[#14A44D] text-white hover:opacity-90 rounded py-2 px-4 inline-flex space-x-4 items-center' onClick={() =>{selectModule(myIndex)}}> <FontAwesomeIcon icon={faCheck} /> <span className=' text-white'>{name}</span></button></li>
      )
 } else {
    return (
        <li className='hscroll-li'><button className='bg-primary text-white hover:opacity-90 rounded py-2 px-4 inline-flex space-x-4 items-center' onClick={() => selectModule(myIndex)}> <FontAwesomeIcon icon={faPlay} /><span className=' text-white'>{name}</span></button></li>
      )
 }

}

export default ModuleBtn