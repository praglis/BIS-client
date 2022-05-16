const authorizedHeader = '<Header>\n' +
    '        <WS-Security-Username>BIS-client</WS-Security-Username>\n' +
    '        <WS-Security-Password>Runner78910</WS-Security-Password>\n' +
    '    </Header>'

export const
    prepareCreateEventRequest = function (eventModel) {
        return `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
${authorizedHeader}
    <Body>
        <createEvent xmlns="http://events.bis.mil.rag/">
            <arg0>
                <name>${eventModel.name}</name>
                <type>${eventModel.type}</type>
                <description>${eventModel.description}</description>
                <date>${eventModel.date ?? ''}</date>
            </arg0>
        </createEvent>
    </Body>
</Envelope>`
    }

export const
    prepareDeleteEventRequest = function (id) {
        return `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
${authorizedHeader}
    <Body>
        <deleteEvent xmlns="http://events.bis.mil.rag/">
            <arg0>${id}</arg0>
        </deleteEvent>
    </Body>
</Envelope>`
    }

export const
    prepareGetEventRequest = function (id) {
        return `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
${authorizedHeader}
    <Body>
        <getEvent xmlns="http://events.bis.mil.rag/">
            <arg0>${id}</arg0>
        </getEvent>
    </Body>
</Envelope>`
    }

export const
    prepareGetImageRequest = function (id) {
        return `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
            ${authorizedHeader}
            <Body>
                <downloadImageForEvent xmlns="http://mtom.bis.mil.rag/">
                    <arg0>${id}</arg0>
                </downloadImageForEvent>
            </Body>
        </Envelope>`
    }

export const
    prepareGetAllEventsRequest = function () {
        console.log('[DEBUG] prepareGetAllEventsRequest authorizedHeader', authorizedHeader)
        return `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
${authorizedHeader}
    <Body>
        <getEvents xmlns="http://events.bis.mil.rag/"/>
    </Body>
</Envelope>
`
    }

export const
    prepareUploadImageRequest = function (image, id) {
    return `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    ${authorizedHeader}
    <Body>
        <uploadImageForEvent xmlns="http://mtom.bis.mil.rag/">
            <arg0>${image}</arg0>
            <arg1>${id}</arg1>
        </uploadImageForEvent>
    </Body>
</Envelope>`
    }

export const
    prepareUpdateEventRequest = function (eventModel) {
        return `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
${authorizedHeader}
    <Body>
        <updateEvent xmlns="http://events.bis.mil.rag/">
            <arg0>
                <id>${eventModel.id}</id>
                <name>${eventModel.name}</name>
                <type>${eventModel.type}</type>
                <description>${eventModel.description}</description>
                <date>${eventModel.date ?? ''}</date>
            </arg0>
        </updateEvent>
    </Body>
</Envelope>`
    }

export const
    prepareGetEventsByDayRequest = function (date) {
        console.log('[DEBUG]: prepareGetEventsByDayRequest for date: ', date)
        return `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    ${authorizedHeader}
    <Body>
        <getEventsForDay xmlns="http://events.bis.mil.rag/">
            <arg0>${date ?? ''}</arg0>
        </getEventsForDay>
    </Body>
</Envelope>`
    }

export const
    prepareGetEventsByWeekRequest = function (weekNumber, year) {
        return `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
${authorizedHeader}
    <Body>
        <getEventsForWeek xmlns="http://events.bis.mil.rag/">
            <arg0>
                <week>${weekNumber}</week>
                <year>${year}</year>
            </arg0>
        </getEventsForWeek>
    </Body>
</Envelope>`
    }
