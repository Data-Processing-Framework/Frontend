import "./css/showModuls.sass";
import React, { useEffect, useState } from "react";
import { conectionPath } from "../API/globals";

export function ShowModulsBody({ modules, setModules }) {
	const [addModule, setAddModule] = useState(false);

	const [name, setName] = useState();
	const [type, setType] = useState();
	const [description, setDescription] = useState();
	const [type_in, setType_in] = useState();
	const [type_out, setType_Out] = useState();
	const [code, setCode] = useState();

	function toggleAddModule() {
		setAddModule(!addModule);
	}

	const handleSubmit = (event) => {
		// prevents the submit button from refreshing the page
		event.preventDefault();
		const data = {
			name: name,
			type: type,
			description: description,
			type_in: type_in,
			type_out: type_out,
			code: code,
		};

		const formData = new FormData();
		formData.append("name", name);
		formData.append("type", type);
		formData.append("description", description);
		formData.append("type_in", type_in);
		formData.append("type_out", type_out);
		formData.append("code", event.target.code.files[0]);

		fetch(conectionPath + "/module", {
			// Enter your IP address here
			method: "POST",
			mode: "cors",
			body: formData, // body data type must match "Content-Type" header
		});

		const modulesArray = [];

		modules.map((module) => {
			modulesArray.push(module);
		});
		var newModule = {};
		newModule.id = modules.length;
		newModule.name = data.name;
		newModule.type = data.type;
		newModule.description = data.description;
		newModule.type_in = data.type_in;
		newModule.type_out = data.type_out;
		newModule.code = data.code;
		modulesArray.push(newModule);
		setModules(modulesArray);
		console.log(modules);

		setName("");
		setType("");
		setDescription("");
		setType_in("");
		setType_Out("");
		setCode("");
	};

	return (
		<div class="card mx-auto" id="inCardSM">
			<div class="accordion mx-auto" id="accordionExample">
				{!addModule && (
					<>
						{modules.map((module) => (
							<p key={module.id}>
								<div class="accordion-item">
									<h2
										class="accordion-header"
										id={"headling" + module.id}
									>
										<button
											class="accordion-button collapsed"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target={
												"#collapse" + module.id
											}
											aria-expanded="false"
											aria-controls={
												"headling" + module.id
											}
										>
											{module.name}
										</button>
									</h2>
									<div
										id={"collapse" + module.id}
										class="accordion-button collapsed collapse"
										aria-labelledby="headingOne"
										data-bs-parent="#accordionExample"
									>
										<div class="accordion-body">
											<li>type: {module.type}</li>
											<li>
												description:{" "}
												{module.description}
											</li>
											<li>
												Expected dataType:{" "}
												{module.type_in}
											</li>
											<li>
												Output dataType:{" "}
												{module.type_out}
											</li>
										</div>
									</div>
								</div>
							</p>
						))}
						<button
							type="button"
							class="m-3 position-relative top-0 end-100%"
							aria-label="Close"
							onClick={toggleAddModule}
						>
							Add new module
						</button>
					</>
				)}
				{addModule && (
					<>
						<form
							id="newModule"
							name="newModule"
							onSubmit={(e) => {
								handleSubmit(e);
							}}
						>
							<p>
								Name:
								<input
									name="name"
									type="text"
									id="moduleNameIn"
									value={name}
									onChange={(e) => setName(e.target.value)}
								></input>
							</p>
							<p>
								Type:
								<select
									name="type"
									id="moduleTypeIn"
									value={type}
									onChange={(e) => setType(e.target.value)}
								>
									<option value="Input">Input</option>
									<option value="Output">Output</option>
									<option value="Transform">Transform</option>
								</select>
							</p>
							<p>
								Description:
								<input
									name="description"
									type="text"
									id="moduleDescriptionIn"
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
								></input>
							</p>
							{type != "Input" && (
								<p>
									Input data:
									<input
										name="type_in"
										type="text"
										id="moduleInIn"
										value={type_in}
										onChange={(e) =>
											setType_in(e.target.value)
										}
									></input>
								</p>
							)}
							{type != "Output" && (
								<p>
									Output data:
									<input
										name="type_out"
										type="text"
										id="moduleOutIn"
										value={type_out}
										onChange={(e) =>
											setType_Out(e.target.value)
										}
									></input>
								</p>
							)}
							<p>
								Code file:
								<input
									name="code"
									type="file"
									id="moduleFileIn"
									value={code}
									onChange={(e) => setCode(e.target.value)}
								></input>
							</p>
							<button type="submit" id="moduleSubmit">
								Submit
							</button>
						</form>
						<button
							type="button"
							class="m-3 position-relative top-0 end-100%"
							aria-label="Close"
							onClick={toggleAddModule}
						>
							Cancel
						</button>
					</>
				)}
			</div>
		</div>
	);
}

export function ShowModuls({ toggleModuls, modules, setModules }) {
	return (
		<div className="showModuls">
			<div className="showModuls-card">
				<div id="closeCrossModuls">
					<button
						type="button"
						class="btn btn-light m-3 position-relative top-0 start-0"
						aria-label="Close"
						onClick={toggleModuls}
					>
						<button
							type="button"
							class="btn-close"
							aria-label="Close"
							onClick={toggleModuls}
						></button>
					</button>
				</div>
				<h2>Moduls</h2>

				<ShowModulsBody modules={modules} setModules={setModules} />
				<div>
					<p></p>
				</div>
				<div>
					<p></p>
				</div>
			</div>
		</div>
	);
}
