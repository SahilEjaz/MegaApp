import { useId , forwardRef} from "react"
import React  from 'react'

const Input = React.forwardRef(function input({
    label,
    type= "text",
    className= "",
    ...props
},ref)


{
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1" htmlFor={id}'>
                {label}
                </label>}
                <Input
                type= {type}
                className={`px-3 py-2 rounded-lg bg-white text-black w-full border-gray-200 outline-none duration-200${className}`}
                ref={ref}
                {...props}
                id={id}
                
                /> 
        </div>
        
    )
})

export default Input