import * as fs from 'fs';


type Passport  = {
    byr?: string;
    iyr?: string;
    eyr?: string;
    hgt?: string;
    hcl?: string;
    ecl?: string;
    pid?: string;
    cid?: string;
}



function ValidateYearRange(raw:string, min: number, max: number): boolean {
    if(raw.length != 4) return false;
    const year = Number.parseInt(raw)
    if(!year) return false;
    if(year < min || year > max) return false;
    return true;
}

function ValidateHeightAndUnit(raw: string): boolean {
    const regex = /^(\d*)(in|cm)$/;
    const res = regex.exec(raw);
    if(!res) return false;
    const rawHeight = res.at(1);
    if(!rawHeight) return false;
    const height = Number.parseInt(rawHeight);
    const unit = res.at(2);
    if(!unit) return false
    if(unit == 'cm' && (height < 150 || height > 193)) return false;
    if(unit == 'in' && (height < 59 || height > 76)) return false;
    return true
}

type ValidatorFunc = (param: string) => boolean;
export const PassportFieldsValidator: Record< keyof Passport, ValidatorFunc> = {
    byr: (param: string) => ValidateYearRange(param, 1920, 2002),
    iyr: (param: string) => ValidateYearRange(param, 2010, 2020),
    eyr: (param: string) => ValidateYearRange(param, 2020, 2030),
    hgt: (param: string) => ValidateHeightAndUnit(param),
    hcl: (param: string) => /^#[\da-f]{6}$/.test(param),
    ecl: (param: string)  => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(param),
    pid: (param: string) => /^\d{9}$/.test(param),
    cid: (_: string) => true
}



const PASSPORT_KEYS: (keyof Passport)[] = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid",
    "cid"
]


export function isValidPassport(passport: Passport): boolean{

    let filteredKeys = PASSPORT_KEYS
        .filter(item => item != "cid");
    for(let key of filteredKeys){
        if(!passport[key as keyof Passport]){
            return false
        }
    }
    return true;
}
export function isValidPassportStrict(passport: Passport): boolean{

    let filteredKeys = PASSPORT_KEYS
    .filter(item => item != "cid");

    return filteredKeys.every((key) => {
        const value = passport[key]
        return value && PassportFieldsValidator[key](value)
    });
}

function checkIsPassportKey(key: string) : key is keyof Passport{
    return (PASSPORT_KEYS as string[]).includes(key);
}

export function parsePassports(pathToFile: string): Passport[] {
    
    const passportList: Passport[] = []

    const file = fs.readFileSync(pathToFile);
    const splits = file.toString().split("\n\n")
    splits.map(item => {
        let passport: Passport = {} as Passport;
        const rawPass = item.replaceAll('\n', ' ').split(' ')
        rawPass.forEach(field =>{
            const [key, value] = field.split(':')

            if (checkIsPassportKey(key)){
                passport[key] = value;
            }

        })

        passportList.push(passport);
    })
    return passportList;
}
