import { useId, forwardRef } from "react";

function Select({
    label,
    options=[],
    className="",
    ...props
}, ref) {

    const id = useId()

    return ( 
        <div>
            {label ? <label className={`${className}`} htmlFor={id}>{label}</label> : null}
            <select className={`${className}`} id={id} {...props} ref={ref} >
                {options?.map( option => (
                    <option value={option} key={option}>{option}</option>
                ) )}
            </select>
        </div>
     );
}

export default forwardRef(Select);