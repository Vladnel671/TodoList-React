import {ActionType, salaryReducer, StateType, sub, sum} from "./tasks";

test('sum', () => {
    const salary: number = 800
    const n: number = 200
    const result = sum(salary, n)
    expect(result).toBe(1000)

})
test('sub', () => {
    expect(sub(1200, 200)).toBe(1000)
    expect(sub(0, 0)).toBe(0)
})

test('case SUM of salaryReducer', () => {
    const salary: StateType = 800
    const action: ActionType = {
        type: 'SUM',
        n: 200
    }
    const testAction: ActionType = {
        type: 'TEST',
        n: 200
    }
    const result = salaryReducer(salary, action)
    expect(result).toBe(1000)
    expect(salaryReducer(salary, testAction)).toBe(salary)
})
test('case SUB of salaryReducer', () => {
    const salary: StateType = 800
    const action: ActionType = {
        type: 'SUB',
        n: 200
    }

    const result = salaryReducer(salary, action)
    expect(result).toBe(600)
})
test('case DIV of salaryReducer', () => {
    const salary: StateType = 800
    const action: ActionType = {
        type: 'DIV',
        n: 200
    }

    const result = salaryReducer(salary, action)
    expect(result).toBe(4)
})
test('case MULT of salaryReducer', () => {
    const salary: StateType = 800
    const action: ActionType = {
        type: 'MULT',
        n: 200
    }

    const result = salaryReducer(salary, action)
    expect(result).toBe(160000)
})
