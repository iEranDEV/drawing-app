import { useEffect, useRef } from "react";

type LineWidthModalProps = {
    brush: {type: string, width: number, color: string},
    setBrush: Function
}

function LineWidthModal({ brush, setBrush }: LineWidthModalProps) {

    const handleClick = (val: number) => {
        setBrush({type: brush.type, width: val, color: brush.color});
    }

    return (
        <div className="animate-slideFromTop absolute w-max bg-white border border-neutral-300 p-2 left-1/2 rounded-lg">
            {[1,3,5,8].map((val) => {
                return (
                    <div onClick={() => handleClick(val)} key={val} className={(brush.width === val && 'bg-neutral-100') + ' hover:bg-neutral-100 py-2 px-3 rounded-lg text-xs flex justify-center items-center gap-4 relative'}>
                        <span>{val}px</span>
                        <div className="w-16 bg-neutral-700" style={{height: val + 'px'}}></div>

                        {brush.width === val && <>
                            <div className="absolute h-3 rounded-lg w-1 bg-indigo-600 left-0 -translate-x-1/2"></div>
                        </>}
                    </div>
                )
            })}
        </div>
    )
}

export default LineWidthModal;