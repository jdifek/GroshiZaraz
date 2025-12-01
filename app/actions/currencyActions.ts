'use server'

import { revalidatePath } from 'next/cache'

export async function refreshCurrencyRates(lang: string) {
  try {
    // Инвалидируем кеш для страницы обмена валют
    revalidatePath(`/${lang}/currency-exchange`)
    
    return { success: true }
  } catch (error) {
    console.error('Error refreshing currency rates:', error)
    return { success: false, error: 'Failed to refresh rates' }
  }
}