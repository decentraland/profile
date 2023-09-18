const namesRegex = /^([a-zA-Z09]+)(\.dcl\.eth)?$/

export const isNameValid = (name: string) => namesRegex.test(name)
