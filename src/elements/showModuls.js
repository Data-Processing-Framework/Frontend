import './css/showModuls.sass'
export function ShowModuls({toggleModuls}) {
    return (
      <div className='showModuls'>
        <div className="showModuls-card">
          <button onClick={toggleModuls}>Close</button>
          <p>Moduls</p>
        </div>
      </div>
    );
}