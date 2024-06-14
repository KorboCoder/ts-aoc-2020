import { PassportFieldsValidator, isValidPassport, isValidPassportStrict, parsePassports } from "../passport-validator";

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

    it('should count 235 valid passports for input2', () => {
        const parsedResp = parsePassports(`${__dirname}/input2.txt`);
        let ctr = 0;
        parsedResp.forEach( pass => {
            if(isValidPassport(pass)) ctr++;
        })

        expect(ctr).toBe(235);
    })

    it('should pass tests for each fields', () => {
        expect(PassportFieldsValidator['byr']('2002')).toBe(true);
        expect(PassportFieldsValidator['byr']('2003')).toBe(false);

        expect(PassportFieldsValidator['hgt']('60in')).toBe(true);
        expect(PassportFieldsValidator['hgt']('190cm')).toBe(true);
        expect(PassportFieldsValidator['hgt']('190in')).toBe(false);
        expect(PassportFieldsValidator['hgt']('190')).toBe(false);


        expect(PassportFieldsValidator['hcl']('#123abc')).toBe(true);
        expect(PassportFieldsValidator['hcl']('#123abz')).toBe(false);
        expect(PassportFieldsValidator['hcl']('123abc')).toBe(false);
        expect(PassportFieldsValidator['hcl']('#123abf')).toBe(true);

        expect(PassportFieldsValidator['ecl']('brn')).toBe(true);
        expect(PassportFieldsValidator['ecl']('wat')).toBe(false);
        expect(PassportFieldsValidator['ecl']('sdfsdf')).toBe(false);

        expect(PassportFieldsValidator['pid']('000000001')).toBe(true);
        expect(PassportFieldsValidator['pid']('0123456789')).toBe(false);
    })

    it('should count 0 valid passports for all_invalid.txt', () => {
        const parsedResp = parsePassports(`${__dirname}/all_invalid.txt`);
        let ctr = 0;
        parsedResp.forEach( pass => {
            if(isValidPassportStrict(pass)){
                ctr++;
            }
        })

        expect(ctr).toBe(0);
    })

    it('should count 4 valid passports for all_valid.txt', () => {
        const parsedResp = parsePassports(`${__dirname}/all_valid.txt`);
        let ctr = 0;
        parsedResp.forEach( pass => {
            if(isValidPassportStrict(pass)){
                ctr++;
            }
        })

        expect(ctr).toBe(4);
    })

    it('should count 4 valid passports for all_valid.txt', () => {
        const parsedResp = parsePassports(`${__dirname}/input2.txt`);
        let ctr = 0;
        parsedResp.forEach( pass => {
            if(isValidPassportStrict(pass)){
                ctr++;
            }
        })

        expect(ctr).toBe(194);
    })

})

