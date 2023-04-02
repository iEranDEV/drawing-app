import { useState } from "react";

type AccessibilityButtonProps = {
    name: string,
    icon: JSX.Element,
    modal?: JSX.Element
}

function AccessibilityButton({ name, icon }: AccessibilityButtonProps ) {
    const [active, setActive] = useState(false);

    return (
        <div>
            <div className="group relative">
                {icon}
                <p className="group-hover:visible duration-75 group-hover:h-8 h-0 invisible w-max flex justify-center items-center transition-all text-center left-1/2 absolute bg-neutral-700/80 text-neutral-50 px-3 rounded-lg -translate-x-1/2 translate-y-3">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 border-solid border-b-neutral-700/80 border-b-8 border-x-transparent border-x-8 border-t-0"></div>
                    <span>{name}</span>    
                </p>
            </div>
            {/* Modal */}
        </div>
    )
}

export default AccessibilityButton;