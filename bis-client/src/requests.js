export const
    prepareCreateEventRequest = function (eventModel) {
        return `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <createEvent xmlns="http://events.bis.mil.rag/">
            <arg0>
                <name>${eventModel.name}</name>
                <type>${eventModel.type}</type>
                <description>${eventModel.description}</description>
                <date>${eventModel.date}</date>
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
            <arg0>${id}</arg0>
        </deleteEvent>
    </Body>
</Envelope>`
    }

export const
    prepareGetEventRequest = function (id) {
        return `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <getEvent xmlns="http://events.bis.mil.rag/">
            <arg0>${id}</arg0>
        </getEvent>
    </Body>
</Envelope>`
    }

export const
    prepareGetAllEventsRequest = function () {
        return `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <getEvents xmlns="http://events.bis.mil.rag/"/>
    </Body>
</Envelope>
`
    }

export const
    prepareUpdateEventRequest = function (eventModel) {
        return `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <updateEvent xmlns="http://events.bis.mil.rag/">
            <arg0>
                <id>${eventModel.id}</id>
                <name>${eventModel.name}</name>
                <type>${eventModel.type}</type>
                <description>${eventModel.description}</description>
                <date>${eventModel.date}</date>
            </arg0>
        </updateEvent>
    </Body>
</Envelope>`
    }
