import { writable } from "svelte/store"

export const numberOfWhitelisted = writable(0)
export const joinedWhitelist = writable(false)
export const loading = writable(false)
