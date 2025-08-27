import expandWhite from "../../public/expand-white.svg";
import expandBlack from "../../public/expand-black.svg";
import collapseWhite from "../../public/collapse-white.svg";
import collapseBlack from "../../public/collapse-black.svg";

export default function Data (props) {



    function getSVG (svg) {
        switch (svg) {
            case 'expand':
                console.log("switching to expand: isDarkMode: " + JSON.stringify(props.isDarkMode));
                return props.isDarkMode ? expandWhite : expandBlack;
            case 'collapse':
                console.log("switching to collapse: isDarkMode: " + JSON.stringify(props.isDarkMode));
                return props.isDarkMode ? collapseWhite : collapseBlack;
        }
    }

    return (
        <div className="data-container">
            <div style={{
                display: 'flex',
                flexDirection: 'row',
            }}>

            <img style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                margin: "10px 0 10px 10px",
                height: "70px",
                width: "70px",
                border: "2px solid green",
                borderRadius: "5px",
            }}
                 alt={"Group Image"} ></img>
                <header className="task-header">
                    {props.isEditingID === props.task.id ?
                        <input type={"text"}
                            onChange={(e) => {
                                props.setEditTitle(e.target.value)
                            }}
                            defaultValue={props.task.title}
                        ></input> :
                        <h2 className="task-title">{props.task.title}</h2>
                    }
                    <p className="date">{props.task.date}</p>
                    <button className={"reminder-button"} style={{

                    }} type={"button"} onClick={() => {
                        console.log("adding a notification for task: " + props.task.id);
                        props.setAddReminder(prev => !prev);
                    }}>Remind Me</button>
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