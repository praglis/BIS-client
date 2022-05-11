import EventsList from "@/components/EventsList/EventsList.vue";
import EventsFilter from "@/components/EventsFilter/EventsFilter.vue";
import {downloadFile, getPayloadFromSoapJson} from "@/helpers";
import axios from "axios";
import {xml2json} from "xml-js";

export default {
    name: 'events-index',
    components: {
        EventsList,
        EventsFilter
    },
    props: [],
    data() {
        return {
            events: [],
            fetchedEvents: [
                {
                    id: 1,
                    "name": "Reid Compton Pivitol New Hampshire",
                    "type": "HungaryEventType",
                    "date": "2021-04-28T05:03:26 -02:00"
                },
                {
                    id: 2,
                    "name": "Margo Cash Adornica Hawaii",
                    "type": "MauritaniaEventType",
                    "date": "2017-04-04T01:03:23 -02:00"
                },
                {
                    id: 3,
                    "name": "Franklin Gaines Applidec Virginia",
                    "type": "GuatemalaEventType",
                    "date": "2017-02-20T03:27:33 -01:00"
                },
                {
                    id: 4,
                    "name": "Sheryl Black Vortexaco Palau",
                    "type": "PeruEventType",
                    "date": "2017-09-17T11:57:16 -02:00"
                },
                {
                    id: 5,
                    "name": "Carmen Hanson Iplax Pennsylvania",
                    "type": "TajikistanEventType",
                    "date": "2014-11-11T02:33:27 -01:00"
                },
                {
                    id: 6,
                    "name": "Gregory Beasley Brainclip Virgin Islands",
                    "type": "Burkina FasoEventType",
                    "date": "2017-07-28T10:43:02 -02:00"
                }
            ],
            lastRequestInfo: null
        }
    },
    computed: {},
    methods: {
        sendFilteredRequest(requestInfo) {
            this.lastRequestInfo = requestInfo
            console.log('sendFilteredRequest() param requestInfo = ', requestInfo)
            switch (requestInfo.filterType) {
                case 'NONE':
                    this.sendGetAllRequest()
                    break;
                case 'DAY':
                    this.sendGetByDayRequest(requestInfo.day)
                    break;
                case 'WEEK':
                    this.sendGetByWeekRequest(requestInfo.weekNumber)
                    break;

            }
        },
        sendGetAllRequest() {

            axios.get('requests/getEventsRequest.xml')
                .then(getEventsRequest => {
                    console.log('getEvents request', getEventsRequest.data)
                    axios.post('http://localhost:8181/soap-api/events?wsdl',
                        getEventsRequest.data,
                        {
                            headers:
                                {'Content-Type': 'text/xml'}
                        })
                        .then(res => {
                            console.log('getEvents response', res);
                            const jsonResponse = JSON.parse(xml2json(res.data, {compact: true}))

                            const responsePayload = getPayloadFromSoapJson(jsonResponse, 'getEventsResponse')
                            responsePayload.forEach(eventObj => {
                                Object.keys(eventObj).map((key) => {
                                    eventObj[key] = eventObj[key]._text
                                })
                            })
                            console.log('response payload', responsePayload);

                            this.events = responsePayload
                        })
                        .catch(err => {
                            console.log(err)
                        });
                })
        },
        sendGetByDayRequest(day) {
            console.log('Request: getEventsByDay, day = ', day)
            console.log('Response: getEventsByDay, events = ', this.fetchedEvents)
            return this.fetchedEvents
        },
        sendGetByWeekRequest(weekNumber) {
            console.log('Request: getEventsByDay, week number = ', weekNumber)
            console.log('Response: getEventsByDay, events = ', this.fetchedEvents)
            return this.fetchedEvents
        },
        sendGetPdfRequest(requestParams) {
            console.log('Request: getPdf, requestParams = ', {requestParams})
            const file = new File([], 'samplePdf', {type: 'application/pdf'});
            console.log('Response: getPdf, PDF = ', file)
            downloadFile(file)
        },
        preparePdfRequestParams() {
            return this.lastRequestInfo
        }
    }
}
