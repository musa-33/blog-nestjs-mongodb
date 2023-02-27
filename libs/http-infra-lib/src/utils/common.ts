// password reg
export const PASSWORD_RULE: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-+]).{8,}$/;
export const PASSWORD_MESSAGE: object = { message: 'Password should have 1 upper case, lowercase letter along with a number and special character.' }

// remove from database return object 
export const SELECT: string = '-__v -createdAt -updatedAt';
export const CREATED_AT_SELECT: string = '-__v -updatedAt';
export const NOTIFICATION: string = 'NOTIFICATION'
