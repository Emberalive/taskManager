import { useState } from 'react'
import NewTaskForm from './NewTaskForm'
import { nanoid } from "nanoid"

export default function AddTask(props) {

    const [newTaskClicked, setNewTaskClicked] = useState(false)

    function handleNewTaskClicked () {
        setNewTaskClicked(prevState => !prevState)
    }

    function handeOnSubmit(event) {
        event.preventDefault()
        const today = new Date()

        const month = today.getMonth() + 1
        const date = today.getDate()
        const year = today.getFullYear()
        const onlyDate = `${year}/${month}/${date}`

        const formData = event.target;

        const title = formData.title.value

        const description = formData.description.value

        const newTask = {
            id: nanoid(),
            title: title,
            details: description,
            date: onlyDate,
        }

        props.setTasks(prev => {
            return (
                [...prev, newTask]
            )
        })

        handleNewTaskClicked()
    }



    return (
        <>
            {newTaskClicked && <NewTaskForm handleNewTask={handleNewTaskClicked} handleOnSubmit={handeOnSubmit}/>}
            {!newTaskClicked && <a className="addTask" onClick={() => handleNewTaskClicked()}>
                Add New Task
            </a>}
        </>

    )
}