import { format } from 'date-fns'
import zodiakData from '@/data/zodiak.json'
import { supabase } from './supabaseClient-prod'

export async function saveTodayZodiakToSupabase() {
  const today = format(new Date(), 'yyyy-MM-dd')

  // Cek apakah data untuk hari ini sudah ada
  const { data: existing, error: readError } = await supabase
    .from('zodiak_arsip')
    .select('*')
    .eq('tanggal', today)
    .single()

  if (existing) return console.log('Sudah ada arsip zodiak untuk hari ini.')
  if (readError && readError.code !== 'PGRST116') throw readError

  // Simpan data
  const { error } = await supabase.from('zodiak_arsip').insert([
    {
      tanggal: today,
      data: zodiakData,
    },
  ])

  if (error) throw error
  console.log('Zodiak hari ini berhasil disimpan ke Supabase')
}
