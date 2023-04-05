import { useEffect, useState } from "react";

type AccessibilityButtonProps = {
    name: string,
    icon: JSX.Element,
    modal?: JSX.Element
}

function AccessibilityButton({ name, icon, modal }: AccessibilityButtonProps ) {
    const [active, setActive] = useState(false);

    useEffect(() => {
        if(!active) return;

        const handleModal = (e: any) => {
            if(e.target.localName == 'input') return;
            setActive(false);
        }

        window.addEventListener("click", handleModal);
        return () => window.removeEventListener("click", handleModal);
    }, [active]);

    const handleIconClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        if(modal) setActive(!active);
    }

    return (
        <div className="relative">
            <div onClick={(e) => handleIconClick(e)} className="relative">
                <span className={'peer ' + (active && 'text-indigo-600')}>{icon}</span>
                <p className={(!active && 'peer-hover:visible peer-hover:h-6') + ' duration-75 delay-700 h-0 invisible w-max flex justify-center items-center transition-all text-center left-1/2 absolute bg-neutral-700/70 text-neutral-50 px-3 rounded-lg -translate-x-1/2 translate-y-2'}>
                    <span className="text-sm">{name}</span>    
                </p>
            </div>
            {modal && active && modal}
        </div>
    )
}

export default AccessibilityButton;