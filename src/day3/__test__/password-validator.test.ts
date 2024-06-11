import { countTreeTraversals, parseTileMap } from "../tree-traversal-counter";

describe('countTreeTraversals()', () => {

    it('should get 7 for input1.txt', async () => {
        let parsedResponse = await parseTileMap(`${__dirname}/input1.txt`) ;
        expect(countTreeTraversals(parsedResponse,3 , 1)).toBe(7);
    })
    it('should get 265 for input2.txt', async () => {
        let parsedResponse = await parseTileMap(`${__dirname}/input2.txt`) ;
        expect(countTreeTraversals(parsedResponse,3 , 1)).toBe(265);
    })
    it('should get 336 for input1.txt', async () => {
        let parsedResponse = await parseTileMap(`${__dirname}/input1.txt`) ;
        expect(
            countTreeTraversals(parsedResponse,1 , 1) * 
            countTreeTraversals(parsedResponse,3 , 1) * 
            countTreeTraversals(parsedResponse,5 , 1) * 
            countTreeTraversals(parsedResponse,7 , 1) * 
            countTreeTraversals(parsedResponse,1 , 2)
        ).toBe(336);
    })

    it('should get 7 for input2.txt', async () => {
        let parsedResponse = await parseTileMap(`${__dirname}/input2.txt`) ;
        expect(
            countTreeTraversals(parsedResponse,1 , 1) * 
            countTreeTraversals(parsedResponse,3 , 1) * 
            countTreeTraversals(parsedResponse,5 , 1) * 
            countTreeTraversals(parsedResponse,7 , 1) * 
            countTreeTraversals(parsedResponse,1 , 2)
        ).toBe(3154761400);

    })
})

