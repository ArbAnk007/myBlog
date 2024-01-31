import "../styles/DefaultBtn.css"

function DefaultBtn({
    children,
    className="",
    ...props
}) {
    return ( 
        <button className={`default-btn ${className}`} {...props}>{children}</button>
     );
}

export default DefaultBtn;