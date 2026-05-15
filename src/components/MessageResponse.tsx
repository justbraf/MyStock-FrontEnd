import type { Dispatch, SetStateAction } from "react"

const MessageResponse = ({ msg, setMsg }: { msg: string, setMsg: Dispatch<SetStateAction<{ message: string } | undefined>> }) => {
    const handleClose = () => {
        setMsg(undefined)
    }
    return (
        <div className="bg-black/75 w-full h-full absolute top-0 left-0 flex justify-center items-center">
            <div className="bg-slate-300 rounded-2xl w-2/3 h-4/5 flex justify-center items-center">
                <h3 className="text-3xl">{msg}</h3>
            </div>
            <span className="text-3xl relative -top-1/3 right-1/35 cursor-pointer" onClick={handleClose}>X</span>
        </div>
    )
}

export default MessageResponse