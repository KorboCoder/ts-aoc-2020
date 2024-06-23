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


