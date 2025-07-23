import { useState } from 'react'
import NewTaskForm from './NewTaskForm'
import { nanoid } from "nanoid"
import {AnimatePresence, motion} from 'framer-motion';


export default function AddTask(props) {

    const [failTask, setFailTask] = useState(false)

    const [formKey, setFormKey] = useState("");

    const [newTaskClicked, setNewTaskClicked] = useState(false)

    function handleNewTaskClicked () {
        setNewTaskClicked(prevState => !prevState)
        setFormKey(nanoid())
    }

    async function postTask (taskDetails) {
        try {
            if (taskDetails) {
                const result = await fetch('http://localhost:7000/createTask', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        task: taskDetails,
                    })
                })
                if (result.ok) {
                    return result.success
                } else if (result.status === 400) {
                    console.log("Error creating task: \nIncorrect parameters")
                    return result.success
                } else if (result.status === 500) {
                    console.log("server error occurred")
                    return result.success
                }
            }
        } catch (err) {
            console.log("failed to create task for user -> " + taskDetails.username + "\nError: " + err.message)
        }
    }

    async function handeOnSubmit(event) {
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
            description: description,
            date: onlyDate,
            username: props.user.username,
        }

        const result = await postTask(newTask)

        if (result === false) {
            console.log("failure to create a task")
            return
        }

        console.log("task created successfully")


        if (newTask.date && newTask.title && newTask.description) {
            props.setTasks(prev => {
                return (
                    [...prev, newTask]
                )
            })
            handleNewTaskClicked()
        }else {
            setFailTask(prev => !prev)
            console.log("Invalid task requirements")
        }
        if (failTask === true) {
            setFailTask(prev => !prev)
        }
    }

    return (
        <>
            <AnimatePresence>
                <motion.div
                    key={`form${formKey}`}
                    initial={{ scaleY: 0, opacity: 0 , scaleX: 0 }}
                    animate={{ scaleY: 1, opacity: 1 , scaleX: 1 }}
                    exit={{ scaleY: 0, opacity: 0 , scaleX: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    style={{originY: 0}}
                >
                {newTaskClicked && <NewTaskForm handleNewTask={handleNewTaskClicked} handleOnSubmit={handeOnSubmit} failTask={failTask} />}
                </motion.div>
            </AnimatePresence>
            {!newTaskClicked && <a className="addTask" onClick={() => handleNewTaskClicked()}>
                Add New Task
            </a>}
        </>
    )
}