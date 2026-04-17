import { forwardRef, useId } from "react"
import React from 'react'

 function Select({
    option,
    label,
    className='',
    ...props
}, ref) {
    const id = useId()
  return (
    <div className="w-full">
        {label && <label htmlFor={id} className=''></label>}

        <select className={`py-3 px-2 rounded-lg bg-white text-black outline-none duration-200 focus:bg-white border-gray-200 w-full ${className}`} id={id} ref={ref}{...props}>
            {option?.map((option)=>(
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
   
   
    </div>

    
  )
}

export default React.forwardRef(Select)