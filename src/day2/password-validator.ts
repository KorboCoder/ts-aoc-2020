import {promises} from 'fs';

interface PasswordPolicy{
    min: number;
    max: number;
    letter: string;
}


interface PasswordDatabaseRow { 
    policy: PasswordPolicy;
    pass: string;
    
}

function isPasswordDatabaseRowValid(row: PasswordDatabaseRow): boolean{
    const letterCount = row.pass.split('').reduce((total, item)=>(item === row.policy.letter ? total + 1 : total),0)
    return row.policy.min <= letterCount && row.policy.max >= letterCount
}

export async function parsePasswordDatabase(pathToFile: string): Promise<PasswordDatabaseRow[]>{

    const file = await promises.readFile(pathToFile);
    return file.toString().trim().split('\n').map((rawRow) => {

        const [rawPasswordPolicy, pass] = rawRow.split(':');
        const [rawRange, letter] = rawPasswordPolicy.split(' ');
        const [min, max] = rawRange.split('-').map((item) => Number.parseInt(item));

        return {
            policy: {
                min,
                max,
                letter
            },
            pass
        }


    })
}

export async function countValidPasswords(rows: PasswordDatabaseRow[]){
    return rows.reduce((total, item) => isPasswordDatabaseRowValid(item) ? total+1 : total,0)

}

