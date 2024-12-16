<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const { user } = storeToRefs(useUserStore())
const { t } = useI18n()

const systemNotifications = computed(() => {
  return [
    { title: t('notSyncCalendar'), isShow: user.value && !user.value.calendarSyncAt },
    { title: t('notSyncContacts'), isShow: user.value && !user.value.contactsSyncAt }
  ].filter(notification => notification.isShow)
})
</script>

<template>
  <div class="p-3">
    <h3 class="mb-3 text-xl font-medium">{{ $t('notifications') }}</h3>

    <div class="flex flex-col space-y-2">
      <UNotification
        v-for="(notification, index) in systemNotifications"
        :id="index"
        :timeout="0"
        icon="i-heroicons-exclamation-triangle"
        :title="notification.title"
        :close-button="{ icon: '' }"
      />
    </div>

  </div>
</template>

<style scoped></style>
