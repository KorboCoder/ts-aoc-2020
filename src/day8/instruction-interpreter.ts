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



export function runProgram(instructions: Instruction[]): [number, boolean]{
    let ctr = 0

    const instructionRun = Array(instructions.length).fill(0);

    for(let i = 0; i < instructions.length;){
        if(++instructionRun[i] > 1){
            return [ctr, true]

        };
        const [cmd, count] = instructions[i];
        const funcs = {
            nop: () => {i++},
            acc: () => {ctr += count; i++;},
            jmp: () => { i+= count}

        }
        funcs[cmd]();
    }

    return [ ctr, false ];
}


export function toggleAt(instructions: Instruction[], idx: number) {

    let cmd = instructions[idx][0];
    assert(['nop', 'jmp'].includes(cmd));

    if(cmd == 'nop') cmd = 'jmp';
    else if(cmd == 'jmp') cmd = 'nop'

    instructions[idx][0] = cmd;
}


export function runProgramWithRecover(instructions: Instruction[]): number {

    let success = false;
    const targets: number[] = []
    for(let i = 0; i < instructions.length; i++){
        if(['nop', 'jmp'].includes(instructions[i][0])) targets.push(i)
    }


    for(const idx of targets){
        toggleAt(instructions, idx);
        const [ctr, isLoop] = runProgram(instructions);
        toggleAt(instructions, idx);


        if(!isLoop){
            return ctr;
        }
    }
    return -1;

}
