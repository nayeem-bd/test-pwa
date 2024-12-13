<template>
  <div class="flex items-center gap-2">
    <ColorModeDropdown />
    <DropdownMenu v-if="authStore.user">
      <DropdownMenuTrigger as-child>
        <Button
          variant="ghost"
          class="relative flex h-12 cursor-pointer items-center gap-2 rounded-lg border bg-secondary p-3"
        >
          <Avatar v-if="authStore.user.avatar" class="h-8 w-8">
            <AvatarImage
              :src="authStore.user?.avatar"
              :alt="'@' + authStore.user?.name"
            />
            <AvatarFallback>{{ authStore.user?.merchant_name }}</AvatarFallback>
          </Avatar>
          <Icon v-else icon="mdi:user" class="w-7 h-7" />
          <div class="font-medium">{{ authStore.user?.merchant_name }}</div>
          <!--          <div class="font-medium">Test Merchant</div>-->
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        class="w-56"
        align="end"
      >
        <DropdownMenuLabel class="flex font-normal">
          <div class="flex flex-col space-y-1">
            <p class="text-sm font-medium leading-none">{{ authStore.user?.name }}</p>
            <p class="text-xs leading-none text-muted-foreground">{{ authStore.user?.email }}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
<!--          <DropdownMenuItem> Profile </DropdownMenuItem>-->
          <DropdownMenuItem v-if="!(authStore.user.type && authStore.user.type === 'operator')">
            <router-link :to="{ name: 'PaymentInfo' }"> Payment Info </router-link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <router-link :to="{ name: 'ChangePassword' }"> Change Password </router-link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <router-link :to="{ name: 'Operators' }"> Operators </router-link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="authStore.logOut"> Log out </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
<script setup>
import { useAuthStore } from '@/app/auth/authStore';
import ColorModeDropdown from '@/components/ColorModeDropdown.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Icon } from "@iconify/vue";

const authStore = useAuthStore();
</script>
