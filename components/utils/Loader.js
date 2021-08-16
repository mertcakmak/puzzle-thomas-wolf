import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Loader(){
    return(
        <div className='container mt-5 pt-3 text-center'>
            <FontAwesomeIcon icon={faSpinner} spin />
            <div className='text-muted mt-2 small'>Please wait, game is loading...</div>

        </div>
    )
}