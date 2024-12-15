<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const { user } = storeToRefs(useUserStore())
</script>

<template>
  <div class="p-3">
    <h3 class="mb-3 text-xl font-medium">{{ $t('notifications') }}</h3>
    <UNotification
      v-if="user && !user.contactsSyncAt"
      :id="1"
      :timeout="0"
      icon="i-heroicons-exclamation-triangle"
      :title="$t('notSyncContacts')"
      :close-button="{ icon: '' }"
    />
  </div>
</template>

<style scoped></style>
