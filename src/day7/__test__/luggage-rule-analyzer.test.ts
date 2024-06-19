
import { getContainsCount, getNestedContainsCount, parseBagRules } from '../luggage-rule-analyzer';

describe('luggage-ruler-analyazer.ts', () => {

    describe('getContainsCount()', () => {

        it('should return 4',() =>{

            const parsedResp = parseBagRules(`${__dirname}/input1.txt`);

            expect(getContainsCount(parsedResp)).toEqual(4);

        })

        it('should return 592',() =>{

            const parsedResp = parseBagRules(`${__dirname}/input2.txt`);

            expect(getContainsCount(parsedResp)).toEqual(229);

        })


    })
    describe('getNestedContainsCount()', () => {

        it('should return 126',() =>{

            const parsedResp = parseBagRules(`${__dirname}/input3.txt`);

            expect(getNestedContainsCount(parsedResp)).toEqual(126);

        })

        it('should return 32',() =>{

            const parsedResp = parseBagRules(`${__dirname}/input4.txt`);

            expect(getNestedContainsCount(parsedResp)).toEqual(32);

        })

        it('should return 6683',() =>{

            const parsedResp = parseBagRules(`${__dirname}/input2.txt`);

            expect(getNestedContainsCount(parsedResp)).toEqual(6683);

        })


    })

})

