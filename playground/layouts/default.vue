<template>
  <div>
    <Nuxt />
    <hr>
    <div>
      Metrics:
      <ul>
        <li v-for="(event, index) of events" :key="index">
          [{{ event.metric.name }}] {{ event.context.fullPath }} {{ event.metric.value }} ({{ event.date.toUTCString() }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      events: []
    }
  },
  mounted () {
    window.onVitalEvent && window.onVitalEvent((event) => {
      this.events.unshift(event)
      this.events = this.events.splice(0, 3 * 4)
    })
  }
}
</script>
