-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  author VARCHAR(100) NOT NULL,
  status VARCHAR(20) DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  image_url TEXT,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC);

-- Insert sample articles
INSERT INTO articles (title, slug, excerpt, content, category, author, status, featured, image_url, views) VALUES
(
  'Perkembangan Teknologi AI di Indonesia Tahun 2024',
  'perkembangan-teknologi-ai-indonesia-2024',
  'Artificial Intelligence semakin berkembang pesat di Indonesia dengan berbagai inovasi dan implementasi di berbagai sektor.',
  '<h2>Perkembangan AI di Indonesia</h2><p>Artificial Intelligence (AI) telah menjadi salah satu teknologi yang paling berpengaruh di era digital ini. Di Indonesia, perkembangan AI menunjukkan tren yang sangat positif dengan berbagai implementasi di berbagai sektor.</p><h3>Sektor yang Terpengaruh</h3><ul><li>Perbankan dan Fintech</li><li>E-commerce</li><li>Kesehatan</li><li>Pendidikan</li></ul><p>Pemerintah Indonesia juga telah menunjukkan komitmen yang kuat dalam mengembangkan ekosistem AI melalui berbagai program dan inisiatif.</p>',
  'Teknologi',
  'Admin',
  'published',
  true,
  '/placeholder.svg?height=300&width=500',
  1234
),
(
  'Tips Investasi untuk Pemula di Era Digital',
  'tips-investasi-pemula-era-digital',
  'Panduan lengkap untuk memulai investasi dengan aman dan menguntungkan di era digital ini.',
  '<h2>Memulai Investasi di Era Digital</h2><p>Investasi di era digital menawarkan berbagai kemudahan dan peluang yang tidak tersedia sebelumnya. Berikut adalah panduan lengkap untuk pemula.</p><h3>Langkah-langkah Memulai</h3><ol><li>Tentukan tujuan investasi</li><li>Pilih platform yang terpercaya</li><li>Diversifikasi portfolio</li><li>Monitor secara berkala</li></ol><p>Ingatlah bahwa investasi selalu memiliki risiko, jadi pastikan untuk melakukan riset yang mendalam sebelum memutuskan.</p>',
  'Keuangan',
  'Editor',
  'published',
  false,
  '/placeholder.svg?height=300&width=500',
  892
),
(
  'Ramalan Zodiak Minggu Ini: Aries hingga Pisces',
  'ramalan-zodiak-minggu-ini-aries-pisces',
  'Simak ramalan bintang untuk semua zodiak minggu ini dan persiapkan diri untuk menghadapi tantangan.',
  '<h2>Ramalan Zodiak Minggu Ini</h2><p>Minggu ini membawa energi yang berbeda untuk setiap zodiak. Mari kita lihat apa yang menanti Anda.</p><h3>Aries (21 Mar - 19 Apr)</h3><p>Energi Anda sedang tinggi minggu ini. Manfaatkan untuk memulai proyek baru.</p><h3>Taurus (20 Apr - 20 Mei)</h3><p>Fokus pada stabilitas keuangan. Hindari pengeluaran yang tidak perlu.</p><p>Dan seterusnya untuk zodiak lainnya...</p>',
  'Zodiak',
  'Astrolog',
  'published',
  false,
  '/placeholder.svg?height=300&width=500',
  2156
);
