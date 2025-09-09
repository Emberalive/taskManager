import { DateInput, SimpleForm, TextInput } from "react-admin";
import {useState} from "react";
export default function AddReminder (props) {

    const [currentReminder, setCurrentReminder] = useState("");

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
                    <button className={"general-button"} type="submit" onClick={() => {
                        if (currentReminder === "") {
                            props.handleGlobalError("No date has been set");
                        } else if (!props.user.email) {
                            props.handleGlobalError("You need to set your email in the profile");
                        }
                        props.setAddReminder(prev => !prev);
                        console.log("reminder created for " + currentReminder);
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