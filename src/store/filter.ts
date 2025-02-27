import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { addDays } from 'date-fns'

interface FilterState {
  startTime: Date
  endTime: Date
  countries: string[]
  gbgfs: string[]
  setDateRange: (start: Date, end: Date) => void
  toggleCountry: (country: string) => void
  toggleGbgf: (gbgf: string) => void
  reset: () => void
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set, get) => ({
      startTime: new Date(),
      endTime: addDays(new Date(), 7),
      countries: [],
      gbgfs: [],
      
      setDateRange: (start: Date, end: Date) => {
        set({ startTime: start, endTime: end })
        console.log('Filter Store Updated:', {
          startTime: start,
          endTime: end,
          store: useFilterStore.getState()
        })
      },

      toggleCountry: (country: string) => {
        const currentCountries = get().countries
        const newCountries = currentCountries.includes(country)
          ? currentCountries.filter(c => c !== country)
          : [...currentCountries, country]
        
        set({ countries: newCountries })
        console.log('Countries Updated:', newCountries)
      },
      
      toggleGbgf: (gbgf: string) => {
        const currentGbgfs = get().gbgfs
        const newGbgfs = currentGbgfs.includes(gbgf)
          ? currentGbgfs.filter(g => g !== gbgf)
          : [...currentGbgfs, gbgf]
        
        set({ gbgfs: newGbgfs })
        console.log('GBGFs Updated:', newGbgfs)
      },
      
      reset: () => set({
        startTime: new Date(),
        endTime: addDays(new Date(), 7),
        countries: [],
        gbgfs: []
      })
    }),
    {
      name: 'filter-storage'
    }
  )
)