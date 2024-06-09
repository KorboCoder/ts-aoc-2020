import { processExpenseReport } from '../process-expense-report'

describe('processExpenseReport()', () => {

  it('should get 514579 for input1.txt', async () => {
    expect(await processExpenseReport(`${__dirname}/input1.txt`,2020)).toBe(514579)
  })

  it('should get 866436 for input2.txt', async () => {
    expect(await processExpenseReport(`${__dirname}/input2.txt`,2020)).toBe(866436)
  })
})
