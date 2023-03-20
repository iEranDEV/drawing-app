import { AiOutlineClear, AiOutlineMenu } from 'react-icons/ai'
import { BiUndo, BiRedo, BiSave } from 'react-icons/bi'

type AccessibilityBarProps = {
    ctx: CanvasRenderingContext2D | undefined | null
}

function AccessibilityBar({ ctx }: AccessibilityBarProps) {
    return (
        <div className="w-full bg-neutral-100 border-b border-neutral-300 p-3 flex justify-between text-neutral-600">

            {/* Save, undo, redo */}
            <div className='flex gap-4'>
                {/* Menu */}
                <AiOutlineMenu className='icon-accessibility'></AiOutlineMenu>

                {/* Save image */}
                <BiSave className='icon-accessibility'></BiSave>

                {/* Undo */}
                <BiUndo className='icon-accessibility'></BiUndo>

                {/* Redo */}
                <BiRedo className='icon-accessibility'></BiRedo>

                {/* Clear canvas */}
                <AiOutlineClear className='icon-accessibility' onClick={() => ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)}></AiOutlineClear>
            </div>

            {/* Scroll values */}
            <div>
                {/* TODO:  */}
            </div>
        </div>
    )
}

export default AccessibilityBar;