import { parseData, validateEncoding } from "../encoding-validator"

describe('encoding-validator.ts', () => {

    describe('validateEncoding()', () => {

        it('should equal to 127 for input1.txt',() =>{
            const data = parseData(`${__dirname}/input1.txt`)
            expect(validateEncoding(data, 5)).toEqual(127);

        })

        it('should equal to 000 for input2.txt',() =>{
            const data = parseData(`${__dirname}/input2.txt`)
            expect(validateEncoding(data, 25)).toEqual(15353384);

        })
    })

})

