export const
    prepareCreateEventRequest = function (eventModel) {
        return `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <createEvent xmlns="http://events.bis.mil.rag/">
            <arg0 xmlns="http://events.bis.mil.rag/">
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
    <Body>
        <deleteEvent xmlns="http://events.bis.mil.rag/">
            <arg0 xmlns="">${id}</arg0>
        </deleteEvent>
    </Body>
</Envelope>`
    }

export const
    prepareGetEventRequest = function (id) {
        return `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <getEvent xmlns="http://events.bis.mil.rag/">
            <arg0 xmlns="">${id}</arg0>
        </getEvent>
    </Body>
</Envelope>`
    }

export const
    prepareUpdateEventRequest = function (eventModel) {
        return `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <updateEvent xmlns="http://events.bis.mil.rag/">
            <arg0 xmlns="">
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
    <Body>
        <getEventsForDay xmlns="http://events.bis.mil.rag/">
            <arg0 xmlns="">${date ?? ''}</arg0>
        </getEventsForDay>
    </Body>
</Envelope>`
    }

export const
    prepareGetEventsByWeekRequest = function (weekNumber) {
        console.log('[DEBUG]: prepareGetEventsByWeekRequest for weekNumber: ', weekNumber)
        return `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <getEventsForWeek xmlns="http://events.bis.mil.rag/">
            <arg0 xmlns="">${weekNumber ?? ''}</arg0>
        </getEventsForWeek>
    </Body>
</Envelope>`
    }
