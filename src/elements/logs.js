import "./css/logs.sass";
import "./css/showNewNode.sass";

import { useEffect, useState, useRef } from "react";
import { conectionPath } from "../API/globals";

export function LogCard({ closeInfo, node, open }) {
  const [info, setInfo] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tempStartDate, setTempStartDate] = useState("");
  const [tempEndDate, setTempEndDate] = useState("");



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
  }, [open,node]);

  function getAlerts() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        number: 10,
        fromDate: startDate,
        toDate: endDate,
      }),
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
    setStartDate(tempStartDate)  
    setEndDate(tempEndDate) 
    console.log(startDate)
    // Perform your function here
  };
  return (
    <div className="logsSection">
      <div className="Header">
        <h4>Logs</h4>
      </div>
      <div className="logsForm"> 
          <input
            type="time"
            id="timeInit"
			      className=""
            name="timeInit"
            onChange={(e) => setTempStartDate(e.target.value)}
            required
          />
          <input
            type="time"
            id="timeEnd"
			      className=""
            name="timeEnd"
            onChange={(e) => setTempEndDate(e.target.value)}
            required
          />
          <button type="submit" className="form--close" onClick={()=>handleSubmit()}>Submit</button>
      </div>
      <div className="info-card" id="logsScreen">
          <div className="infoBody">
            {info}
          </div>
        
      </div>
    </div>
  );
}
