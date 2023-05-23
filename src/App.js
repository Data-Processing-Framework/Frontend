import "./App.sass";
import "./elements/css/colorPalette.sass";
import { NavBar } from "./elements/navBar";
import { Graph } from "./elements/graph";
import { ShowModuls } from "./elements/showModuls";
import { ShowNewNode } from "./elements/showNewNode";
import { Info } from "./elements/info";
import React, { useState, useEffect, useRef } from "react";
import Alert from "./elements/alerts";
import ReactFlow, { ReactFlowProvider } from "reactflow";
import { joinGraph } from "./functionalities/joinGraph";
const flowKey = "DPF-Graph";

import { conectionPath } from "./API/globals";
import { makeModules } from "./functionalities/makeModules";

function App() {
	//---------------------------Visibiility Handlers-----------------------------------------
	//Handles if info section is visible or not

	const [infoNode, setInfoNode] = useState(null);
	const [infoOpen, setInfoOpen] = useState(false);
	const closeInfo = () => {
		setInfoOpen(false);
		setInfoNode(null);
	};
	const openInfo = () => {
		setInfoOpen(true);
	};
	const setInfo = (node) => {
		if (infoNode != null) {
			setInfoNode(null);
		}
		setInfoNode(node);
	};

	//Handles if moduls section is visible or not
	const [modulsIsOpen, setModulsIsOpen] = useState(false);
	const handleToggleModuls = () => {
		setModulsIsOpen(!modulsIsOpen);
	};

	const [NewNode, setNewNode] = useState(false);
	const handleToggleNewNode = () => {
		setNewNode(!NewNode);
		console.log(NewNode);
	};

	//---------------------------MODES-----------------------------------------
	//Handles if app is in edit mode or not
	//TODO Change graph settings when in edit mode or not
	const [editMode, setEditMode] = useState(true);
	const sysStop = () => {
		setEditMode(true);
		//fetch /system/stop
		fetch(conectionPath + "/system/stop").then((response) => {
			console.log(response);
		});
		//get /sytem/status
		fetch(conectionPath + "/system/status")
			.then((response) => {
				console.log(response);
				return response.json();
			})
			.then((json) => {
				console.log("On Stop sysyem/status: ");
				console.log(json);
				//TODO create alert toast if error
			});
	};

	// Reference to child component
	const graphRef = useRef(null);

	// Parent component's function
	const saveGraph = () => {
		// Call the child component's function
		console.log("Saving graph from App.js...");
		graphRef.current.onSave();
	};

	const sysStart = () => {
		setEditMode(false);
		saveGraph();
		//TODO put graph
		const getGraph = async () => {
			const flow = JSON.parse(localStorage.getItem(flowKey));
			if (flow) {
				console.log(flow.nodes);
				console.log(flow.edges);
				return joinGraph(flow.nodes, flow.edges);
			}
		};
		const graph = getGraph();
		console.log(graph);
		//do the put
		fetch(conectionPath + "/graph", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: graph,
		}).then((response) => {
			console.log(response);
			return response.json();
		});

		//fetch /system/start
		fetch(conectionPath + "/system/status")
			.then((response) => {
				console.log(response);
				return response.json();
			})
			.then((json) => {
				console.log("On Start sysyem/status: ");
				console.log(json);
				//TODO create alert toast if error
				//json.errors.forEach(printError)
			});
	};

	const sysRestart = () => {
		//fetch /system/restart
		fetch(conectionPath + "/system/restart").then((response) => {
			console.log(response);
		});
		//get /sytem/status
		fetch(conectionPath + "/system/status")
			.then((response) => {
				console.log(response);
				return response.json();
			})
			.then((json) => {
				console.log("On Restart sysyem/status: ");
				console.log(json);
				//TODO create alert toast if error
				//json.errors.forEach(printError)
			});
	};
	//--------------------------------NODES-----------------------------------
	const [nodes, setNodes] = useState([]);

	//-------------------------------MODULES----------------------------------
	const [modules, setModules] = useState([]);

	useEffect(() => {
		fetch(conectionPath + "/module")
			//.then(response=> console.log(response))
			.then((response) => {
				console.log(response);
				return response.json();
			})
			.then((json) => {
				console.log(json);
				const { initialModules } = makeModules(json);
				console.log(initialModules);
				setModules(initialModules);
			});
		// empty dependency array means this effect will only run once (like componentDidMount in classes)
	}, []);


	//---------------------------------APP-----------------------------------
	return (
		<div className="App">
			<NavBar
				sysStart={sysStart}
				sysStop={sysStop}
				sysRestart={sysRestart}
				editMode={editMode}
				toggleModuls={handleToggleModuls}
				toggleNewNode={handleToggleNewNode}
			/>
			<Info open={infoOpen} node={infoNode} closeInfo={closeInfo} editMode={editMode} />
			{modulsIsOpen && (
				<ShowModuls
					toggleModuls={handleToggleModuls}
					modules={modules}
					setModules={setModules}
					nodes={nodes}
					setNodes={setNodes}
				/>
			)}
			{NewNode && (
				<ShowNewNode
					togglenewnode={handleToggleNewNode}
					nodes={nodes}
					setNodes={setNodes}
				/>
			)}
			<ReactFlowProvider>
				<Graph
					togglenewnode={handleToggleNewNode}
					setSelectedNode={setInfo}
					selectedNode={infoNode}
					closeInfo={closeInfo}
					openInfo={openInfo}
					isOpen={infoOpen}
					mode={editMode}
					nodes={nodes}
					setNodes={setNodes}
					modules={modules}
					ref={graphRef}
				/>
			</ReactFlowProvider>

			<Alert />
		</div>
	);
}
export default App;
