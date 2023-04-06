import { useContext } from 'react';
import { SketchPicker } from 'react-color';
import { BrushContext } from '../../context/BrushContext';
import Modal from './Modal';


function ColorModal({ loc, hideModal }: { loc?: {x: number, y: number}, hideModal?: Function}) {

    const brushContext = useContext(BrushContext);

    const handleWidthChange = (val: number) => {
        if(!val) return;

        brushContext.setBrush({type: brushContext.brush.type, width: val, color: brushContext.brush.color});
    }

    return (
        <Modal hideModal={hideModal}>
            <div className="animate-slideFromTop absolute w-max bg-white border border-neutral-300 p-2 left-1/2 rounded-lg">
            
            </div>
        </Modal>
    )
}

export default ColorModal;