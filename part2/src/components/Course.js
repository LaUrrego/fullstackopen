const Course = ({course}) => {
    console.log(course);
    const total = course.parts.reduce((acc, x)=> acc + x.exercises, 0)
    

    return(
        <div>
            <h2>{course.name}</h2>
            <ul>
                {course.parts.map(x =>
                    <li key={x.id}>{x.name} {x.exercises}</li>
                )}
            </ul>
            <p><strong>Total of {total} exercises</strong></p>
        </div>
    )
}

export default Course