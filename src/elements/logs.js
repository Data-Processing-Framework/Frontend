import "./css/logs.sass";
import { useEffect, useState, useRef } from "react";
import { conectionPath } from "../API/globals";

export function LogCard({ closeInfo, node, open }) {
	const [info, setInfo] = useState();
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const myInterval = useRef();
	useEffect(() => {
		return () => clearInterval(myInterval.current);
	}, [node]);

	useEffect(() => {
		if (open) {
			getAlerts();
			myInterval.current = setInterval(() => getAlerts(), 5000);
		} else {
			clearInterval(myInterval.current);
			myInterval.current = null;
		}
	}, [open]);

	function getAlerts() {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ number: 10, fromDate: startDate, toDate: endDate }),
		};
		fetch(conectionPath + "/graph/logs/" + node.data.name, requestOptions)
			.then((res) => {
				return res.text();
			})
			.then((text) => {
				//console.log(text)
				setInfo(text);
			});
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		// Perform your function here
	  };
	

	return (
		<div className="info-start">
			<div className="Header">
				<h4>Logs</h4>
			</div>
			<div>
				<form id="timeForm" onSubmit={handleSubmit}>
					<input type="time" id="timeInit" name="timeInit" onSubmit={((e) => setStartDate(e.target.value))} required />
					<input type="time" id="timeEnd" name="timeEnd" onSubmit={(e) => setEndDate(e.target.value)} required />
					<button type="submit"> Set Data</button>
				</form>
			</div>
			<div className="info-card" id="logsScreen">
				<div className="text">
					<div className="infoBody">{info}</div>
				</div>
			</div>
		</div>
	);
}
