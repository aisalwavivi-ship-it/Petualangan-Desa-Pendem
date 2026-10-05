import React from 'react';
import { BookOpen, CheckCircle, GraduationCap, MapPin, Sparkles } from 'lucide-react';

export const CurriculumGuide: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-emerald-700 text-white p-6 rounded-3xl shadow-xl border-4 border-purple-400/40">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Kurikulum Merdeka / K13 • Fase B SD Kelas 4</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-fredoka">
              Materi & Panduan Pembelajaran
            </h2>
            <p className="text-xs sm:text-sm text-purple-100 max-w-lg mt-1">
              Panduan lengkap capaian kompetensi pembagian matematika kelas 4 berkonteks kearifan lokal Desa Pendem, Kota Batu.
            </p>
          </div>
          <div className="text-4xl animate-gentle-bounce shrink-0">📖</div>
        </div>
      </div>

      {/* Capaian Pembelajaran */}
      <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>Tujuan & Capaian Pembelajaran Matematika (Fase B)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
          <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200 space-y-1">
            <p className="font-bold text-emerald-900">1. Konsep Berbagi Adil</p>
            <p>Peserta didik memahami pembagian sebagai pengelompokan benda konkret sama banyak (equal sharing) ke beberapa kelompok.</p>
          </div>

          <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-200 space-y-1">
            <p className="font-bold text-blue-900">2. Pengurangan Berulang</p>
            <p>Peserta didik dapat menghubungkan operasi pembagian dengan pengurangan berulang oleh bilangan yang sama hingga bernilai nol.</p>
          </div>

          <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200 space-y-1">
            <p className="font-bold text-amber-900">3. Porogapit (Pembagian Bersusun)</p>
            <p>Peserta didik terampil melakukan pembagian bersusun puluhan dan ratusan dengan jurus Ba-Ka-Ku-Tu (Bagi, Kali, Kurang, Turunkan).</p>
          </div>

          <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200 space-y-1">
            <p className="font-bold text-purple-900">4. Pembagian Bersisa</p>
            <p>Peserta didik memahami konsep sisa pembagian dan syarat bahwa bilangan sisa harus selalu lebih kecil dari pembaginya.</p>
          </div>
        </div>
      </div>

      {/* Rangkuman 4 Jurus Pembagian */}
      <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>Rangkuman Inti Materi Pembagian Kelas 4</span>
        </h3>

        <div className="space-y-3 text-sm text-slate-700">
          <div className="border border-slate-200 p-4 rounded-2xl space-y-1.5">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-emerald-800">A. Membagi Adil dan Rata (Equal Sharing)</h4>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">Pos 1</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Jika ada 12 buah apel dibagikan sama banyak kepada 3 orang anak, maka masing-masing anak mendapatkan 4 buah apel (12 ÷ 3 = 4).
            </p>
          </div>

          <div className="border border-slate-200 p-4 rounded-2xl space-y-1.5">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-blue-800">B. Pengurangan Berulang (Repeated Subtraction)</h4>
              <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-md">Pos 2</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              15 ÷ 5 dihitung dengan mengurangkan 5 dari 15 berulang kali sampai habis: 15 - 5 - 5 - 5 = 0. Terdapat 3 kali pengurangan angka 5, sehingga hasilnya 3.
            </p>
          </div>

          <div className="border border-slate-200 p-4 rounded-2xl space-y-1.5">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-amber-800">C. Pembagian Bersusun / Porogapit (Ba-Ka-Ku-Tu)</h4>
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-md">Pos 3</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gunakan urutan ajaib 4 langkah: <strong>1. Bagi (BA)</strong> angka terdepan, <strong>2. Kali (KA)</strong> hasilnya dengan pembagi, <strong>3. Kurang (KU)</strong> sisa angkanya, <strong>4. Turunkan (TU)</strong> angka berikutnya! Ulangi hingga bernilai 0 atau bersisa.
            </p>
          </div>

          <div className="border border-slate-200 p-4 rounded-2xl space-y-1.5">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-rose-800">D. Pembagian dengan Sisa (Remainder)</h4>
              <span className="text-xs bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-md">Pos 4</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              17 ÷ 5 = 3 sisa 2. Karena 5 × 3 = 15, dan 17 - 15 = 2. Sisa 2 tidak cukup lagi dibagi kepada 5 kelompok. Bentuk pembuktiannya: 17 = (5 × 3) + 2.
            </p>
          </div>
        </div>
      </div>

      {/* Profil Desa Pendem, Kota Batu */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-white p-6 rounded-3xl border-2 border-emerald-300 shadow-sm space-y-3">
        <h3 className="text-base font-extrabold text-emerald-950 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-600" />
          <span>Mengenal Desa Pendem, Kota Batu, Jawa Timur</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          <strong>Desa Pendem</strong> terletak di Kecamatan Junrejo, Kota Batu, Jawa Timur. Desa ini dikenal sebagai gerbang utama memasuki Kota Wisata Batu. Dengan udara yang sejuk dan tanah yang subur, Desa Pendem terkenal dengan komoditas pertanian buah apel, sayuran segar, sentra industri keripik tempe & buah, peternakan sapi perah, serta kerajinan bunga hias. Game edukasi ini mengintegrasikan kearifan lokal Desa Pendem ke dalam pembelajaran matematika agar anak-anak belajar dengan gembira dan mengenal potensi daerahnya!
        </p>
      </div>
    </div>
  );
};
