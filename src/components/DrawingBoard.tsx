import { useContext, useEffect, useRef, useState } from "react";
import { BrushContext } from "../context/BrushContext";

type DrawingBoardProps = {
    ctx: CanvasRenderingContext2D | undefined | null,
    setCtx: Function,
    zoom: number
}

function DrawingBoard({ ctx, setCtx, zoom }: DrawingBoardProps) {

    const brushContext = useContext(BrushContext);
    const brush = brushContext.brush;

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
            let x = (e.clientX - rect.left) / zoom;
            let y = (e.clientY - rect.top) / zoom;
            setPainting({
                isPainting: true,
                startX: x,
                startY: y
            })
        }
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        handleDraw(e);
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
        let x = (e.clientX - rect.left) / zoom;
        let y = (e.clientY - rect.top) / zoom;

        if(ctx && canvasElement.current) {
            ctx.lineWidth = brush.width;
            if(brush.type === 'PENCIL') {
                ctx.strokeStyle = brush.color;
            } else if (brush.type === 'ERASER') {
                ctx.strokeStyle = 'white';
            }
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }

    const getScale = (): number => {
        return 1 * zoom;
    }

    return (
        <canvas ref={canvasElement} 
                onMouseDown={(e) => handleMouseDown(e)} 
                onMouseUp={(e) => handleMouseUp(e)}
                onMouseMove={(e) => handleDraw(e)}
                onMouseLeave={(e) => handleMouseUp(e)}
                className="bg-white absolute cursor-crosshair origin-top-left"
                style={{ width: '1920px', height: '1080px', transform: 'scale(' + getScale() + ')'}}
        >

        </canvas>
    )
}

export default DrawingBoard;