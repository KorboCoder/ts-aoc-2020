import { countValidPasswords, parsePasswordDatabase } from "../password-validator";

describe('countValidPasswords()', () => {

  it('should get 2 for input1.txt', async () => {
    let parsedResponse = await parsePasswordDatabase(`${__dirname}/input1.txt`) ;
    expect(await countValidPasswords(parsedResponse)).toBe(2);
  })

  it('should get 2 for input2.txt', async () => {
    let parsedResponse = await parsePasswordDatabase(`${__dirname}/input2.txt`) ;
    expect(await countValidPasswords(parsedResponse)).toBe(528);
  })
})

// describe('processExpenseReportForThree()', () => {
//
//   it('should get 514579 for input1.txt', async () => {
//     let parsedResponse = await parsePasswordDatabase(`${__dirname}/input1.txt`) ;
//     expect(await processExpenseReportForThree(parsedResponse,2020)).toBe(241861950)
//   })
//
//   it('should get 866436 for input2.txt', async () => {
//     let parsedResponse = await parsePasswordDatabase(`${__dirname}/input2.txt`) ;
//     expect(await processExpenseReportForThree(parsedResponse,2020)).toBe(276650720)
//   })
// })
