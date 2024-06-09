import { countValidPasswords, isPasswordDatabaseRowValidIndexes, isPasswordDatabaseRowValidRange, parsePasswordDatabase } from "../password-validator";

describe('countValidPasswords()', () => {

  it('should get 2 for input1.txt', async () => {
    let parsedResponse = await parsePasswordDatabase(`${__dirname}/input1.txt`) ;
    expect(await countValidPasswords(parsedResponse, isPasswordDatabaseRowValidRange)).toBe(2);
  })

  it('should get 2 for input2.txt', async () => {
    let parsedResponse = await parsePasswordDatabase(`${__dirname}/input2.txt`) ;
    expect(await countValidPasswords(parsedResponse, isPasswordDatabaseRowValidRange)).toBe(528);
  })

  it('should get 2 for input1.txt', async () => {
    let parsedResponse = await parsePasswordDatabase(`${__dirname}/input1.txt`) ;
    expect(await countValidPasswords(parsedResponse, isPasswordDatabaseRowValidIndexes)).toBe(1);
  })

  it('should get 2 for input2.txt', async () => {
    let parsedResponse = await parsePasswordDatabase(`${__dirname}/input2.txt`) ;
    expect(await countValidPasswords(parsedResponse, isPasswordDatabaseRowValidIndexes)).toBe(497);
  })
})

