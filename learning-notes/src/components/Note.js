const Note = ({note, toggleImportance}) => {
    const label = note.important ? "make unimportant" : "make important"

    return(
        <div>
            <li>{note.content}</li>
            <button onClick={toggleImportance}>{label}</button>
        </div>
    )
}

export default Note