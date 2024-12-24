<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const { user } = storeToRefs(useUserStore())
</script>

<template>
  <div class="w-full p-3">
    <h3 class="mb-3 font-medium ~text-base/xl">{{ $t('notifications') }}</h3>

    <div class="flex flex-col space-y-2">
      <UNotification
        v-if="user && !user.contactsSyncAt"
        :id="0"
        :timeout="0"
        icon="i-heroicons-exclamation-triangle"
        :title="$t('notSyncContacts')"
        :close-button="{ icon: '' }"
      />
      <div v-else class="flex flex-1 flex-col items-center justify-center px-6 py-14 sm:px-14">
        <p class="text-center text-sm text-gallery-300 dark:text-gallery-400">{{ $t('noItems') }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
