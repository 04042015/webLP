'use client'

export default function ZodiakShareButtons({ prediction, slug, name }: { prediction: string, slug: string, name: string }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-6">
      <a href={`https://wa.me/?text=${encodeURIComponent(prediction)}`} className="bg-green-500 px-3 py-1 rounded text-white">WhatsApp</a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=https://langsapost.vercel.app/zodiak/${slug}`} target="_blank" className="bg-blue-600 px-3 py-1 rounded text-white">Facebook</a>
      <button
        onClick={() => navigator.clipboard.writeText(`https://langsapost.vercel.app/zodiak/${slug}`)}
        className="bg-gray-700 px-3 py-1 rounded text-white"
      >Salin Link</button>
      <button
        onClick={() => navigator.clipboard.writeText(`#${name.toLowerCase()} #zodiak #ramalanzodiak`)}
        className="bg-purple-600 px-3 py-1 rounded text-white"
      >Salin Hashtag</button>
    </div>
  )
}
