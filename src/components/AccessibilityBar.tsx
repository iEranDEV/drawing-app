import { AiOutlineClear, AiOutlineMenu } from 'react-icons/ai'
import { BiUndo, BiRedo, BiSave, BiPencil, BiSquare, BiCircle, BiEraser, BiPlus, BiMinus } from 'react-icons/bi'
import { RiPaintLine } from 'react-icons/ri'
import { BsBorderWidth } from 'react-icons/bs'

type AccessibilityBarProps = {
    ctx: CanvasRenderingContext2D | undefined | null,
    zoom: number,
    setZoom: Function
}

function AccessibilityBar({ ctx, zoom, setZoom }: AccessibilityBarProps) {

    const setZoomValue = (value: number) => {
        if(value >= 50 && value <= 200) setZoom(value / 100)
    }
    
    return (
        <div className="w-full h-12 bg-neutral-100 border-b border-neutral-300 px-5 flex justify-between items-center text-neutral-600 overflow-hidden">

            {/* Save, undo, redo */}
            <div className='flex h-full gap-3 justify-center items-center'>
                {/* Menu */}
                <AiOutlineMenu className='icon-accessibility'></AiOutlineMenu>

                {/* Save image */}
                <BiSave className='icon-accessibility'></BiSave>

                {/* Undo */}
                <BiUndo className='icon-accessibility'></BiUndo>

                {/* Redo */}
                <BiRedo className='icon-accessibility'></BiRedo>

                {/* Clear canvas */}
                <AiOutlineClear  onClick={() => ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)} className='icon-accessibility'></AiOutlineClear>
            </div>

            {/* Tools */}
            <div className='flex h-full gap-3 justify-center items-center'>
                
                {/* Pen */}
                <BiPencil className='icon-accessibility'></BiPencil>

                {/* Eraser */}
                <BiEraser className='icon-accessibility'></BiEraser>

                {/* Fill */}
                <RiPaintLine className='icon-accessibility'></RiPaintLine>

                {/* Square */}
                <BiSquare className='icon-accessibility'></BiSquare>

                {/* Circle */}
                <BiCircle className='icon-accessibility'></BiCircle>

                {/* Line width */}
                <BsBorderWidth className='icon-accessibility'></BsBorderWidth>

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