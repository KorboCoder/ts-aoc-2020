import assert from 'assert';
import * as fs from 'fs';



export function getContainsCount() {
}

const COMMANDS = ['nop', 'acc', 'jmp'] as const;
type Command = typeof COMMANDS[number]

function IsCommand(rawCmd: string) : rawCmd is Command {
    return COMMANDS.includes(rawCmd as Command);
}

type Instruction = [Command, number];

export function parseInstructions(pathToFile: string): Instruction[] {

    const instructionList: Instruction[] = [];

    const file = fs.readFileSync(pathToFile);

    const rules = file.toString().trim().split("\n");

    for(const line of rules){

        const result = line.split(' ')
        assert(result.length == 2);

        const [cmd, rawCount] = result;

        const count: number = Number.parseInt(rawCount);
        assert(!isNaN(count));


        assert(IsCommand(cmd));
        instructionList.push([cmd, count]);
    }

    return instructionList;

}



export function runProgram(instructions: Instruction[]): number{
    let ctr = 0

    const instructionRun = Array(instructions.length).fill(0);

    for(let i = 0; i < instructions.length;){
        if(++instructionRun[i] > 1) break;
        const [cmd, count] = instructions[i];
        const funcs = {
            nop: () => {i++},
            acc: () => {ctr += count; i++;},
            jmp: () => { i+= count}

        }
        funcs[cmd]();
    }

    return ctr;
}
