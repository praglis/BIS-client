import EventsShow from "@/components/EventsShow/EventsShow.vue";
import EventsCreate from "@/components/EventsShowCreate/EventsCreate.vue";
import EventsIndex from "@/components/EventsIndex/EventsIndex.vue";

export default [
    {path: '/events/show/:id', component: EventsShow},
    // {path: '/events/edit/:id', component: EventsEdit},
    {path: '/events/create', component: EventsCreate},
    {path: '/events', component: EventsIndex},
    {path: '/', component: EventsIndex},
]
