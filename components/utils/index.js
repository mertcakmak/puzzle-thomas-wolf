export const createRangeArray = (min,max)=>{
    return Array(max - min + 1).fill().map((_, idx) => min + idx);
}

export const createLayout = (dimension=0)=>{
    const rs = [];
    if(parseInt(dimension)>0){
        for(let i=1; i<=dimension; i++){
            rs[i-1]
            if(!rs[i-1]) { rs[i-1] = []; }
            for(let k=1; k<=dimension; k++){
                const item ={row: i,column:k,borders:''};
                rs[i-1].push(item);
            } 
        }
    }
    return rs;
}