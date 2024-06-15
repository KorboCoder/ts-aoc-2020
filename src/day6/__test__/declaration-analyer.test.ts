
import { analyzeDeclaration, analyzeDeclarationForCommon, parseFormGroup } from '../declaration-analyer';

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

    describe('analyzeDeclarationForCommon()', () => {
        it('should return 6',() =>{

            const parsedResp = parseFormGroup(`${__dirname}/input1.txt`);
            let sum = 0;
            for(const declarationGroup of parsedResp){
                sum += analyzeDeclarationForCommon(declarationGroup);
            }

            expect(sum).toEqual(6);

        })

        it('should return 2947',() =>{

            const parsedResp = parseFormGroup(`${__dirname}/input2.txt`);
            let sum = 0;
            for(const declarationGroup of parsedResp){
                sum += analyzeDeclarationForCommon(declarationGroup);
            }

            expect(sum).toEqual(2947);

        })

    })
})

