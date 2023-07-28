const Notification = ({message, type}) => {
    
    const alertType = type === "error"? "error":"alert"

    if (message === null) {
        return null
    }
    return (
        <div className={alertType}>
            {message}
        </div>
    )
}

export default Notification