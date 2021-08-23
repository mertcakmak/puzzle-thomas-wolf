import React,{useState,useEffect} from 'react';
import Layout from '../../components/puzzle/Layout';
import {createRangeArray, createLayout} from '../../components/utils';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';

export default function CreateGame(){
    // const [dimension,setDimension] = useState(0);
    
    const dimensionList = [];

    // useEffect(() => {
    //     setDimension(0);
    // }, [dimension])

    const dispatch = useDispatch();

    const onSelectDimension = (e)=>{
        //setDimension(e.target.value);
        const dimension = e.target.value;
        const puzzleLayout = createLayout(dimension);
        const action = {
            type:actions.ON_CHANGE_CREATE_GAME_DIMENSION,
            value: { dimension, puzzleLayout }
        }
        dispatch(action);
    }

    dispatch({
        type:actions.ON_CHANGE_MODE,
        value:'create'
    });


    return(
        <div className='container mt-5'>

            <div className='d-flex w-100 align-items-center mb-5 border-bottom pb-4'>
                <div className='mr-5 d-block'>
                    <Link href='/'>
                        <a>
                            <div className='d-flex align-items-center'>
                                <FontAwesomeIcon icon={faChevronLeft} />
                                <div className='ml-2'>Back</div>
                            </div>
                        </a>
                        
                    </Link>
                </div>

                <div className='flex-grow-1'>
                    <h3>Create a new game</h3>
                </div>
            </div>

            <div className='d-flex w-100'>
                <div className=''>
                    <div className='form-group'>
                        <label>Dimension</label>
                        <select onChange={onSelectDimension} className='form-control form-control-sm'>
                            <option key='0' value='0'>Please select a dimension</option>
                            {
                                createRangeArray(5,12).map((i)=>{
                                    return(
                                        <option key={i} value={i}>{i}x{i}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className='form-group'>
                        <label>Title</label>
                        <input type='text' className='form-control form-control-sm'/>
                    </div>

                    <div className='form-group'>
                        <label>Description</label>
                        <textarea className='form-control form-control-sm'></textarea>
                    </div>
                </div>
                <div className=' flex-grow-1'>
                    {/* <Layout dimension={dimension} /> */}
                    <Layout/>
                </div>
            </div>

        </div>
    )
}