export default function NewTaskForm(props) {
    return (
        <form className="newTaskForm" onSubmit={props.handleOnSubmit}>
            <input type="text" className="newTaskForm__input" placeholder="Title" name="title"/>

            <input type="text" name="description" className="newTaskForm__input" placeholder="Description" />

            <button type="submit" className="newTaskForm__button">Create</button>
            <a className="cancel" onClick={() => props.handleNewTask()}>Cancel</a>
        </form>
    )
}