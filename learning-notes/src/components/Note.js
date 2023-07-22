const Note = ({note, toggleImportance, remove}) => {
    const label = note.important ? "make unimportant" : "make important"

    return(
        <div>
            <li>{note.content}</li>
            <button onClick={toggleImportance}>{label}</button>
            <button onClick={remove} >delete note</button>
        </div>
    )
}

export default Note