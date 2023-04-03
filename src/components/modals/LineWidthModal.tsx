type LineWidthModalProps = {
    brush: {type: string, width: number, color: string},
    setBrush: Function
}

function LineWidthModal({ brush, setBrush }: LineWidthModalProps) {


    return (
        <div className="absolute bg-neutral-100 border border-neutral-300 p-2 -translate-x-1/2 left-0">
            test
        </div>
    )
}

export default LineWidthModal;