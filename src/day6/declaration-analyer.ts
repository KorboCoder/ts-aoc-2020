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

export function analyzeDeclarationForCommon(declarationGroup: string): number{
    let answers: Record<string, number> = {}
    let forms = declarationGroup.split('\n')

    for(const ans of forms){
        for(const mark of ans.split('')){
            if(answers[mark] !== undefined){
                
                answers[mark]++;

            }
            else{
                answers[mark] = 1
            }
        }

    }
    return Object.values(answers).reduce(
        (total, val)=> val == forms.length ? total + 1 : total,
        0
    );
}

export function parseFormGroup(pathToFile: string): string[] {
    const file = fs.readFileSync(pathToFile);
    const groups = file.toString().trim().split("\n\n");

    return groups;
}
