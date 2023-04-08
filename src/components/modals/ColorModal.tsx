import { useContext, useState, useEffect } from 'react';
import { BrushContext } from '../../context/BrushContext';
import { HexColorPicker } from "react-colorful";
import Modal from './Modal';


function ColorModal({ loc, hideModal }: { loc?: {x: number, y: number}, hideModal?: Function}) {
    const brushContext = useContext(BrushContext);
    const brush = brushContext.brush;

    
    const [color, setColor] = useState(brush.color);

    useEffect(() => {
        brushContext.setBrush({type: brush.type, color: color, width: brush.width});
    }, [color])

    return (
        <Modal hideModal={hideModal}>
            <div onClick={(e) => {e.stopPropagation()}} className="animate-slideFromTop absolute w-max bg-white border border-neutral-300 p-2 left-1/2 rounded-lg z-50" style={{left: loc?.x, top: loc?.y}}>
                <HexColorPicker color={color} onChange={setColor} />
            </div>
        </Modal>
    )
}

export default ColorModal;