import './css/showModuls.sass'

export function ShowModuls({toggleModuls}) {
    return (
      <div className='showModuls'>
        <div className="showModuls-card">
          <button type="button" class="btn-close m-3 align-self-start" aria-label="Close" onClick={toggleModuls} ></button>
          <h2>Moduls</h2>
        </div>
      </div>
    );
}