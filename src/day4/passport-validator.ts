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
