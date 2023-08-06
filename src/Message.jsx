import { useRef, useEffect } from "react"

export function Message(props) {
    const scrollRef = useRef();
    useEffect(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });
    let messages = []
    for(let i=0; i<props.sent.length; i++) {
        messages.push(props.sent[i])
        try{
            messages.push(props.received[i])
        }
        catch{

        }
    }
    console.log(messages)
    let components = []
    let isSent = true;
    for(let i of messages) {
        if (isSent) {
            components.push(<div className="sentmsgbox"><div className="sentmsg">{i}</div></div>)
        } else {
            components.push(<div className="recmsgbox"><div className="receivedmsg">{i}</div></div>)
        }
        isSent = !isSent
    }
    return(
        <div id="msg" ref={scrollRef}>
            {components}
        </div>
    )
}