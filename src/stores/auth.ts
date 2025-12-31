import type { UserType } from "@/types/global.type";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    const user = ref<UserType | null>(null)
    const setUser = (data: UserType) => {
        user.value = data
    }
    const removeUser = () => {
        user.value = null
    }
    return { user, setUser, removeUser }
}, {
    persist: true
})