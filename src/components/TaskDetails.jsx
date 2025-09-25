import "../task.css"

import Data from "./Data.jsx";
import Controls from "./Controls.jsx";
import {useState} from "react";
import AddTask from "./AddTask.jsx";
import AddReminder from "./AddReminder.jsx";

export default function TaskDetails(props) {
    const [showControls, setShowControls] = useState(false);

    const [taskExpand, setTaskExpand] = useState(null);

    // holds the id for the task that is having a reminder added to it
    const [remindTask, setRemindTask] = useState("");

    function toggleControls() {
            setShowControls(!showControls);
        }

    const [isEditingID, setIsEditingID] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const [removingTaskIds, setRemovingTaskIds] = useState([]);

    const [completingTasks, setCompletingTasks] = useState([]);

    const handleDelete = (id) => {
        console.log(id + " deleting");
        setRemovingTaskIds(prev => [...prev, id]);
        setTimeout(() => {
            props.deleteTask(id);
        }, 400);
    };

    function clearEditing() {
        setEditTitle("");
        setEditDescription("");
        setIsEditingID(null);
    }

    async function updateTask(task) {
        try {
            const response = await fetch(`${props.api}/tasks`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify(task),
                }
            );

            if (response.status === 200) {
                console.log("task was successfully updated");
                return true
            } else {
                if (response.status === 400) {
                    console.log("invalid parameters sent")
                    return false;
                } else if (response.status === 500) {
                    console.log("Server error occurred")
                    return false;
                }
            }
        } catch (err) {
            console.error("error Whilst updating task -> " + task.id + "\nError: " + err.message);
            return false;
        }
    }


    async function handleSave (task) {
        const {id, title, description} = task
        console.log("Saving task changes in state for task: " + task.id);

        let newTask = {
            id: id,
        }

        if (editTitle !== title) {
            newTask = {...newTask, title: editTitle};
        }
        if (editDescription !== description) {
            newTask = {...newTask, description: editDescription};
        }

        const success = await updateTask(
           newTask
        );

        if (success) {
            props.setTasks(prev =>
                prev.map((task) =>
                    task.id === id ?
                        {
                            ...task, title: editTitle === "" ? task.title : editTitle,
                            description: editDescription === "" ? task.description : editDescription
                        }: task
                ))
        }else {
            props.handleVisualError("could not update task details", id);
            console.log("error Whilst updating task -> " + id);
        }
            clearEditing()
    }

    const taskElements = props.tasks.map((task) => {
        const isRemoving = removingTaskIds.includes(task.id);
        const isCompleted = completingTasks.includes(task.id);
       return(
           <div key={task.id}>

               <section className={`task 
                        ${(isRemoving || isCompleted) ? "removing" : ""}
                        ${taskExpand === task.id ? "task__expand" : ""}
                        `}
                        key={task.id} >
                   <Data
                       setEditTitle={setEditTitle}
                       task={task}
                       isEditingID={isEditingID}
                       setEditDescription={setEditDescription}
                       editDescription={editDescription}
                       setIsEditingID={setIsEditingID}
                       taskExpand={taskExpand}
                       setTaskExpand={setTaskExpand}
                       toggleControls={toggleControls}
                       isDarkMode={props.isDarkMode}
                       viewPort={props.viewPort}
                       setAddReminder={props.setAddReminder}
                       activeView={props.activeView}
                       setRemindTask={setRemindTask}
                       setTasks={props.setTasks}
                   />
                   <section className={"task-error"} id={`task-error-${task.id}`}>
                       <p>{props.taskError[task.id] || "Sorry an error occurred"}</p>
                   </section>
                       <Controls
                           task={task}
                           handleDelete={handleDelete}
                           AddCompletedTasks={props.AddCompletedTasks}
                           setEditData={() => {
                               setIsEditingID(task.id);
                               setEditTitle(task.title);
                               setEditDescription(task.description);
                           }}
                           handleSave={handleSave}
                           taskError={props.taskError}
                           isEditingID={isEditingID}
                           handleVisualError={(error) => props.handleVisualError(error, task.id)}
                           updateTask={updateTask}
                           setTasks={props.setTasks}
                           setCompletedTasks={props.setCompletedTasks}
                           api={props.api}
                           activeView={props.activeView}
                           setCompletingTasks={setCompletingTasks}
                           completingTasks={completingTasks}
                           showControls={showControls}
                           setTaskExpand={setTaskExpand}
                           tasksExpand={taskExpand}
                           setIsEditingID={setIsEditingID}
                           toggleControls={toggleControls}
                           viewPort={props.viewPort}
                           isDarkMode={props.isDarkMode}
                       />
               </section>
           </div>
       )
    })

    return (
        <>
            <div className={props.activeView === "groups" ? "task-container__groups" : "task-container"}>
                {(props.activeView === "tasks" || props.activeView === "groups") && <AddTask setTasks={props.setTasks}
                                                          tasks={props.tasks}
                                                          user={props.user}
                                                          group={props.groupClicked}
                                                          handleGlobalError={props.handleGlobalError}
                                                          api={props.api}
                                                          activeView={props.activeView}
                                                          viewPort={props.viewPort}
                />}
                {taskElements}
            </div>
            {props.addReminder && <AddReminder setAddReminder={props.setAddReminder}
                                         handleGlobalError={props.handleGlobalError}
                                         user={props.user}
                                         task={props.task}
                                         updateTask={updateTask}
                                         remindTask={remindTask}
                                         setRemindTask={setRemindTask}
                                         handleNotification={props.handleNotification}
                                         setTasks={props.setTasks}
            />}
        </>
    )
}