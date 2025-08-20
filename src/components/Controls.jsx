import {AnimatePresence, motion} from 'framer-motion';

import editWhite from '../../public/task-button-icons/edit-text-white.svg';
import editBlack from '../../public/task-button-icons/edit-text-black.svg';
import completeBlack from '../../public/task-button-icons/complete-black.svg';
import completeWhite from '../../public/task-button-icons/complete-white.svg';
import deleteBlack from '../../public/task-button-icons/delete-black.svg';
import deleteWhite from '../../public/task-button-icons/delete-white.svg';
import saveWhite from '../../public/task-button-icons/save-white.svg';
import saveBlack from '../../public/task-button-icons/save-black.svg';
import cancelBlack from '../../public/task-button-icons/cancel-black.svg';
import cancelWhite from '../../public/task-button-icons/cancel-white.svg';

export default function Controls(props) {

    function getButtonClass () {
        return `${props.taskError[props.task.id] ? "disabled-button" : ""}
        ${props.isEditingID === props.task.id ? "disabled-button" : ""}`
    }

    async function deleteTask(task) {
        console.log("deleting task: " + task.id)
        let resData = {}

        try {
            const response = await fetch(`${props.api}/tasks?id=${encodeURIComponent(task.id)}`, {
                method: "DELETE",
            })

            resData = await response.json()

            if (response.ok) {
                if (task.completed) {
                    setTimeout(() => {
                        props.setCompletedTasks(prev => {
                            return prev.filter((t) => t.id !== task.id);
                        })
                    }, 400)
                }
                props.handleDelete(task.id)
                return resData.success
            } else {
                props.handleVisualError("could not delete task", props.task.id)

                if (response.status === 500) {
                    props.handleVisualError("could not delete task")
                    console.log("server error occurred")
                } else {
                    props.handleVisualError("could not delete task")
                    console.log("incorrect parameters used to delete task")
                    return resData.success
                }
                return resData.success
            }
        } catch (err) {
            props.handleVisualError("could not delete task", props.task.id)
            console.log("Error deleting task: " + err)
        }
    }

    async function setCompletedTask(task) {
        console.log("[ Controls - setCompletedTask ] starting function")

        let resData = {}

        if (!task) {
            console.log("task does not exist, cannot add to completed")
            return
        }

        const updatedValues = {
            id: task.id,
            completed: true,
        }

        const updatedTask = {
            ...task,
            completed: true
        }

        try {
            const success = await props.updateTask(updatedValues)

            resData = JSON.stringify(success)

            if (resData) {
                console.log("[ Controls - setCompletedTask ] attempting to add animation")

                props.setCompletingTasks(prev => {
                    return [...prev, updatedTask.id]
                })

                props.setCompletedTasks(prev => {
                    return [...prev, updatedTask]
                })

                props.AddCompletedTasks(task.id)
            } else {
                console.log("error completing task: " + task.id)
            }
        } catch (err) {
            console.log("error adding task to completed tasks: " + err.message)
            props.handleVisualError("could not assign task as completed", props.task.id)
        }
    }

    return (
        <section className={`controls ${(props.showControls && props.tasksExpand === props.task.id ? "controls-visible" : "")}`}>
            {(props.activeView === "tasks" || props.activeView === "groups") &&
            <>
                <button className={`complete
                ${getButtonClass()}
                `}
                         onClick={async () => {
                             props.setTaskExpand(null)
                             props.toggleControls()
                             await setCompletedTask(props.task)
                         }}>
                    <img src={props.isDarkMode ? completeWhite : completeBlack}></img>
                </button>
                <button className={props.taskError[props.task.id] ? "edit disabled-button" : "edit"}
                    onClick={props.isEditingID === props.task.id ?
                        () => {
                            props.handleSave(props.task)
                        } : () => props.setEditData()
                    }>
                    <>
                        {props.isEditingID === props.task.id ?
                            <img src={props.isDarkMode ? saveWhite : saveBlack} alt={"save task"}>
                            </img> :
                            <img src={props.isDarkMode ? editWhite : editBlack} alt={"edit task"}>
                            </img>
                        }
                    </>
                </button>
                <>
                    <AnimatePresence>
                        {props.isEditingID === props.task.id &&
                            <motion.button
                            initial={{scaleY: 0, opacity: 0, scaleX: 0}}
                            animate={{scaleY: 1, opacity: 1, scaleX: 1}}
                            exit={{scaleY: 0, opacity: 0, scaleX: 0}}
                            transition={{duration: 0.2, ease: "easeInOut"}}
                            className="delete" onClick={() => {
                            props.setIsEditingID(null)
                        }}
                        >
                                <img src={props.isDarkMode ? cancelWhite : cancelBlack} alt={"cancel"}>

                                </img>
                        </motion.button>}
                    </AnimatePresence>
                </>
            </>}
            <button className={`delete
            ${getButtonClass()}`
            } onClick={async () => {
                props.setTaskExpand(null)
                props.toggleControls()
                await deleteTask(props.task)
            }}>
                <img src={props.isDarkMode ? deleteWhite : deleteBlack} alt={"delete"}></img>
            </button>
        </section>
    )
}