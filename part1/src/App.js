import {useState} from 'react'

const Button = (props) => {
  return(
    <button onClick={props.handler}>{props.name}</button>
  )
}

const StatisticsLine = (props) => {
  if (props.name === "positive") {
    return <div>{props.name} {props.value} %</div>
  }
  return (
    <div>{props.name} {props.value}</div>
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.bad === 0 && props.neutral ===0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  const allScore = props.good + props.neutral + props.bad
  const average = (props.good * 1 + props.neutral * 0 + props.bad * -1) / allScore
  const positiveFB = props.good / allScore * 100
  return (
    <div>
      <div></div>
      <StatisticsLine name="good" value={props.good}></StatisticsLine>
      <StatisticsLine name="neutral" value={props.neutral}></StatisticsLine>
      <StatisticsLine name="bad" value={props.bad}></StatisticsLine>
      <StatisticsLine name="all" value={allScore}></StatisticsLine>
      <StatisticsLine name="average" value={average}></StatisticsLine>
      <StatisticsLine name="positive" value={positiveFB}></StatisticsLine>
    </div>
  )
}


const App = ()=> {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)
  const [mostPoints, setMostPoints] = useState(0)

  const randomNumber = ()=>{
    let newSelection = Math.floor(Math.random() * (anecdotes.length - 0) + 0)
    setSelected(newSelection)
  }
  
  const incPoints = (pos) => {
    const copy = [...points]
    copy[pos] = copy[pos] + 1
    setPoints(copy)
    let x = mostVotes()
    setMostPoints(x)
    console.log(mostPoints)
  }

  const mostVotes = () => {
    let largestPoints = Math.max(...points)
    console.log("largestPoints", largestPoints)
    let largestIdx = points.indexOf(largestPoints)
    console.log("largestIdx", largestIdx)
    return largestIdx
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>
      {anecdotes[selected]}
      </div>
      <p>has {points[selected]} votes</p>
      <Button name="vote" handler={()=>incPoints(selected)}></Button>
      <Button name="Random Number" handler={randomNumber}></Button>

      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[mostPoints]}</div>

      <h2>give feedback</h2>
      <Button name="good" handler={()=>setGood(good + 1)}></Button>
      <Button name="neutral" handler={()=>setNeutral(neutral + 1)}></Button>
      <Button name="bad" handler={()=>setBad(bad + 1)}></Button>
      
      <h2>Statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral}></Statistics>
    </div>
  )
}
export default App;
