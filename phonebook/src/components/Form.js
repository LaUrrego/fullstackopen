const Form = ({nameVal, nameHandle, numVal, numHandle, submitHandle}) => {
    return(
        <form>
            <div>
                name : <input value={nameVal} onChange={nameHandle}/>
            </div>
            <div>
                phone: <input value={numVal} onChange={numHandle}></input>
            </div>
            <div>
                <button type="submit" onClick={submitHandle}>add</button>
            </div>
      </form>

    )
}
export default Form