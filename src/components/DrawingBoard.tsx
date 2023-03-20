import { useEffect, useRef, useState } from "react";

type DrawingBoardProps = {
    ctx: CanvasRenderingContext2D | undefined | null,
    setCtx: Function
}

function DrawingBoard({ ctx, setCtx }: DrawingBoardProps) {

    const [painting, setPainting] = useState({
        isPainting: false,
        startX: 0,
        startY: 0,
    })

    const canvasElement = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        setCtx(canvasElement.current?.getContext('2d'))
        if(canvasElement.current) {
            canvasElement.current.width = canvasElement.current.clientWidth
            canvasElement.current.height = canvasElement.current.clientHeight
        }
    }, [canvasElement])

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        e.preventDefault();

        if(ctx && canvasElement.current) {
            let rect = (e.target as HTMLElement).getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            setPainting({
                isPainting: true,
                startX: x,
                startY: y
            })
        }
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        setPainting({
            isPainting: false,
            startX: 0,
            startY: 0
        })
        if(ctx) {
            ctx.stroke();
            ctx.beginPath();
        }
    }

    const handleDraw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if(!painting.isPainting) return;

        let rect = (e.target as HTMLElement).getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        if(ctx && canvasElement.current) {
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }

    return (
        <canvas ref={canvasElement} 
                onMouseDown={(e) => handleMouseDown(e)} 
                onMouseUp={(e) => handleMouseUp(e)}
                onMouseMove={(e) => handleDraw(e)}
                className="bg-white absolute w-full h-full cursor-crosshair"
        >

        </canvas>
    )
}

export default DrawingBoard;