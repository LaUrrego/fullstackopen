const Filter = ({handler, value})=> {
    return(
        <div>
            filter by name: <input value={value} onChange={handler}></input>
        </div>
    )
}

export default Filter