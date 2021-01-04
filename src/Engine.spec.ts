import { Engine } from './Engine'

describe('Engine', () => {
  it('should start with an empty board', () => {
    const engine = new Engine()
    const actual = engine.board()

    expect(actual).toEqual([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ])
  })
})
