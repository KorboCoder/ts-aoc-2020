import { isValidPassport, parsePassports } from "../passport-validator";

describe('isValidPassport()', () => {


    it('should return true for valid passport', () => {
        expect(isValidPassport({
            byr: 'value',
            iyr: 'value',
            eyr: 'value',
            hgt: 'value',
            hcl: 'value',
            ecl: 'value',
            pid: 'value',
            cid: 'value'
        })).toBeTruthy()

    })
    it('should return true for even if optionan cid is not present', () => {
        expect(isValidPassport({
            byr: 'value',
            iyr: 'value',
            eyr: 'value',
            hgt: 'value',
            hcl: 'value',
            ecl: 'value',
            pid: 'value',
        })).toBeTruthy()

    })
    it('should return false for invalid passport', () => {
        expect(isValidPassport({
            byr: 'value',
            eyr: 'value',
            hgt: 'value',
            hcl: 'value',
            ecl: 'value',
            pid: 'value',
            cid: 'value'
        })).toBeFalsy();
    })

    it('should count 2 valid passports for input1', () => {
        const parsedResp = parsePassports(`${__dirname}/input1.txt`);
        let ctr = 0;
        parsedResp.forEach( pass => {
            if(isValidPassport(pass)){
                ctr++;
            }
        })

        expect(ctr).toBe(2);
    })

    it('should count 2 valid passports for input2', () => {
        const parsedResp = parsePassports(`${__dirname}/input2.txt`);
        let ctr = 0;
        parsedResp.forEach( pass => {
            if(isValidPassport(pass)) ctr++;
        })

        expect(ctr).toBe(235);
    })

})

