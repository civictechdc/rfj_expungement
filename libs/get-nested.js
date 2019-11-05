// adapted from https://hackernoon.com/accessing-nested-objects-in-javascript-f02f1bd6387f

const getNestedObject = (nestedObj, pathArr) => {
    return pathArr ? pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj) : undefined
    }

export default getNestedObject