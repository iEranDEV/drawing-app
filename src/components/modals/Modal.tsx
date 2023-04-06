type ModalProps = {
    children: JSX.Element,
    hideModal: Function | undefined
}

function Modal({ children, hideModal }: ModalProps) {


    return (
        <div onClick={() => hideModal && hideModal()} className="h-screen w-screen fixed top-0 left-0 z-50">
            {children}
        </div>
    )
}

export default Modal;