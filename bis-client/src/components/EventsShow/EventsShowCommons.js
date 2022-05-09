import AppTextField from "@/components/AppTextField/AppTextField";
import {getDateValOrElse, getStringValOrElse} from '@/helpers'

export const components = {
    AppTextField
}

export const labels = {
    name: 'Event name',
    type: 'Event type',
    date: 'Date',
    description: 'Description'
}

export let mockData = {
    id: 1,
    name: "Reid Compton Pivitol New Hampshire",
    type: "HungaryEventType",
    date: "2021-04-28",
    description: "LOREM IPSUM DOLOR SIT AMENT"
}

export const methods = {
    getStringValOrElse,
    getDateValOrElse
}
