import { useContext, useEffect, useRef, useState } from "react";
import { BrushContext } from "../context/BrushContext";

type DrawingBoardProps = {
    ctx: CanvasRenderingContext2D | undefined | null,
    setCtx: Function,
    zoom: number,
    setCurrentHistory: Function,
    currentHistory: number
}

function DrawingBoard({ ctx, setCtx, zoom, setCurrentHistory, currentHistory }: DrawingBoardProps) {
    const [points, setPoints] = useState(Array<CanvasPoint>());

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
            canvasElement.current.width = canvasElement.current.clientWidth;
            canvasElement.current.height = canvasElement.current.clientHeight;
            (canvasElement.current.getContext('2d') as any).fillStyle = 'white';
            canvasElement.current.getContext('2d')?.fillRect(0, 0, canvasElement.current.clientWidth, canvasElement.current.clientHeight);
        }
    }, [canvasElement]);

    useEffect(() => {
        if(ctx && canvasElement.current) {
            canvasElement.current.addEventListener('touchstart', handleTouchStart, { passive: false });
            canvasElement.current.addEventListener('touchmove', handleMobileDraw, { passive: false });
            canvasElement.current.addEventListener('touchend', handleTouchEnd, { passive: false });
        }

        return () => {
            canvasElement.current?.removeEventListener('touchstart', handleTouchStart);
            canvasElement.current?.removeEventListener('touchmove', handleMobileDraw);
            canvasElement.current?.removeEventListener('touchend', handleTouchEnd);
        }
    });

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        e.preventDefault();

        if(ctx && canvasElement.current) {

            // Reset redo option
            if(currentHistory !== 0) {
                brushContext.setHistory([...brushContext.history].slice(currentHistory));
                setCurrentHistory(0);
            }

            let rect = (e.target as HTMLElement).getBoundingClientRect();
            let x = (e.clientX - rect.left) / zoom;
            let y = (e.clientY - rect.top) / zoom;
            
            setPainting({
                isPainting: true,
                startX: x,
                startY: y
            })
            setPoints([])
        }
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        handleDraw(e);

        let rect = (e.target as HTMLElement).getBoundingClientRect();
        let x = (e.clientX - rect.left) / zoom;
        let y = (e.clientY - rect.top) / zoom;


        brushContext.setHistory([{
            type: brush.type,
            color: brush.color,
            width: brush.width,
            points: [...points, {x: x, y: y}]
        }, ...brushContext.history])

        setPainting({
            isPainting: false,
            startX: 0,
            startY: 0
        })

        setPoints([]);
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

            setPoints([...points, {x: x, y:y}]);

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

    const handleTouchStart = (e: TouchEvent) => {
        if(ctx && canvasElement.current) {
            e.preventDefault();

            // Reset redo option
            if(currentHistory !== 0) {
                brushContext.setHistory([...brushContext.history].slice(currentHistory));
                setCurrentHistory(0);
            }

            let rect = (e.target as HTMLElement).getBoundingClientRect();
            if(e.touches.length === 1) {
                let x = (e.touches[0].clientX - rect.left) / zoom;
                let y = (e.touches[0].clientY - rect.top) / zoom;
                
                setPainting({
                    isPainting: true,
                    startX: x,
                    startY: y
                })
                setPoints([])
            }
        }
    }

    const handleMobileDraw = (e: TouchEvent) => {
        if(!painting.isPainting) return;
        e.preventDefault();

        let rect = (e.target as HTMLElement).getBoundingClientRect();

        if(e.touches.length === 1) {
            let x = (e.touches[0].clientX - rect.left) / zoom;
            let y = (e.touches[0].clientY - rect.top) / zoom;

            if(ctx && canvasElement.current) {

                setPoints([...points, {x: x, y:y}]);

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
    }

    const handleTouchEnd = (e: TouchEvent) => {
        handleMobileDraw(e);
        e.preventDefault();

        brushContext.setHistory([{
            type: brush.type,
            color: brush.color,
            width: brush.width,
            points: [...points]
        }, ...brushContext.history])

        setPainting({
            isPainting: false,
            startX: 0,
            startY: 0
        })

        setPoints([]);
        if(ctx) {
            ctx.stroke();
            ctx.beginPath();
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
                onMouseLeave={(e) => {
                    handleDraw(e);
                    setPainting({
                        isPainting: false,
                        startX: 0,
                        startY: 0
                    })
                }}
                id="canvasElement"
                className="absolute cursor-crosshair origin-top-left"
                style={{ width: '1920px', height: '1080px', transform: 'scale(' + getScale() + ')'}}
        >

        </canvas>
    )
}

export default DrawingBoard;