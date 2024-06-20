import { parseInstructions, runProgram } from "../instruction-interpreter";


describe('instruction-interpreter.ts', () => {

    describe('getContainsCount()', () => {

        it('check if values parsed preoperly',() =>{

            const parsedResp = parseInstructions(`${__dirname}/input1.txt`);
            expect(parsedResp[0][0]).toEqual('nop')
            expect(parsedResp[1][0]).toEqual('acc')
            expect(parsedResp[2][0]).toEqual('jmp')
            expect(parsedResp[3][0]).toEqual('acc')
            expect(parsedResp[4][0]).toEqual('jmp')
            expect(parsedResp[5][0]).toEqual('acc')
            expect(parsedResp[6][0]).toEqual('acc')
            expect(parsedResp[7][0]).toEqual('jmp')
            expect(parsedResp[8][0]).toEqual('acc')

            expect(parsedResp[0][1]).toEqual(0)
            expect(parsedResp[1][1]).toEqual(1)
            expect(parsedResp[2][1]).toEqual(4)
            expect(parsedResp[3][1]).toEqual(3)
            expect(parsedResp[4][1]).toEqual(-3)
            expect(parsedResp[5][1]).toEqual(-99)
            expect(parsedResp[6][1]).toEqual(1)
            expect(parsedResp[7][1]).toEqual(-4)
            expect(parsedResp[8][1]).toEqual(6)
        })

    })

    describe('runProgram()', () => {

        it('should get counter 5 for input1.txt',() =>{
            const parsedResp = parseInstructions(`${__dirname}/input1.txt`);
            expect(runProgram(parsedResp)).toEqual(5)
        })
        it('should get counter ?? for input2.txt',() =>{
            const parsedResp = parseInstructions(`${__dirname}/input2.txt`);
            expect(runProgram(parsedResp)).toEqual(1179)
        })

    })


})

