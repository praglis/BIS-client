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

export const
    getWeekNumber = function (date) {
        const oneJan = new Date(date.getFullYear(), 0, 1);
        const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
        return Math.ceil((date.getDay() - 4 + numberOfDays) / 7)
    }

export const
    downloadFile = function (file) {
        // Create a link and set the URL using `createObjectURL`
        const link = document.createElement("a");
        link.style.display = "none";
        link.href = URL.createObjectURL(file);
        link.download = file.name;

        // It needs to be added to the DOM so it can be clicked
        document.body.appendChild(link);
        link.click();

        // To make this work on Firefox we need to wait
        // a little while before removing it.
        setTimeout(() => {
            URL.revokeObjectURL(link.href);
            link.parentNode.removeChild(link);
        }, 0);
    }

export const
    getPayloadFromSoapJson = function (soapJson, responseName) {
        return soapJson['soap:Envelope']['soap:Body'][responseName].return.event
    }
