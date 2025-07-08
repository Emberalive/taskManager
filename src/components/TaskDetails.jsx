import Data from "./Data.jsx";
import Controls from "./Controls.jsx";

export default function TaskDetails() {
    return (
        <section className="task">
            <header className="task-header">
                <h2 className="task-title">meeting with client for a new job</h2>
            </header>
            <Data  />
            <Controls />
        </section>
    )
}