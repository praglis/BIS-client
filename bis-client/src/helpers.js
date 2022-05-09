export const
    getStringValOrElse = function (properties, fallbackVal = '') {
        return getValOrElse(properties, fallbackVal)
    }

export const
    getDateValOrElse = function (properties, fallbackVal = new Date()) {
        console.log(getValOrElse(properties, fallbackVal))
        return getValOrElse(properties, fallbackVal)
    }

/*
* returns the property value or fallback value
* EXAMPLE: for
*   properties = [a, 'b', 'c']
* will behave as
*   a?.b?.c ?? fallbackVal
* */
export const
    getValOrElse = function (properties, fallbackVal) {
        let val = properties[0]
        for (let i = 1; i < properties.length; i++) {
            if (!val) return fallbackVal
            val = val[properties[i]] ?? null
        }
        return val ?? fallbackVal
    }
