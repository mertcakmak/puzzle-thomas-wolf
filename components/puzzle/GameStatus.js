export default function GameStatus(props){
    const {status} = props;

    const statusText = status==='gameOver' ? 'Game Over!' : 'You Win!';
    const statusClass = status==='gameOver' ? 'bg-danger' : 'bg-success';

    return(
        <div className={`d-flex w-100 align-items-center flex-column p-5 rounded shadow-lg border text-white ${statusClass}`}>
            <div className='display-4 mb-4'>{statusText}</div>
            <button className='btn btn-light' onClick={props.restartGame}>Restart Game</button>
        </div>
    )
}