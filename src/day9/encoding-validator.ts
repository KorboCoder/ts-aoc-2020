import assert from 'assert';
import * as fs from 'fs';




export function parseData(pathToFile: string): number[] {

    const file = fs.readFileSync(pathToFile);

    const rawData: string[] = file.toString().trim().split("\n");

    const encodingList = rawData.map((item) => {
        const res = Number.parseInt(item);
        assert(!Number.isNaN(res));
        return res; 
    });


    return encodingList;

}


export function findWeakness(data: number[], target: number): number {


    let minIdx = 0;
    let maxIdx = 1;

    let currentSum = data[minIdx] + data[maxIdx];

    while(maxIdx < data.length){
        if(currentSum < target){
            maxIdx++
            currentSum = currentSum + data[maxIdx];
        }
        else if(currentSum > target){

            currentSum = currentSum - data[minIdx];
            minIdx++;
        }
        else{
            const slice = data.slice(minIdx, maxIdx+1);
            let min = Math.min(...slice)
            let max = Math.max(...slice)
            return min + max;
        }


    }


    return -1
}



export function validateEncoding(data: number[], preambleSize: number): number {

    for(let i = preambleSize;  i < data.length; i++){
        let isValid = false;
        for(let j = i - preambleSize; j < i; j++){
            const findVal = Math.abs(data[i]  - data[j]);
            for(let k = j; k < i; k++){
                if(findVal == data[k]){
                    isValid = true;
                    k = j = i;
                }
            }
            
        }

        if(!isValid) return data[i];
    }
    

    return -1;
}


