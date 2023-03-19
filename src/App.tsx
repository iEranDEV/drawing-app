import AccessibilityBar from "./components/AccessibilityBar";
import ToolsBar from "./components/ToolsBar";

function App() {
	return (
		<div className="overflow-hidden w-screen h-screen bg-neutral-200 flex flex-col">
			{/* Menu, save, changes history */}
			<AccessibilityBar></AccessibilityBar>

			{/* Wrapper */}
			<div className="flex w-full h-full">
				{/* Canvas */}
				<div className="w-full h-full overflow-auto">

				</div>

				{/* Drawing tools */}
				<ToolsBar></ToolsBar>
			</div>
		</div>
	);
}

export default App;
