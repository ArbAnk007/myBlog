import "../styles/Select.css"
import { useId, forwardRef } from "react";

function Select({
    label,
    options=[],
    className="",
    ...props
}, ref) {

    const id = useId()

    return ( 
        <div className="select-container">
            {label ? <label className={`${className}`} htmlFor={id}>{label}</label> : null}
            <select className={`${className}`} id={id} {...props} ref={ref} >
                {options?.map( option => (
                    <option value={option[0]} key={option[0]}>{option[1]}</option>
                ) )}
            </select>
        </div>
     );
}

export default forwardRef(Select);