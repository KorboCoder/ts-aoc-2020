
import {calcId, calculateColumnRow, parseBoardingPassInputs} from '../seat-position-calculator';

describe('set-position-calculator.ts', () => {

    describe('calculateColumnRow()', () => {
        it('get id of 567', ()=>{
            expect(calcId(calculateColumnRow('BFFFBBFRRR'))).toEqual(567);
        })
        it('get id of 119', ()=>{
            expect(calcId(calculateColumnRow('FFFBBBFRRR'))).toEqual(119);
        })
        it('get id of 820', ()=>{
            expect(calcId(calculateColumnRow('BBFFBBFRLL'))).toEqual(820);
        })

        it('get id of 820', ()=>{
            expect(calcId(calculateColumnRow('FBBFBFFRRL'))).toEqual(422);
        })
        it('test with input1.txt', ()=> {
            const inputs = parseBoardingPassInputs(`${__dirname}/input1.txt`);
            let max = 0;
            for(const data of inputs){

                const [row, col] = calculateColumnRow(data);
                const ans = calcId([row, col]);

                if(ans > max ){
                    max = ans;
                }
            }

            expect(max).toEqual(838);

        })
    })

})

