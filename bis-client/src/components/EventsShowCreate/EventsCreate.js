import * as commons from '../EventsShow/EventsShowCommons.js'
import axios from "axios";
import {prepareCreateEventRequest, prepareUploadImageRequest} from "@/requests";
import {getSoapPayloadFromHttpResponse, mapObjectPropsToStrings} from "@/helpers";

export default {
    name: 'events-create',
    components: {...commons.components},
    props: [],
    data() {//todo stare dane zostają BIS-16
        return {
            title: 'Create new event',
            labels: commons.labels,
            mode: 'create',
            eventModel: JSON.parse(JSON.stringify(commons.emptyMock)),
            image: '',
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
        changeImage(img) {
            const reader = new FileReader();
            console.log("IMAGE", img)

            reader.readAsDataURL(img);
            reader.onload = () => {
                this.image = reader.result
                console.log(reader.result)
            };
        },
        submitChanges() {
            const request = prepareCreateEventRequest(this.eventModel)
            console.log('[INFO]: createEvent request', request)

            axios.post('http://localhost:8181/soap-api/events?wsdl',
                request,
                {
                    headers:
                        {'Content-Type': 'text/xml'}
                })
                .then(res => {
                    console.log('[INFO]: createEvent response', res);
                    if (this.image) {
                        let responsePayload = getSoapPayloadFromHttpResponse('createEvent', res)
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
                                this.eventModel = commons.emptyMock
                                this.$router.replace('/events')
                            })
                            .catch(err => {
                                console.log(err)
                            });
                    } else {
                        this.eventModel = commons.emptyMock
                        console.log("HEEEEEEEEEEEEEEEEE", commons.emptyMock)
                        this.$router.replace('/events')
                    }
                })
                .catch(err => {
                    this.showErrorMsg = true
                    console.log(err)
                });
        }
    }
}


