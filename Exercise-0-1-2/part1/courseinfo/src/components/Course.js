const Course = ({ course }) => (
    <div>
        <Header course_name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)
const Header = ({ course_name }) => <h1>{course_name}</h1>

const Content = ({ parts }) => {
    return (
        <div>
            {
                parts.map((part, index) => <Part key={index} part={part.name} exercise={part.exercises} />
                )
            }
        </div>
    )
}

const Part = (props) => <p>{props.part} {props.exercise}</p>

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <b>Total of {total} exercises</b>
    )
}

export default Course