import * as fs from 'fs';




export function analyzeDeclaration(declarationGroup: string): number{
    let answers = new Set<string>();
    let forms = declarationGroup.split('\n')

    for(const ans of forms){
        for(const mark of ans.split('')){
            answers.add(mark);
        }

    }
    return answers.size;
}

export function parseFormGroup(pathToFile: string): string[] {
    const file = fs.readFileSync(pathToFile);
    const groups = file.toString().trim().split("\n\n");

    return groups;
}
