import { processExpenseReport, processExpenseReportForThree , parseFile } from '../process-expense-report'

describe('processExpenseReport()', () => {

  it('should get 514579 for input1.txt', async () => {
    let parsedResponse = await parseFile(`${__dirname}/input1.txt`) ;
    expect(await processExpenseReport(parsedResponse,2020)).toBe(514579)
  })

  it('should get 866436 for input2.txt', async () => {
    let parsedResponse = await parseFile(`${__dirname}/input2.txt`) ;
    expect(await processExpenseReport(parsedResponse,2020)).toBe(866436)
  })
})

describe('processExpenseReportForThree()', () => {

  it('should get 514579 for input1.txt', async () => {
    let parsedResponse = await parseFile(`${__dirname}/input1.txt`) ;
    expect(await processExpenseReportForThree(parsedResponse,2020)).toBe(241861950)
  })

  it('should get 866436 for input2.txt', async () => {
    let parsedResponse = await parseFile(`${__dirname}/input2.txt`) ;
    expect(await processExpenseReportForThree(parsedResponse,2020)).toBe(276650720)
  })
})
