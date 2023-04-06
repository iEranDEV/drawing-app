import { useEffect, useState } from "react";

type AccessibilityButtonProps = {
    icon: JSX.Element,
    activeProp?: boolean,
    onClick?: Function,
    modal?: JSX.Element
}

function AccessibilityButton({ icon, modal, activeProp, onClick }: AccessibilityButtonProps ) {
    const [active, setActive] = useState(false);
    const [modalLoc, setModalLoc] = useState({x: 0, y: 0});

    useEffect(() => {
        if(!active) return;
        if(!modal) return;

        const handleModal = (e: any) => {
            console.log(e);
            setActive(false);
        }

        window.addEventListener("mousedown", handleModal);
        return () => window.removeEventListener("mousedown", handleModal);
    }, [active]);

    useEffect(() => {
        if(activeProp !== undefined) {
            setActive(activeProp);
        }
    }, [activeProp]);

    const handleIconClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        if(modal) {
            setModalLoc({x: e.clientX, y: e.clientY})
            setActive(!active);
        }
        if(onClick) onClick();
    }

    return (
        <div className="relative">
            <div onClick={(e) => handleIconClick(e)} className="relative">
                <span className={'peer ' + (active && 'text-indigo-600')}>{icon}</span>
                {activeProp !== undefined && <div className="absolute h-1 w-5 bg-indigo-500 rounded-t-lg left-1/2 -translate-x-1/2 translate-y-1.5"></div>}
            </div>
            {modal && active && modal}
        </div>
    )
}

export default AccessibilityButton;