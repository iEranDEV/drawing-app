import { AiOutlineClear } from 'react-icons/ai'
import { BiSave, BiPencil, BiSquare, BiCircle, BiEraser, BiPlus, BiMinus, BiRedo, BiUndo } from 'react-icons/bi'
import { RiPaintLine } from 'react-icons/ri'
import { BsBorderWidth } from 'react-icons/bs'
import LineWidthModal from './modals/LineWidthModal'
import AccessibilityButton from './AccessibilityButton'
import ColorModal from './modals/ColorModal'
import { useContext } from 'react'
import { BrushContext } from '../context/BrushContext'

type AccessibilityBarProps = {
    ctx: CanvasRenderingContext2D | undefined | null,
    zoom: number,
    setZoom: Function,
    setCurrentHistory: Function,
    currentHistory: number
}

function AccessibilityBar({ ctx, zoom, setZoom,currentHistory, setCurrentHistory }: AccessibilityBarProps) {

    const brushContext = useContext(BrushContext);
    const brush = brushContext.brush;

    const setZoomValue = (value: number) => {
        if(value >= 50 && value <= 200) setZoom(value / 100)
    }

    const setBrushType = (type: string) => {
        if(type) {
            brushContext.setBrush({
                width: brush.width,
                type: type,
                color: brush.color
            })
        }
    }
    
    const saveImage = () => {
        const canvasElement = document.getElementById("canvasElement");
        const a = document.createElement("a");
        a.href = (canvasElement as HTMLCanvasElement).toDataURL('image/png');
        a.download = "image.png";
        a.click();
    }

    return (
        <div className="w-full h-12 bg-neutral-100 border-b border-neutral-300 px-5 flex justify-between items-center text-neutral-600 z-50">

            {/* Save, undo, redo */}
            <div className='flex h-full gap-3 justify-center items-center'>
                {/* Save image */}
                <AccessibilityButton onClick={saveImage} icon={<BiSave className='icon-accessibility'></BiSave>}></AccessibilityButton>

                {/* Undo history */}
                <AccessibilityButton onClick={() => brushContext.history.length !== currentHistory && setCurrentHistory(currentHistory + 1)} icon={<BiUndo className={'icon-accessibility ' + (brushContext.history.length === currentHistory && 'icon-inactive')}></BiUndo>}></AccessibilityButton>

                {/* Redo history */}
                <AccessibilityButton onClick={() => (currentHistory > 0 && setCurrentHistory(currentHistory - 1))} icon={<BiRedo className={'icon-accessibility ' + (currentHistory === 0 && 'icon-inactive')}></BiRedo>}></AccessibilityButton>

                {/* Clear canvas */}
                <AccessibilityButton onClick={() => {
                    if(ctx) {
                        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                        ctx.fillStyle = 'white';
                        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                    }
                    brushContext.setHistory([]);
                    setCurrentHistory(0);
                }} icon={<AiOutlineClear className='icon-accessibility'></AiOutlineClear>}></AccessibilityButton>
            </div>

            {/* Tools */}
            <div className='flex h-full gap-3 justify-center items-center'>
                
                {/* Pen */}
                <AccessibilityButton onClick={() => setBrushType('PENCIL')} activeProp={brush.type === 'PENCIL'} icon={<BiPencil className='icon-accessibility'></BiPencil>}></AccessibilityButton>

                {/* Eraser */}
                <AccessibilityButton onClick={() => setBrushType('ERASER')} activeProp={brush.type === 'ERASER'} icon={<BiEraser className='icon-accessibility'></BiEraser>}></AccessibilityButton>

                {/* Fill */}
                <AccessibilityButton icon={<RiPaintLine className='icon-accessibility icon-inactive'></RiPaintLine>}></AccessibilityButton>

                {/* Square */}
                <AccessibilityButton icon={<BiSquare className='icon-accessibility icon-inactive'></BiSquare>}></AccessibilityButton>

                {/* Circle */}
                <AccessibilityButton icon={<BiCircle className='icon-accessibility icon-inactive'></BiCircle>}></AccessibilityButton>

                {/* Line width */}
                <AccessibilityButton icon={<BsBorderWidth className='icon-accessibility'></BsBorderWidth>} modal={<LineWidthModal></LineWidthModal>}></AccessibilityButton>

                {/* Color */}
                <AccessibilityButton icon={<div className='h-6 w-6 border border-neutral-300 rounded-lg cursor-pointer' style={{ backgroundColor: brush.color}}></div>} modal={<ColorModal></ColorModal>}></AccessibilityButton>
            </div>

            {/* Scroll values */}
            <div className='flex h-full gap-3 justify-center items-center'>
                <button onClick={() => setZoomValue((zoom * 100) - 10)}>
                    <BiMinus className='icon-accessibility'></BiMinus>
                </button>
                <input type="range" min={50} max={200} step={10} value={zoom * 100} onChange={(e) => setZoom((e.target.value) as any / 100)} />
                <button onClick={() => setZoomValue((zoom * 100) + 10)}>
                    <BiPlus className='icon-accessibility'></BiPlus>
                </button>
            </div>
        </div>
    )
}

export default AccessibilityBar;