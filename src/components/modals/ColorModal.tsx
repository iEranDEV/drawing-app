import { useContext } from 'react';
import { SketchPicker } from 'react-color';
import { BrushContext } from '../../context/BrushContext';


function ColorModal() {

    const brushContext = useContext(BrushContext);

    const handleWidthChange = (val: number) => {
        if(!val) return;

        brushContext.setBrush({type: brushContext.brush.type, width: val, color: brushContext.brush.color});
    }

    return (
        <div className="animate-slideFromTop absolute w-max bg-white border border-neutral-300 p-2 left-1/2 rounded-lg">
            <SketchPicker></SketchPicker>
        </div>
    )
}

export default ColorModal;