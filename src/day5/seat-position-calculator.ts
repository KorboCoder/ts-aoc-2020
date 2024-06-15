import * as fs from 'fs';




export function calcId([row, col]: [number, number]): number{
    return row*8 + col;

}
export function calculateColumnRow(input: string): [number, number]{
    let col = 64;
    let row = 4;
    
    let resCol = 127;
    let resRow = 7;

    const tokens = input.split('');

    for(let i = 0 ; i < 7; i++){
        if(tokens[i] == 'F'){

            resCol -= col;
        }

        col /= 2;
    }

    for(let i = 0 ; i < 3; i++){
        if(tokens[7 + i] == 'L' ){
            resRow -= row;
        }
        
        row /= 2;
    }

    return [resCol, resRow]
}

export function parseBoardingPassInputs(pathToFile: string): string[] {
    const file = fs.readFileSync(pathToFile);
    const splits = file.toString().trim().split("\n");
    return splits;
}
