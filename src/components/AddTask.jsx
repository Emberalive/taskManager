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
                const result = await fetch(`${props.api}/tasks`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        taskDetails
                    )
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
            } else {
                return false
            }
        } catch (err) {
            props.handleGlobalError("Failure to create task, sorry")
            console.log("failed to create task for user -> " + taskDetails.username + "\nError: " + err.message)
            return false
        }
    }

    async function handeOnSubmit(event) {
        event.preventDefault()

        let resData = {}

        const today = new Date()

        const month = today.getMonth() + 1
        const date = today.getDate()
        const year = today.getFullYear()
        const onlyDate = `${date}/${month}/${year}`

        const formData = event.target;

        const title = formData.title.value

        const description = formData.description.value

        let group = props.group;

        const newTask = {
            id: nanoid(),
            title: title,
            description: description,
            date: onlyDate,
            username: props.user.username,
            groups: group,
            completed: false
        }

        const result = await postTask(newTask)



        if (result) {
            resData = JSON.stringify(result)

            if (resData.success === false) {
                setNewTaskClicked(prevState => !prevState)
                props.handleGlobalError("Failure to create task, sorry")
            }else {
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
                {newTaskClicked && <NewTaskForm handleNewTask={handleNewTaskClicked}
                                                handleOnSubmit={handeOnSubmit}
                                                failTask={failTask}
                />}
                </motion.div>
            </AnimatePresence>
            {!newTaskClicked && <a className="addTask" onClick={() => handleNewTaskClicked()}>
                Add New Task
            </a>}
        </>
    )
}