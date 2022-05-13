import * as commons from '../EventsShow/EventsShowCommons.js'
import axios from "axios";
import {xml2json} from "xml-js";
import {getPayloadFromSoapJson, isArray, isObject} from "@/helpers";
import {prepareCreateEventRequest} from "@/requests";

export default {
    name: 'events-create',
    components: {...commons.components},
    props: [],
    data() {
        return {
            title: 'Create new event',
            labels: commons.labels,
            mode: 'create',
            eventModel: commons.emptyMock,
            showErrorMsg: false,
            errorMessage: 'Could not create an event.'
        }
    },
    computed: {
        eventName() {
            return this?.eventModel?.name
        },
        eventType() {
            return this?.eventModel?.type
        },
        dateModel: {
            get() {
                return this?.eventModel?.date
            },
            set(newDate) {
                this.eventModel.date = newDate
            }
        }
    },
    methods: {
        ...commons.methods,
        submitChanges() {
            const request = prepareCreateEventRequest(this.eventModel)
            console.log('[INFO]: createEvent request', request)

            axios.post('http://localhost:8181/soap-api/events?wsdl',
                request.data,
                {
                    headers: {
                        'Content-Type': 'application/xml'
                    }
                })
                .then(res => {
                    console.log('[INFO]: createEvent response', res);
                    const jsonResponse = JSON.parse(xml2json(res.data, {compact: true}))
                    console.log('[DEBUG]: getEvents response in JSON', jsonResponse);

                    let responsePayload = getPayloadFromSoapJson(jsonResponse, 'ns2:getEventsResponse')
                    if (isObject(responsePayload)) {
                        responsePayload = [responsePayload]
                    } else if (!isArray(responsePayload)) {
                        console.log('[ERROR]: Response payload is neither an object or an array.')
                        this.events = []
                        this.showErrorMsg = true
                        return
                    }
                    console.log('[INFO]: Response payload', responsePayload);
//
                    if (responsePayload) {
                        if (this.mode === 'create') this.$router.replace('/events/show/' + responsePayload.id)
                        else if (this.mode === 'edit') this.mode = 'show'
                    } else {
                        console.log('[ERROR]: Response payload is empty.')
                        this.showErrorMsg = true
                    }
                })
                .catch(err => {
                    this.showErrorMsg = true
                    console.log(err)
                });
        }
    }
}


