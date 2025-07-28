
export default function Groups (props) {


    //adds the ability to scroll horizontally using the scroll wheel
    const handleWheel = (e) => {
        if (props.groupsRef.current) {
            e.preventDefault()
            props.groupsRef.current.scrollLeft += e.deltaY;
        }
    }


    const groupElements = props.groups.map((group) => {
        const len = props.groups.length;
        return (
            <div className="group-button" ref = {props.groups[len - 1] === group ? props.newGroup : null}>
                <p>{group}</p>
            </div>
            )
    })
    return (
        <>
            <section className="groups" onWheel={handleWheel} ref={props.groupsRef}>
                {groupElements}
            </section>
        </>
    )
}