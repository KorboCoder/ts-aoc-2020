
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

        it('calculate missing boarding pass', ()=> {
            const inputs = parseBoardingPassInputs(`${__dirname}/input1.txt`);

            let map = new Array<boolean>( 128*8 );
            for(const data of inputs){

                const [row, col] = calculateColumnRow(data);
                const ans = calcId([row, col]);
                map[ans] = true;

            }

            let trigger = false;
            let ctr = 0;
            for(const flag of map){
                if(!trigger){
                    if(flag){
                        trigger = true;
                    }

                }
                else{
                    if(!flag){
                        break;
                    }
                }
                ctr++;


            }

            expect(ctr).toEqual(714);

        })
    })

})

