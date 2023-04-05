import { AiOutlineClear } from 'react-icons/ai'
import { BiSave, BiPencil, BiSquare, BiCircle, BiEraser, BiPlus, BiMinus } from 'react-icons/bi'
import { RiPaintLine } from 'react-icons/ri'
import { BsBorderWidth } from 'react-icons/bs'
import LineWidthModal from './modals/LineWidthModal'
import AccessibilityButton from './AccessibilityButton'

type AccessibilityBarProps = {
    ctx: CanvasRenderingContext2D | undefined | null,
    zoom: number,
    setZoom: Function,
    brush: {type: string, width: number, color: string},
    setBrush: Function
}

function AccessibilityBar({ ctx, zoom, setZoom, brush, setBrush }: AccessibilityBarProps) {

    const setZoomValue = (value: number) => {
        if(value >= 50 && value <= 200) setZoom(value / 100)
    }
    
    return (
        <div className="w-full h-12 bg-neutral-100 border-b border-neutral-300 px-5 flex justify-between items-center text-neutral-600 z-50">

            {/* Save, undo, redo */}
            <div className='flex h-full gap-3 justify-center items-center'>
                {/* Menu */}
                {/*
                <AiOutlineMenu className='icon-accessibility'></AiOutlineMenu>
                */}

                {/* Save image */}
                <BiSave className='icon-accessibility'></BiSave>

                {/*}
                <BiUndo className='icon-accessibility'></BiUndo>

                <BiRedo className='icon-accessibility'></BiRedo>
                /*}

                {/* Clear canvas */}
                <AccessibilityButton onClick={() => ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)} icon={<AiOutlineClear className='icon-accessibility'></AiOutlineClear>}></AccessibilityButton>
            </div>

            {/* Tools */}
            <div className='flex h-full gap-3 justify-center items-center'>
                
                {/* Pen */}
                <AccessibilityButton activeProp={brush.type === 'PENCIL'} icon={<BiPencil className='icon-accessibility'></BiPencil>}></AccessibilityButton>

                {/* Eraser */}
                <BiEraser className='icon-accessibility'></BiEraser>

                {/* Fill */}
                <RiPaintLine className='icon-accessibility'></RiPaintLine>

                {/* Square */}
                <AccessibilityButton icon={<BiSquare className='icon-accessibility'></BiSquare>}></AccessibilityButton>

                {/* Circle */}
                <AccessibilityButton icon={<BiCircle className='icon-accessibility'></BiCircle>}></AccessibilityButton>

                {/* Line width */}
                <AccessibilityButton icon={<BsBorderWidth className='icon-accessibility'></BsBorderWidth>} modal={<LineWidthModal brush={brush} setBrush={setBrush}></LineWidthModal>}></AccessibilityButton>
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