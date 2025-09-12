import {useState} from "react";
export default function AddReminder (props) {

    const [currentReminder, setCurrentReminder] = useState("");

    // async function setNewReminder (task, date) {
    //     try {
    //         if ((task && date != null) || (task && date !== undefined)) {
    //             const response = await fetch(`${props.api}/tasks`, {
    //                 method: "PATCH",
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 },
    //                 body: JSON.stringify({task: task, date: date})
    //             })
    //             if (response.ok) {
    //                 console.log("Reminder successfully added to task: " + task.id);
    //
    //                 const resData = await response.json();
    //                 if (resData.success) {
    //                     console.log("reminder added to task: " + task.id + "for date " + date);
    //                     return resData.success
    //                 }
    //             } else {
    //                 props.handleGlobalError("There was an issue with the server, sorry")
    //             }
    //         }
    //     } catch (e) {
    //         console.error("There was an issue with adding a date for task: " + task.id + ":\n" + e.message);
    //         props.handleGlobalError("sorry there was an issue with the server.")
    //     }
    // }

    return (
        <div className={"reminder__wrapper"}>
            <section className="reminder__container" >
                <h2>Add Reminder</h2>
                <div className={"reminder__input-container"}>
                    <input className={"reminder__input"}
                        type="date"
                        name="reminder"
                        value={Date.now()}
                        onChange={(e) => setCurrentReminder(e.target.value)}
                    />
                    <p>{currentReminder}</p>
                </div>
                <div className={"reminder__input-buttons"}>
                    <button className={"general-button"} type="submit" onClick={async () => {
                        if (currentReminder === "") {
                            props.handleGlobalError("No date has been set");
                        } else if (!props.user.email) {
                            props.handleGlobalError("You need to set your email in the profile");
                        } else {
                            props.setAddReminder(prev => !prev);
                            console.log("reminder created for " + currentReminder);
                            //call the api
                            const newTask = {
                                id: props.remindTask,
                                reminderDate: currentReminder
                            };

                            const response = await props.updateTask(newTask, currentReminder)
                            if (response.success) {
                                props.setRemindTask(null)
                                console.log("reminder has been added to task")
                            }
                        }
                    }}>
                        Create
                    </button>
                    <button style={{backgroundColor: "var(--danger)"}} className={"general-button"} onClick={() => {
                        props.setAddReminder(prev => !prev);
                    }}>
                        Cancel
                    </button>
                </div>

            </section>
        </div>
    )
}