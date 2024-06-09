import {promises} from 'fs';

async function parseFile(pathToFile: string){
    const file = await promises.readFile(pathToFile);
    const result = file.toString().trim().split('\n').map((item) => Number.parseInt(item));
    return result;
}

export async function processExpenseReport(pathToReport: string, sumToFind: number) : Promise<number>{
    let parsedReport = await parseFile(pathToReport)
    let minPivot = 0;
    let maxPivot = parsedReport.length - 1;

    parsedReport.sort();
    while(maxPivot >= minPivot){
        const currSum = parsedReport[maxPivot] + parsedReport[minPivot]
        if(currSum  === sumToFind) return parsedReport[maxPivot] * parsedReport[minPivot];
        if(currSum < sumToFind) minPivot++;
        else maxPivot--;
    }

    return Promise.reject("Unable to find sum")
    
}





