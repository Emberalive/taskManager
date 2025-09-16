import {useState} from "react";
export default function AddReminder (props) {

    const [currentReminder, setCurrentReminder] = useState(null);

    return (
        <div className={"reminder__wrapper"}>
            <form className="reminder__container"  onSubmit={async (e) => {
                e.preventDefault();
                try {
                    if (currentReminder === null) {
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
                        if (response) {
                            props.setRemindTask("")
                            props.handleNotification("Reminder has been created for: " + currentReminder);
                            console.log("reminder has been added to task")
                        }
                    }
                } catch (e) {
                    console.error(e.message)
                }
            }}>
                <h2>Add Reminder</h2>
                <div className={"reminder__input-container"}>
                    <input className={"reminder__input"}
                        type="date"
                        name="reminder"
                        onChange={(e) => setCurrentReminder(e.target.value)}
                    />
                    <p>{currentReminder}</p>
                </div>
                <div className={"reminder__input-buttons"}>
                    <button className={"general-button"} type="submit">
                        Create
                    </button>
                    <button style={{backgroundColor: "var(--danger)"}} className={"general-button"} onClick={() => {
                        props.setAddReminder(prev => !prev);
                    }}>
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    )
}