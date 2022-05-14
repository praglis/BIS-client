import {xml2json} from "xml-js";

export const
    getStringValOrElse = function (properties, fallbackVal = '') {
        return getValOrElse(properties, fallbackVal)
    }

export const
    getDateValOrElse = function (properties, fallbackVal = new Date()) {
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
    getWeekNumber = function (currentDate) {
        const startDate = new Date(currentDate.getFullYear(), 0, 1);
        var days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
        return Math.ceil((startDate.getDay() + days) / 7)
    }

export const //todo czemu nie użyte
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
    getSoapPayloadFromHttpResponse = function (operationName, res) {
        console.log('[INFO]:' + operationName + ' response', res);
        const jsonResponse = JSON.parse(xml2json(res.data, {compact: true}))
        console.log('[INFO]:' + operationName + ' response in JSON', jsonResponse);

        return getPayloadFromSoapJson(jsonResponse, `${operationName}Response`)
    }

export const
    getPayloadFromSoapJson = function (soapJson, responseName) {
    console.log(soapJson['soap:Envelope']['soap:Body'])
        console.log(responseName)
        return soapJson['soap:Envelope']['soap:Body'][responseName].return ?? null
    }

export const
    isArray = function (a) {
        return (!!a) && (a.constructor === Array);
    };
export const
    isObject = function (a) {
        return (!!a) && (a.constructor === Object);
    };

export const
    mapObjectPropsToStringsInArray = function (obj) {
    console.log("MAP")
        obj.forEach(eventObj => {
            mapObjectPropsToStrings(eventObj)
        })
        return obj
    }

export const
    mapObjectPropsToStrings = function (eventObj) {
    console.log("fds")
    console.log(eventObj)
        Object.keys(eventObj).map((key) => {
            eventObj[key] = eventObj[key]._text
        })
        return eventObj
    }
