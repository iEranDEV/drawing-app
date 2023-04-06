import { useContext } from "react";
import { BrushContext } from "../../context/BrushContext";


function LineWidthModal() {

    const brushContext = useContext(BrushContext)

    const handleWidthChange = (val: number) => {
        if(!val) return;

        brushContext.setBrush({type: brushContext.brush.type, width: val, color: brushContext.brush.color});
    }

    return (
        <div className="animate-slideFromTop absolute w-max bg-white border border-neutral-300 p-2 left-1/2 rounded-lg">
            {[1,3,5,8].map((val) => {
                return (
                    <div id={'modal_' + crypto.randomUUID()} onClick={() => handleWidthChange(val)} key={val} className={(brushContext.brush.width === val && 'bg-neutral-100') + ' cursor-pointer hover:bg-neutral-100 py-2 px-3 rounded-lg text-xs flex justify-center items-center gap-4 relative'}>
                        <span>{val}px</span>
                        <div className="w-16 bg-neutral-700" style={{height: val + 'px'}}></div>

                        {brushContext.brush.width === val && <>
                            <div className="absolute h-3 rounded-lg w-1 bg-indigo-600 left-0 -translate-x-1/2"></div>
                        </>}
                    </div>
                )
            })}
            <hr className="my-2" />
            <div className="w-full px-1 rounded-lg text-xs flex items-center gap-2 relative">
                <input type="number" value={brushContext.brush.width} onChange={(e) => handleWidthChange(parseInt(e.target.value))} className="px-2 w-20 h-6 bg-white border border-neutral-300 rounded-lg" />
                <span>px</span>
            </div>
        </div>
    )
}

export default LineWidthModal;