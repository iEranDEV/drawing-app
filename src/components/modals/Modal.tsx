type ModalProps = {
    children: JSX.Element,
    hideModal: Function | undefined
}

function Modal({ children, hideModal }: ModalProps) {

    const handleBgClick = () => {
        if(hideModal) hideModal();
    }

    return (
        <div onClick={handleBgClick} className="h-screen w-screen fixed top-0 left-0 z-40">
            {children}
        </div>
    )
}

export default Modal;