// lib/getZodiakByDate.ts
import { supabase } from './supabaseClient-prod'

export async function getZodiakByDate(date: string) {
  const { data, error } = await supabase
    .from('zodiak_arsip')
    .select('*')
    .eq('tanggal', date)
    .single()

  if (error) throw error
  return data?.data || []
}
