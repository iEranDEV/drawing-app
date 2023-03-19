import { AiOutlineMenu, AiOutlineSave } from 'react-icons/ai'
import { BiUndo, BiRedo } from 'react-icons/bi'

function AccessibilityBar() {
    return (
        <div className="w-full bg-neutral-100 border-b border-neutral-300 p-3 flex justify-between text-neutral-600">

            {/* Save, undo, redo */}
            <div className='flex gap-4'>
                {/* Menu */}
                <AiOutlineMenu className='h-6 w-6'></AiOutlineMenu>

                {/* Save image */}
                <AiOutlineSave className='h-6 w-6'></AiOutlineSave>

                {/* Undo */}
                <BiUndo className='h-6 w-6'></BiUndo>

                {/* Redo */}
                <BiRedo className='h-6 w-6'></BiRedo>
            </div>

            {/* Scroll values */}
            <div>
                {/* TODO:  */}
            </div>
        </div>
    )
}

export default AccessibilityBar;