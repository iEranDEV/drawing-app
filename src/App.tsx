import { useState } from "react";
import AccessibilityBar from "./components/AccessibilityBar";
import DrawingBoard from "./components/DrawingBoard";

function App() {
	const [ctx, setCtx] = useState<CanvasRenderingContext2D | undefined | null>(null);

	return (
		<div className="w-screen h-screen bg-neutral-200 flex flex-col">
			{/* Menu, save, changes history */}
			<AccessibilityBar ctx={ctx}></AccessibilityBar>

			{/* Canvas */}
			<div className="w-full h-full overflow-auto relative">
				<DrawingBoard ctx={ctx} setCtx={setCtx}></DrawingBoard>
			</div>
		</div>
	);
}

export default App;
