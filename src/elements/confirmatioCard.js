
function ConfirmationCard({setConfirmDel, delName, deleteModule}){
	return(
		<div class="d-flex aligns-items-center justify-content-center card text-center w-75 mx-auto">
			<div class="card">
				<div class="card-top" style={{color: "red"}}>
					Are youshure you want to delete the module: {delName}? There are nodes using it
				</div>
				<div class="card-body" style={{color: "black"}}>
					<div>
						If you decide to delete it, the nodes using the module wil be deletd too
					</div>
					<div>
					<button
						type="button"
						class="no"
						onClick={() => deleteModule(delName,true)} 
						
					>Yes</button>
					<button
						type="button"
						class="yes"
						onClick={() => setConfirmDel(false)}
					>No</button>
					</div>
				</div>
			</div>
		</div>
		
	)
	
}
export default ConfirmationCard;