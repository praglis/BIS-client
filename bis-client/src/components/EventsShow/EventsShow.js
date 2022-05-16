import * as commons from './EventsShowCommons.js'
import {
    prepareGetEventRequest,
    prepareGetImageRequest,
    prepareUpdateEventRequest,
    prepareUploadImageRequest
} from "@/requests";
import axios from "axios";
import {getSoapPayloadFromHttpResponse, mapObjectPropsToStrings} from "@/helpers";
import {xml2json} from "xml-js";

export default {
    name: 'events-show',
    components: {...commons.components},
    props: [],
    data() {
        return {
            title: 'Event details',
            labels: commons.labels,
            mode: 'show',
            eventModel: commons.emptyMock,
            image: '',
            showErrorMsg: false,
            errorMessage: 'Could not update the event.'
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
    created() {
        this.sendGetRequest(this.$route.params['id'])
    },
    methods: {
        ...commons.methods,
        changeImage(img) {
            const reader = new FileReader();
            console.log("IMAGE", img)

            reader.readAsDataURL(img);
            reader.onload = () => {
                this.image = reader.result
                console.log(reader.result)
            };
        },
        sendGetRequest(id) {
            const request = prepareGetEventRequest(id);
            console.log('[INFO]: getEvent request', request)
            axios.post('http://localhost:8181/soap-api/events?wsdl',
                request,
                {
                    headers:
                        {'Content-Type': 'text/xml'}
                })
                .then(res => {
                    let responsePayload = getSoapPayloadFromHttpResponse('getEvent', res)
                    responsePayload = mapObjectPropsToStrings(responsePayload)
                    this.eventModel = responsePayload
                    console.log('[INFO]: this.eventModel', this.eventModel);
                    const imgRequest = prepareGetImageRequest(id);
                    console.log('[INFO]: getImage request', imgRequest)
                    axios.post('http://localhost:8181/soap-api/mtom?wsdl',
                        imgRequest,
                        {
                            headers:
                                {'Content-Type': 'text/xml'}
                        })
                        .then(res => {
                            res = res.data.split('--uuid')[1].split('cxf.apache.org>')[1]
                            console.log('[INFO]: res', res);
                            let responsePayload = JSON.parse(xml2json(res, {compact: true}))
                            responsePayload = responsePayload['soap:Envelope']['soap:Body']
                            console.log('[INFO]: responsePayload', responsePayload);
                            this.image = responsePayload.downloadImageForEventResponse.return._text
                            //let format = this.image.split(',')[0]
                            this.image = this.image.replaceAll('_', '/').replaceAll('\\', '/')
                            //this.image = window.btoa(unescape(encodeURIComponent(res.data.split('PNG')[1]?.split('END')[0])))
                            //console.log('[INFO]: downloadImageForEvent response', res);
                            //let responsePayload = JSON.parse(xml2json(res, {compact: true}))
                            console.log('[INFO]: downloadImageForEvent response in JSON', this.image);
                            //responsePayload = base64.b64encode(res.read())
                            //let responsePayload = getSoapPayloadFromHttpResponse('downloadImageForEvent', res)
                            //responsePayload = mapObjectPropsToStrings(responsePayload)
                            //this.eventModel = responsePayload
                        })
                        .catch(err => {
                            console.log(err)
                        });
                })
                .catch(err => {
                    console.log(err)
                });

        },
        submitChanges() {
            console.log('[INFO]: submitChanges() preparing updateEvent request for this.eventModel', this.eventModel)
            const request = prepareUpdateEventRequest(this.eventModel);
            console.log('[INFO]: updateEvent request', request)

            axios.post('http://localhost:8181/soap-api/events?wsdl',
                request,
                {
                    headers:
                        {'Content-Type': 'text/xml'}
                })
                .then(res => {
                    let responsePayload = getSoapPayloadFromHttpResponse('updateEvent', res)
                    mapObjectPropsToStrings(responsePayload)

                    this.eventModel = responsePayload
                    this.mode = 'show'
                    console.log('[INFO]: this.eventModel', this.eventModel);
                    if (this.image) {
                        let responsePayload = getSoapPayloadFromHttpResponse('updateEvent', res)
                        responsePayload = mapObjectPropsToStrings(responsePayload)
                        this.eventModel = responsePayload
                        console.log('[INFO]: this.eventModel', this.eventModel);
                        const imgRequest = prepareUploadImageRequest(this.image.replaceAll('/', '_'), this.eventModel.id);
                        console.log('[INFO]: uploadImage request', imgRequest)
                        axios.post('http://localhost:8181/soap-api/mtom?wsdl',
                            imgRequest,
                            {
                                headers:
                                    {'Content-Type': 'text/xml'}
                            })
                            .then(res => {
                                console.log('[INFO]: uploadImageForEvent response', res);
                                this.$router.replace('/events')
                            })
                            .catch(err => {
                                console.log(err)
                            });
                    } else {
                        this.$router.replace('/events')
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.showErrorMsg = true
                });
        }
    }
}


