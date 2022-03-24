<template>
  <div>
    <NuxtLink to="/about">
      About page
    </NuxtLink>
    <NuxtPage/>
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

<script setup lang="ts">
  const events = ref([])
  onMounted(() => {
    window.onVitalEvent && window.onVitalEvent((event) => {
      events.value.unshift(event)
      events.value = events.value.splice(0, 3 * 4)
    })
  })
</script>
