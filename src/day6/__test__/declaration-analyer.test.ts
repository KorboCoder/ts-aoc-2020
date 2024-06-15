
import { analyzeDeclaration, parseFormGroup } from '../declaration-analyer';

describe('declaration-analyzer.ts', () => {

    describe('analyzeDeclaration()', () => {
        it('should return 11',() =>{

            const parsedResp = parseFormGroup(`${__dirname}/input1.txt`);
            let sum = 0;
            for(const declarationGroup of parsedResp){
                sum += analyzeDeclaration(declarationGroup);
            }

            expect(sum).toEqual(11);

        })

        it('should return 6170',() =>{

            const parsedResp = parseFormGroup(`${__dirname}/input2.txt`);
            let sum = 0;
            for(const declarationGroup of parsedResp){
                sum += analyzeDeclaration(declarationGroup);
            }

            expect(sum).toEqual(6170);

        })

    })

})

