import fs from "fs";
import path from "path";
import Link from "next/link";

export default function ArsipZodiakListPage() {
  const folderPath = path.join(process.cwd(), "data", "arsip-zodiak");
  let files: string[] = [];

  try {
    files = fs.readdirSync(folderPath);
  } catch (err) {
    // Folder tidak ditemukan → jangan crash, tampilkan pesan
    return (
      <main className="p-4 max-w-2xl mx-auto">
        <h1 className="text-xl font-bold text-red-600 mb-4">Arsip Belum Tersedia</h1>
        <p className="text-gray-600">Tidak ditemukan folder <code>/data/arsip-zodiak</code>. Kemungkinan karena belum ada arsip harian yang dibuat.</p>
      </main>
    );
  }

  const dates = files
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(".json", ""));

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📁 Arsip Ramalan Zodiak</h1>
      <ul className="space-y-2">
        {dates.map((date) => (
          <li key={date}>
            <Link
              href={`/zodiak/arsip/${date}`}
              className="text-blue-600 hover:underline"
            >
              {date}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
