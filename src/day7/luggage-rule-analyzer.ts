import * as fs from 'fs';


const BagRegex = /((?<bagCount>\d*) )?(?<bagType>[a-z][a-z\s]*) bag/g;
const BagRegexSingle = /(?<bagType>[a-z][a-z\s]*) bag/;


type BagNode = {
    name: string,
    bagSet: Set<string>,
    bagCount: Record<string, number>
}

export function getNestedContainsCount(bagNodes: BagNode[],bagType:string = 'shiny gold', countMap: Record<string, number> = {}) {

    if(bagType == 'no other') return 0;
    const idx = bagNodes.findIndex( item => item.name == bagType)

    const goldBagNode = bagNodes.splice(idx ,1)[0];

    let count = 0;

    for(const bagName of goldBagNode.bagSet){
        let res = 0;
        if(!Number.isInteger(countMap[bagName])){
            countMap[bagName] = getNestedContainsCount(bagNodes, bagName, countMap);
        }
        res = countMap[bagName]
        const mult = goldBagNode.bagCount[bagName];

        count += (res+1)*mult;
    }
    
    return count;
}


export function getContainsCount(bagNodes: BagNode[],bagType:string = 'shiny gold') {

    const starting = bagNodes.length;
    const withGoldBags = bagNodes.filter( item => item.bagSet.has(bagType));
    withGoldBags.forEach((item)=> bagNodes.splice(bagNodes.findIndex(subItem =>subItem.name == item.name),1));
    withGoldBags.forEach((item)=> getContainsCount(bagNodes, item.name));

    return starting - bagNodes.length;
}


export function parseBagRules(pathToFile: string): BagNode[] {
    const file = fs.readFileSync(pathToFile);
    const rules = file.toString().trim().split("\n");
    const nodes: BagNode[] = [];

    for(const rawRule of rules){
        const [lhs, rhs]  = rawRule.split('contain');
        const regexResult = BagRegexSingle.exec(lhs);
        if(!regexResult || !regexResult.groups) throw new Error("No lhs found");
        const lhsBagType: string = regexResult.groups.bagType;
        const rhsBagTypes: string[] = [];
        const bagCount: Record<string, number> = {};
        for(const item of rhs.matchAll(BagRegex)){
            const bagType = item.groups?.bagType;
            const bagCountRaw = item.groups?.bagCount;
            if(bagType){
                rhsBagTypes.push(bagType)
                if(bagCountRaw){
                    bagCount[bagType] = Number.parseInt(bagCountRaw);
                }
                else{
                    bagCount[bagType]  = 0
                }
            }
        }

        nodes.push({
            name: lhsBagType,
            bagSet: new Set(rhsBagTypes),
            bagCount
        });
    }

    return nodes;
}
