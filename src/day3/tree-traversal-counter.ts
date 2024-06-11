import {promises} from 'fs';

type Tile = '.' | '#';

type TileRow = Tile[];

type TileMap = TileRow[];


export async function parseTileMap(pathToFile: string): Promise<TileMap>{

    const file = await promises.readFile(pathToFile);
    return file.toString().trim().split('\n').map(row => row.split('')) as TileMap;
    // rawRows.forEach((item: string)=> {
    //     let row: TileRow = []
    //     item.split('').forEach( (rawTile: string) => {
    //         row.push(rawTile)
    //     });
    //
    //
    //     
    // });

}

export function countTreeTraversals(tileMap: TileMap, row: number, col: number): number{
    const len = tileMap.length;
    const wid = tileMap[0].length;
    let ctr = 0;

    let j = 0;
    for(let i = 0; i < len; i += col){
        if(tileMap[i][j] === '#') ctr++;
        j = (j + row) % wid;
    }
    return ctr;
}
