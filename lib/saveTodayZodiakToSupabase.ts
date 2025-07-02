import { createClient } from "@supabase/supabase-js";
import { format } from "date-fns";
import zodiakData from "@/data/zodiak.json";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function saveTodayZodiakToSupabase() {
  const today = format(new Date(), "yyyy-MM-dd");

  // Cek apakah data hari ini sudah ada
  const { data: existing, error: checkError } = await supabase
    .from("zodiak_arsip")
    .select("id")
    .eq("date", today)
    .limit(1)
    .maybeSingle();

  if (checkError) {
    console.error("Gagal cek arsip:", checkError.message);
    return;
  }

  if (existing) {
    console.log("Zodiak hari ini sudah ada di Supabase.");
    return;
  }

  const { error } = await supabase.from("zodiak_arsip").insert([
    {
      date: today,
      zodiak: zodiakData,
    },
  ]);

  if (error) {
    console.error("Gagal simpan zodiak hari ini:", error.message);
  } else {
    console.log("Zodiak hari ini berhasil disimpan.");
  }
}
