export const
    prepareCreateEventRequest = function (eventModel) {
        return `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <createEvent xmlns="http://events.bis.mil.rag/">
            <arg0 xmlns="http://events.bis.mil.rag/">
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
                <date>${eventModel.date}</date>
            </arg0>
        </updateEvent>
    </Body>
</Envelope>`
    }
