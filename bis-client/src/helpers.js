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
    downloadFile = function (fileName, fileData) {
        const link = document.createElement("a");
        link.innerHTML = 'Download PDF file';
        link.download = fileName;
        link.href = 'data:application/octet-stream;base64,' + fileData;

        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
            document.body.removeChild(link);
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
        console.log("[DEBUG] mapObjectPropsToStringsInArray(obj), obj = ", obj)
        obj.forEach(eventObj => {
            mapObjectPropsToStrings(eventObj)
        })
        return obj
    }

export const
    mapObjectPropsToStrings = function (eventObj) {
        console.log("[DEBUG] mapObjectPropsToStrings(eventObj), eventObj = ", eventObj)
        Object.keys(eventObj).map((key) => {
            eventObj[key] = eventObj[key]._text
        })
        return eventObj
    }
