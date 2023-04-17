import { useEffect, useState } from "react";
import AccessibilityBar from "./components/AccessibilityBar";
import DrawingBoard from "./components/DrawingBoard";
import { BrushContext } from "./context/BrushContext";

function App() {
	const [ctx, setCtx] = useState<CanvasRenderingContext2D | undefined | null>(null);
	const [zoom, setZoom] = useState(0.5);
	const [brush, setBrush] = useState({type: 'PENCIL', width: 3, color: '#000000'})
	const [history, setHistory] = useState(Array<HistoryItem>());
	const [currentHistory, setCurrentHistory] = useState(0);

	useEffect(() => {
		const redraw = () => {

			const toRedraw = history.slice(currentHistory);
			if(ctx) {

				ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
				ctx.fillStyle = 'white';
				ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

				toRedraw.reverse().forEach((historyItem) => {
					ctx.lineWidth = historyItem.width;
					if(historyItem.type === 'PENCIL') {
						ctx.strokeStyle = historyItem.color;
					} else if (historyItem.type === 'ERASER') {
						ctx.strokeStyle = 'white';
					}
					ctx.lineCap = 'round';
					ctx.lineJoin = 'round';
					historyItem.points.forEach((point) => {
						ctx.lineTo(point.x, point.y);
						ctx.stroke();
					})
					ctx.stroke();
            		ctx.beginPath();
				})
			}
		}

		redraw()

	}, [currentHistory])

	useEffect(() => {
		const changeZoom = (e: any) => {
			if(e.ctrlKey) {
				e.preventDefault();
				let val = 0;
				if(e.deltaY > 0) {
					val = 10;
				} else if (e.deltaY < 0) {
					val = -10;
				}
				const value = (zoom * 100) - val;
				if(value >= 50 && value <= 200) setZoom(value / 100);
			}
		}

		document.addEventListener('wheel', changeZoom, {
			capture: true,
			passive: false
		});

		const disableScrollMobile = (e: TouchEvent) => {
			if((e.target as any).localName === 'canvas' && e.touches.length === 1) {
				e.preventDefault();
			} else if(e.touches.length > 1) {
				e.stopPropagation();
			}
		}

		document.addEventListener('touchmove', disableScrollMobile, { passive: false, capture: true})

		return () => {
			document.removeEventListener('wheel', changeZoom, true);
		}
	}, [zoom]);

	return (
		<BrushContext.Provider value={{brush, setBrush, history, setHistory}}>
			<div className="w-screen h-screen bg-neutral-200 flex flex-col">
				{/* Menu, save, changes history */}
				<AccessibilityBar zoom={zoom} setZoom={setZoom} ctx={ctx} currentHistory={currentHistory} setCurrentHistory={setCurrentHistory}></AccessibilityBar>

				{/* Canvas */}
				<div className="w-full h-full overflow-auto relative">
					<DrawingBoard ctx={ctx} setCtx={setCtx} zoom={zoom} setCurrentHistory={setCurrentHistory} currentHistory={currentHistory}></DrawingBoard>
				</div>
			</div>
		</BrushContext.Provider>
	);
}

export default App;
