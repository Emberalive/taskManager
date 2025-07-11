import { useState } from 'react'
import NewTaskForm from './NewTaskForm'
import { nanoid } from "nanoid"
import { motion } from 'framer-motion';


export default function AddTask(props) {

    const [formKey, setFormKey] = useState("");

    const [newTaskClicked, setNewTaskClicked] = useState(false)

    function handleNewTaskClicked () {
        setNewTaskClicked(prevState => !prevState)
        setFormKey(nanoid())
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
                [newTask, ...prev]
            )
        })

        handleNewTaskClicked()
    }



    return (
        <>
            <animatePresence>
                <motion.div
                    key={`form${formKey}`}
                    initial={{ scaleY: 0, opacity: 0 , scaleX: 0 }}
                    animate={{ scaleY: 1, opacity: 1 , scaleX: 1 }}
                    exit={{ scaleY: 0, opacity: 0 , scaleX: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    style={{originY: 0}}
                >
                {newTaskClicked && <NewTaskForm handleNewTask={handleNewTaskClicked} handleOnSubmit={handeOnSubmit}/>}
                </motion.div>
            </animatePresence>
            {!newTaskClicked && <a className="addTask" onClick={() => handleNewTaskClicked()}>
                Add New Task
            </a>}
        </>

    )
}