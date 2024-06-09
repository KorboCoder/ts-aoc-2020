import {promises} from 'fs';

export async function parseFile(pathToFile: string){
    const file = await promises.readFile(pathToFile);
    const result = file.toString().trim().split('\n').map((item) => Number.parseInt(item));
    result.sort((a,b) => a - b );
    return result;
}

export async function processExpenseReport(parsedReport: number[], sumToFind: number) : Promise<number | undefined>{
    let minPivot = 0;
    let maxPivot = parsedReport.length - 1;

    while(maxPivot >= minPivot){
        const currSum = parsedReport[maxPivot] + parsedReport[minPivot]
        if(currSum  === sumToFind) return parsedReport[maxPivot] * parsedReport[minPivot];
        if(currSum < sumToFind) minPivot++;
        else maxPivot--;
    }

    return undefined;
    // return Promise.reject("Unable to find sum")
    
}


export async function processExpenseReportForThree(parsedReport: number[], sumToFind: number) : Promise<number | undefined> {

    for(let i = 0; i < parsedReport.length; i++){
        let currItem = parsedReport[i];
        let resp = await processExpenseReport(parsedReport.toSpliced(i, 1), Math.abs(sumToFind - currItem))
        if(resp) return resp * currItem;
    }

    return undefined;
    // return Promise.reject("Unable to find sum")

}





