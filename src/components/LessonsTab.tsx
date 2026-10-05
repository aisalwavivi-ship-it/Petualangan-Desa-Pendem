import React, { useState } from 'react';
import { soundFx } from '../utils/audio';
import { BookOpen, CheckCircle, Lightbulb, ChevronRight } from 'lucide-react';

export const LessonsTab: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<number>(0);

  const chapters = [
    {
      id: 1,
      title: 'Bab 1: Konsep Berbagi Adil (Equal Sharing)',
      icon: '🍎',
      subtitle: 'Membagi benda konkret menjadi bagian yang sama banyak',
      content: `
### Apa Itu Berbagi Adil?
Pembagian secara dasar adalah membagi sekumpulan benda ke beberapa wadah atau penerima, sedemikian rupa sehingga **setiap wadah mendapatkan jumlah yang sama banyak**.

#### Contoh di Kebun Apel Mbah Slamet:
Mbah Slamet memanen **12 buah apel manis**. Apel tersebut akan dibagikan kepada **3 cucunya** secara adil:
- Cucu pertama mendapat: 4 apel
- Cucu kedua mendapat: 4 apel
- Cucu ketiga mendapat: 4 apel

Dalam kalimat matematika ditulis:
**12 ÷ 3 = 4**
*(Dibaca: Dua belas dibagi tiga sama dengan empat)*

- **12** disebut **bilangan yang dibagi (dividen)**
- **3** disebut **bilangan pembagi (divisor)**
- **4** disebut **hasil bagi (quotient)**
      `,
      tips: 'Membagi adil tidak boleh ada yang mendapat lebih banyak atau lebih sedikit!',
    },
    {
      id: 2,
      title: 'Bab 2: Pembagian sebagai Pengurangan Berulang',
      icon: '🥛',
      subtitle: 'Mengurangi bilangan secara bertahap sampai habis menjadi 0',
      content: `
### Hubungan Pengurangan dan Pembagian
Jika perkalian adalah **penjumlahan berulang**, maka pembagian adalah **pengurangan berulang** oleh bilangan yang sama sampai sisanya habis (**0**).

#### Contoh di Peternakan Cak Budi:
Cak Budi mempunyai **15 liter susu murni**. Susu tersebut dimasukkan ke dalam jeriken yang berkapasitas **5 liter**.
Berapa jeriken yang dibutuhkan sampai susu habis?

Mari kita kurangkan terus dengan angka 5:
1. **15 - 5 = 10** (Pengurangan ke-1)
2. **10 - 5 = 5**  (Pengurangan ke-2)
3. **5 - 5 = 0**   (Pengurangan ke-3)

Karena angka 5 dikurangkan sebanyak **3 kali** hingga bernilai 0, maka:
**15 ÷ 5 = 3**
      `,
      tips: 'Hitunglah berapa kali pengurangan dilakukan sampai mencapai angka 0!',
    },
    {
      id: 3,
      title: 'Bab 3: Pembagian Bersusun (Porogapit)',
      icon: '🍪',
      subtitle: 'Jurus sakti Ba-Ka-Ku-Tu untuk bilangan puluhan dan ratusan',
      content: `
### Mengapa Perlu Porogapit?
Jika kita membagi angka besar seperti **72 ÷ 3**, melakukan pengurangan berulang akan memakan waktu lama. Maka kita menggunakan metode bersusun yang disebut **Porogapit**.

#### Jurus 4 Langkah: "Ba - Ka - Ku - Tu"
1. **BA (Bagi):** Bagi digit kiri dengan angka pembagi.
2. **KA (Kali):** Kalikan hasil bagi tersebut dengan angka pembagi.
3. **KU (Kurang):** Kurangkan angka atas dengan hasil kali.
4. **TU (Turunkan):** Turunkan angka berikutnya ke sebelah hasil pengurangan.

#### Contoh 72 ÷ 3:
1. Ambil angka 7 di puluhan.
   - **Bagi**: 7 ÷ 3 = 2 (tulis 2 di atas).
   - **Kali**: 2 × 3 = 6 (tulis di bawah 7).
   - **Kurang**: 7 - 6 = 1.
2. **Turunkan**: Turunkan angka 2 di sebelah 1, sehingga menjadi 12.
3. Ulangi untuk 12:
   - **Bagi**: 12 ÷ 3 = 4 (tulis 4 di atas).
   - **Kali**: 4 × 3 = 12.
   - **Kurang**: 12 - 12 = 0.
Hasil akhir di bagian atas adalah **24**!
      `,
      tips: 'Selalu ingat Ba-Ka-Ku-Tu: Bagi, Kali, Kurang, Turunkan!',
    },
    {
      id: 4,
      title: 'Bab 4: Pembagian dengan Sisa (Remainder)',
      icon: '🌻',
      subtitle: 'Ketika benda tidak habis dibagi secara sempurna',
      content: `
### Apa Itu Sisa Pembagian?
Tidak semua bilangan habis dibagi. Ketika ada sisa yang jumlahnya **lebih kecil dari pembagi**, maka benda tersebut tidak bisa dibagikan lagi secara utuh dan disebut **Sisa (Remainder)**.

#### Contoh di Taman Bunga Bu Sri:
Bu Sri memetik **14 tangkai mawar** dan ingin memasukkannya ke dalam **3 vas bunga**:
- Jika masing-masing diberi 4 tangkai: 4 × 3 = 12 tangkai.
- Masih ada tangkai yang tersisa: 14 - 12 = **2 tangkai**.
- 2 tangkai ini tidak cukup untuk dibagi ke 3 vas, jadi dibiarkan sebagai sisa!

Maka ditulis:
**14 ÷ 3 = 4 sisa 2**

#### Hubungan Rumus:
\`Bilangan Awal = (Pembagi × Hasil Bagi) + Sisa\`
\`14 = (3 × 4) + 2\`

⚠️ **Aturan Emas:**
Sisa pembagian **HARUS LEBIH KECIL** dari bilangan pembagi!
Jika pembaginya 3, sisa yang mungkin hanya **1** atau **2**.
      `,
      tips: 'Jika sisanya masih sama atau lebih besar dari pembagi, berarti pembagianmu belum selesai!',
    },
    {
      id: 5,
      title: 'Bab 5: Panduan Menyelesaikan Soal Cerita',
      icon: '🏆',
      subtitle: 'Langkah mudah memecahkan persoalan matematika kehidupan sehari-hari',
      content: `
### Tips Membaca & Memahami Soal Cerita:
1. **Baca dengan Teliti**: Cari kata kunci pembagian, seperti: *dibagikan sama banyak, dikemas ke dalam beberapa wadah, dibagi rata, masing-masing menerima*.
2. **Tuliskan yang Diketahui & Ditanyakan**:
   - Berapa jumlah seluruh benda? (Dividen)
   - Dibagi ke berapa kelompok / orang? (Pembagi)
3. **Tentukan Operasi Hitung**: Buat kalimat matematika (contoh: 48 ÷ 4 = ?).
4. **Hitung dengan Cara Tepat**: Gunakan porogapit untuk bilangan besar.
5. **Tuliskan Kesimpulan Jawaban**:
   Contoh: *"Jadi, setiap warung menerima 12 bungkus keripik."*
      `,
      tips: 'Selalu sertakan satuan pada jawaban akhir (misal: buah, liter, bungkus, orang).',
    },
  ];

  const current = chapters[activeChapter];

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Chapter Sidebar */}
      <div className="md:col-span-4 space-y-2">
        <h3 className="text-xs font-black uppercase text-emerald-800 tracking-wider px-2 mb-3">
          Daftar Bab Materi Pembagian:
        </h3>
        {chapters.map((ch, idx) => (
          <button
            key={ch.id}
            onClick={() => {
              soundFx.playPop();
              setActiveChapter(idx);
            }}
            className={`w-full text-left p-3.5 rounded-2xl border-2 transition flex items-center gap-3 ${
              activeChapter === idx
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md font-bold'
                : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
            }`}
          >
            <span className="text-2xl">{ch.icon}</span>
            <div className="overflow-hidden">
              <span className="text-xs font-black block truncate">{ch.title}</span>
              <span
                className={`text-[11px] block truncate ${
                  activeChapter === idx ? 'text-emerald-100' : 'text-slate-500'
                }`}
              >
                {ch.subtitle}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Main Content Viewer */}
      <div className="md:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border-4 border-emerald-100 shadow-xl">
        <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
          <span className="text-4xl p-2 bg-emerald-50 rounded-2xl">{current.icon}</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800">{current.title}</h2>
            <p className="text-xs text-slate-500 font-semibold">{current.subtitle}</p>
          </div>
        </div>

        {/* Formatted Content */}
        <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line mb-8">
          {current.content}
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex items-start gap-3 text-xs sm:text-sm text-amber-950 font-medium">
          <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold uppercase tracking-wide text-amber-800 block mb-0.5">
              Tips Pintar:
            </span>
            <span>{current.tips}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
