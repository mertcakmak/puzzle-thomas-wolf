import React,{useRef} from 'react';
import Layout from '../../components/puzzle/GameCreator/Layout';
import {createRangeArray, createLayout, puzzleLayoutToLayoutData} from '../../components/utils';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import { useRouter } from "next/router";
import { Breadcrumb } from 'react-bootstrap';

export default function CreateGame(){
    const games =  useSelector(state=>state.games);
    const createGameParams =  useSelector(state=>state.createGame);
    const dispatch = useDispatch();
    const dimensionRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const router = useRouter();

    const onSelectDimension = (e)=>{
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

    const onClickSaveButton = ()=>{
        const dataLayout = puzzleLayoutToLayoutData(createGameParams.puzzleLayout);
        const rs = {
            name:titleRef.current.value,
            description:descriptionRef.current.value,
            layout:dataLayout,
            wolf:createGameParams.wolf,
            thomas:createGameParams.thomas,
            userCreated:true
        }

        if(dimensionRef.current.value==='0'){
            alert('Please select a dimension!');
            dimensionRef.current.focus();
            return false;
        }

        if(rs.name===''){
            alert('Please type a title value for the new game!');
            titleRef.current.focus();
            return false;
        }

        if(rs.description===''){
            alert('Please type a description value for the new game!');
            descriptionRef.current.focus();
            return false;
        }

        if(rs.thomas.row===undefined){
            alert('Please select a column for Thomas');
            return false;
        }

        if(rs.wolf.row===undefined){
            alert('Please select a column for Wolf');
            return false;
        }

        
        games.push(rs);
        const action = {
            type:actions.ON_UPDATE_GAME_DATA,
            value:games
        }
        dispatch(action);

        dimensionRef.current.value = '0';
        titleRef.current.value = '';
        descriptionRef.current.value = '';
        router.push('/');
    }

    

    return(
        <div className='container mt-5'>
            <Breadcrumb>
                <Breadcrumb.Item onClick={()=>{router.push('/')}} >Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Create New Game</Breadcrumb.Item>
            </Breadcrumb>

            
            <div className='shadow-lg rounded bg-white d-flex flex-column w-100 '>
                <div className='d-flex w-100 border-bottom p-2 pt-4'>
                    <div className='m-1'>
                        <div className='form-group'>
                            <select onChange={onSelectDimension} className='form-control form-control-sm' ref={dimensionRef}>
                                <option key='0' value='0'>Dimension</option>
                                {
                                    createRangeArray(5,12).map((i)=>{
                                        return(
                                            <option key={i} value={i}>{i}x{i}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className='m-1'>
                        <div className='form-group'>
                            <input type='text' className='form-control form-control-sm' placeholder='Game title' ref={titleRef}/>
                        </div>
                    </div>
                    <div className='m-1 flex-grow-1'>
                        <div className='form-group'>
                            <input type='text' className='form-control form-control-sm' placeholder='Description' ref={descriptionRef}/>
                        </div>
                    </div>
                    <div className='m-1'>
                        <button onClick={onClickSaveButton} className='btn btn-sm btn-dark'>Save</button>
                    </div>
                </div>    
                <Layout titleRef={titleRef} descriptionRef={descriptionRef}/>
            </div>

        </div>
    )
}