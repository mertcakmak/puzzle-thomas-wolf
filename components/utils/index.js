export const createRangeArray = (min,max)=>{
    return Array(max - min + 1).fill().map((_, idx) => min + idx);
}