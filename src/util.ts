export function clamp(min:number, max:number, val:number): number {
    return Math.min(max, Math.max(min, val))
}

function ensureKeysInAscendingOrder(keys: Array<number>) {
    for (let i = 1; i < keys.length; i++)
        if (keys[i] <= keys[i-1]) throw new Error("Keys out of order")
}

function findInterpIndex(keys:Array<number>, value:number):{firstKey:number, shareNext?:number} {
    const upperIndex = keys.findIndex(val => val > value)

    if (upperIndex === 0) return {firstKey: 0}
    if (upperIndex === -1) return {firstKey: keys.length - 1}

    const lowerRow = keys[upperIndex-1]
    const upperRow = keys[upperIndex]

    const share = (value - lowerRow) / (upperRow - lowerRow);

    return {firstKey: upperIndex-1, shareNext:share}
}

export class InterpTable {
    values: Array<number>;
    keys: Array<number>;
    constructor (keys: Array<number>, values: Array<number>) {
        this.values = values;
        ensureKeysInAscendingOrder(keys);
        if (keys.length !== values.length) throw new Error("Keys and values are different lengths")
        this.keys = keys;
    }

    interp(value:number):number {
        const {firstKey, shareNext} = findInterpIndex(this.keys, value);

        if (typeof shareNext === "undefined") return this.values[firstKey];
        return linearInterp(this.values[firstKey],this.values[firstKey+1], shareNext);
    }
}


export class InterpTable2D {
    values: Array<Array<number>>;
    xKeys: Array<number>;
    yKeys: Array<number>;
    constructor (xKeys: Array<number>, yKeys: Array<number>, values: Array<Array<number>>) {
        this.values = values;
        ensureKeysInAscendingOrder(xKeys);
        ensureKeysInAscendingOrder(yKeys);

        if (yKeys.length !== values.length) throw new Error ("yKeys and value array are different lengths");
        this.values.forEach((innerArr, index) => {if (xKeys.length !== innerArr.length) throw new Error(`xKeys and inner array at index ${index} are different lengths`)});
        this.xKeys = xKeys;
        this.yKeys = yKeys;
    }

    interp(valueX:number, valueY:number):number {
        const {firstKey:xFirstKey, shareNext:xShareNext} = findInterpIndex(this.xKeys, valueX);
        const {firstKey:yFirstKey, shareNext:yShareNext} = findInterpIndex(this.yKeys, valueY);

        if (typeof yShareNext === "undefined") {
            if (typeof xShareNext === "undefined")
                return this.values[yFirstKey][xFirstKey]
            return linearInterp(this.values[yFirstKey][xFirstKey], this.values[yFirstKey][xFirstKey+1], xShareNext)
        }

        if (typeof xShareNext === "undefined")
            return linearInterp(this.values[yFirstKey][xFirstKey], this.values[yFirstKey+1][xFirstKey], yShareNext)
        
        const xFirst = linearInterp(this.values[yFirstKey][xFirstKey], this.values[yFirstKey+1][xFirstKey], yShareNext)
        const xSecond = linearInterp(this.values[yFirstKey][xFirstKey+1], this.values[yFirstKey+1][xFirstKey+1], yShareNext)

        return linearInterp(xFirst, xSecond, xShareNext)
    }
}

export function linearConversionClamp(minFrom: number, maxFrom: number, value: number, minTo: number, maxTo: number): number {
    return clamp (minTo, maxTo, linearConversion(minFrom, maxFrom, value, minTo, maxTo))
}

export function linearConversion(minFrom: number, maxFrom: number, value: number, minTo: number, maxTo: number): number {
    if (value === minFrom) return minTo;
    const gradient = (maxTo - minTo) / (maxFrom - minFrom);
    return minTo + gradient * (value - minFrom);
}

export function linearInterp(minTo: number, maxTo: number, frac:number): number {
    return minTo + (maxTo - minTo) * frac
}