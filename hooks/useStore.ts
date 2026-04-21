import { create } from 'zustand'
type ApiData = any
type Store = {
  data: ApiData | null
  setData: (data: ApiData) => void
}

export const useStore = create<Store>((set) => ({
  data: null,
  setData: (data) => set({ data }),
}))