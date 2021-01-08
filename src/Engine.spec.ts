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

  it('should set a value in the board when a player plays', () => {
    const engine = new Engine()
    engine.play(0, 1)

    const actual = engine.board()

    expect(actual).toEqual([
      [null, 'o', null],
      [null, null, null],
      [null, null, null],
    ])
  })

  it('should alternate players', () => {
    const engine = new Engine()
    engine.play(0, 1)
    engine.play(0, 0)

    const actual = engine.board()

    expect(actual).toEqual([
      ['x', 'o', null],
      [null, null, null],
      [null, null, null],
    ])
  })

  it('should do nothing if a player repeat a movement already done', () => {
    const engine = new Engine()
    engine.play(0, 1)
    engine.play(0, 1)
    engine.play(0, 1)

    const actual = engine.board()

    expect(actual).toEqual([
      [null, 'o', null],
      [null, null, null],
      [null, null, null],
    ])
  })

  it('should ignore it if the movement is out of range', () => {
    const engine = new Engine()
    engine.play(5, 1)

    const actual = engine.board()

    expect(actual).toEqual([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ])
  })

  it('should return the first player as winner', () => {
    const engine = new Engine()
    engine.play(0, 0)
    engine.play(1, 0)
    engine.play(0, 1)
    engine.play(2, 0)
    engine.play(0, 2)

    const actual = engine.getTheWinner()

    expect(actual).toBe('o')
  })

  it('should return the second player as winner', () => {
    const engine = new Engine()
    engine.play(0, 0)
    engine.play(1, 0)
    engine.play(2, 1)
    engine.play(1, 1)
    engine.play(0, 2)
    engine.play(1, 2)

    const actual = engine.getTheWinner()

    expect(actual).toBe('x')
  })

  it('should not find winner', () => {
    const engine = new Engine()
    engine.play(0, 0)
    engine.play(1, 0)
    engine.play(2, 1)
    engine.play(1, 1)
    engine.play(0, 2)

    const actual = engine.getTheWinner()

    expect(actual).toBe(null)
  })
})
