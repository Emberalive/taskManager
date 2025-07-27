import { useRef } from "react";

export default function Groups (props) {
    const scrollRef = useRef(null);

    const handleWheel = (e) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += e.deltaY;
            e.preventDefault()
        }
    }


    const groupElements = props.groups.map((group) => {
        return (
            <div className="group-button">
                <p>{group}</p>
            </div>
            )
    })
    return (
        <>

            <section className="groups" ref={scrollRef} onWheel={handleWheel}>
                {groupElements}
            </section>
        </>
    )
}