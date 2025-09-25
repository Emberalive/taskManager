import expandWhite from "../../public/expand-white.svg";
import expandBlack from "../../public/expand-black.svg";
import collapseWhite from "../../public/collapse-white.svg";
import collapseBlack from "../../public/collapse-black.svg";

export default function Data (props) {



    function getSVG (svg) {
        switch (svg) {
            case 'expand':
                return props.isDarkMode ? expandWhite : expandBlack;
            case 'collapse':
                return props.isDarkMode ? collapseWhite : collapseBlack;
        }
    }

    return (
        <div className="data-container">
            <div style={{
                display: 'flex',
                flexDirection: 'row',
            }}>

            <img className={"group-image"}
                 alt={"Group Image"} ></img>
                <header className="task-header">
                    {props.isEditingID === props.task.id ?
                        <textarea type={"text"}
                            onChange={(e) => {
                                props.setEditTitle(e.target.value)
                            }}
                            defaultValue={props.task.title}
                        ></textarea> :
                        <h2 className="task-title">{props.task.title}</h2>
                    }
                    { (props.activeView === "tasks" || props.activeView === "groups") &&
                        <>
                            <p className="date">{props.task.date.toLocaleDateString('en-GB')}</p>
                            {props.task.remind_date === null && <button className={"reminder-button"} type={"button"} onClick={() => {
                                console.log("adding a notification for task: " + props.task.id);
                                props.setRemindTask(props.task.id);
                                props.setAddReminder(prev => !prev);
                            }}>Remind Me</button>}
                        </>
                    }
                </header>

                <img className={"expand-collapse-img"} alt={props.taskExpand === props.task.id ? "cancel" : "Edit"} src={props.taskExpand === props.task.id ? `${getSVG("collapse")}` : `${getSVG("expand")}`} onClick={() => {
                    if (props.taskExpand === null) {
                        props.setTaskExpand(props.task.id);
                        console.log("Editing task: " + props.task.id);
                        props.toggleControls()
                    } else {
                        if (props.isEditingID === props.task.id) {
                            props.setIsEditingID(null)
                        }
                        setTimeout(() => {
                            props.setTaskExpand(null);
                            props.toggleControls()
                        }, 100)
                    }
                }}></img>

            </div>

            {props.isEditingID === props.task.id ?
                <textarea
                    onChange={(e) => {
                        props.setEditDescription(e.target.value)
                    }
                    } defaultValue={props.task.description}></textarea> :
                <p className={props.taskExpand === props.task.id ? "description-expand" : ""}>{props.task.description}</p>
            }
        </div>
    )
}