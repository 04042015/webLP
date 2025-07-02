import { format } from 'date-fns'

const sampleTexts = [
  "Hari ini penuh energi positif.",
  "Waspadai pengeluaran berlebihan.",
  "Kesempatan baik akan datang dari orang tak terduga.",
  "Luangkan waktu untuk introspeksi.",
  "Saatnya mengambil keputusan penting.",
  "Perhatikan kesehatanmu hari ini.",
  "Komunikasi adalah kunci keberhasilan.",
  "Fokus pada hal-hal kecil yang membawa kebahagiaan.",
  "Jangan biarkan keraguan menghalangi langkahmu.",
  "Teman lama bisa membawa kabar menarik." ]

export function getDynamicPrediction(zodiak: string, dateStr?: string): string {
  const today = dateStr || format(new Date(), 'yyyy-MM-dd')
  const seed = Array.from(zodiak + today).reduce((acc, char) => acc + char.charCodeAt(0), 0) 
  const index = seed % sampleTexts.length return sampleTexts[index] 
}

                                                                                                                                                                   
