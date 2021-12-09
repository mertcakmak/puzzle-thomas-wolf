import React from 'react';
import Column from "./Column";

export default function Row(props){
    const { columns, dimension } = props;

    return(
        <div className='d-flex'>
            {columns.map((item)=>{
                return(
                    <Column key={`${item.row}-${item.column}`} params={item} dimension={dimension}  />
                )
            })}
        </div>
    )
}