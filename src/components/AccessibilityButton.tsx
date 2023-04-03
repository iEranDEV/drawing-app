import { useState } from "react";

type AccessibilityButtonProps = {
    name: string,
    icon: JSX.Element,
    modal?: JSX.Element
}

function AccessibilityButton({ name, icon, modal }: AccessibilityButtonProps ) {
    const [active, setActive] = useState(false);

    return (
        <div>
            <div onClick={() => modal && setActive(!active)} className="relative">
                <span className="peer">{icon}</span>
                <p className={(!active && 'peer-hover:visible peer-hover:h-6') + ' duration-75 delay-100 h-0 invisible w-max flex justify-center items-center transition-all text-center left-1/2 absolute bg-neutral-700/70 text-neutral-50 px-3 rounded-lg -translate-x-1/2 translate-y-2'}>
                    <span className="text-sm">{name}</span>    
                </p>
            </div>
            {modal && active && modal}
        </div>
    )
}

export default AccessibilityButton;