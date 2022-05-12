import EventsList from "@/components/EventsList/EventsList.vue";
import EventsFilter from "@/components/EventsFilter/EventsFilter.vue";
import {getPayloadFromSoapJson, isArray, isObject, mapObjectPropsToStringsInArray} from "@/helpers";
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
            lastRequestInfo: null,
            noEventsFound: 'No events found.',
            showNoEventsMsg: false,
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
                            console.log('getEvents response in JSON', jsonResponse);

                            let responsePayload = getPayloadFromSoapJson(jsonResponse, 'ns2:getEventsResponse')
                            if (isObject(responsePayload)) {
                                responsePayload = [responsePayload]
                            } else if (!isArray(responsePayload)) {
                                console.log('ERROR: Response payload is neither an object or an array.')
                                this.events = []
                                this.showNoEventsMsg = true
                                return
                            }
                            console.log('response payload1', responsePayload);

                            if (responsePayload) {
                                responsePayload = mapObjectPropsToStringsInArray(responsePayload)
                                this.events = responsePayload
                            } else {
                                this.events = []
                                this.showNoEventsMsg = true
                            }
                            console.log('response payload2', responsePayload);
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
        sendGetPdfRequest() {
            let fileData;
            axios.get('requests/generatePdf.xml')
                .then(generatePdf => {
                    console.log('Request: generatePdf')
                    axios.post('http://localhost:8181/soap-api/events?wsdl',
                        generatePdf.data,
                        {
                            headers:
                                {'Content-Type': 'text/xml'}
                        })
                        .then(res => {
                            console.log('generatePdf response', res);
                            fileData = res.data.split('<return>')[1].split('</return>')[0]
                            console.log(res)
                            var link = document.createElement('a');
                            link.innerHTML = 'Download PDF file';
                            link.download = 'file.pdf';
                            link.href = 'data:application/octet-stream;base64,' + fileData;
                            document.body.appendChild(link);
                            link.click();
                            setTimeout(() => {
                                document.body.removeChild(link);
                            }, 0);
                        })
                        .catch(err => {
                            console.log(err)
                        });
                })
        },
        preparePdfRequestParams() {
            return this.lastRequestInfo
        }
    }
}
