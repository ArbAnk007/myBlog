import "../styles/Input.css"
import { forwardRef, useId } from "react";

const Input = forwardRef( function Input({
    label,
    type="text",
    classname="",
    ...props
}, ref)  {

    const id = useId()

    return (
        <div className="custom-input-container">
            {label && <label className="custom-input-label" htmlFor={id}>{label}</label>}
            <input type={type} className={`custom-input ${classname}`} {...props} id={id} ref={ref} />
        </div>
    )
} )

export default Input;