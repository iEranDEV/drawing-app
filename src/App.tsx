import AccessibilityBar from "./components/AccessibilityBar";
import DrawingBoard from "./components/DrawingBoard";
import ToolsBar from "./components/ToolsBar";

function App() {

	return (
		<div className="w-screen h-screen bg-neutral-200 flex flex-col">
			{/* Menu, save, changes history */}
			<AccessibilityBar ></AccessibilityBar>

			{/* Wrapper */}
			<div className="flex w-full h-full">
				{/* Canvas */}
				<div className="w-full h-full overflow-auto relative">
					<DrawingBoard></DrawingBoard>
				</div>

				{/* Drawing tools */}
				<ToolsBar></ToolsBar>
			</div>
		</div>
	);
}

export default App;
