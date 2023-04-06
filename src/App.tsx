import { useState } from "react";
import AccessibilityBar from "./components/AccessibilityBar";
import DrawingBoard from "./components/DrawingBoard";
import { BrushContext } from "./context/BrushContext";

function App() {
	const [ctx, setCtx] = useState<CanvasRenderingContext2D | undefined | null>(null);
	const [zoom, setZoom] = useState(0.5);
	const [brush, setBrush] = useState({type: 'PENCIL', width: 3, color: '#d946ef'})

	return (
		<BrushContext.Provider value={{brush, setBrush}}>
			<div className="w-screen h-screen bg-neutral-200 flex flex-col">
				{/* Menu, save, changes history */}
				<AccessibilityBar zoom={zoom} setZoom={setZoom} ctx={ctx}></AccessibilityBar>

				{/* Canvas */}
				<div className="w-full h-full overflow-auto relative">
					<DrawingBoard ctx={ctx} setCtx={setCtx} zoom={zoom}></DrawingBoard>
				</div>
			</div>
		</BrushContext.Provider>
	);
}

export default App;
