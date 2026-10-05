import React from 'react';
import { BookMarked, CheckCircle, Heart, School, Award, MapPin } from 'lucide-react';

export const GuideTab: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-4 border-emerald-100 shadow-xl space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <span className="text-xs font-black uppercase text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
          Panduan Guru & Orang Tua
        </span>
        <h2 className="text-2xl font-black text-slate-800 mt-2">
          Petunjuk Kurikulum & Pemanfaatan Media Pembelajaran
        </h2>
        <p className="text-sm text-slate-500">
          Media Pembelajaran Interaktif Matematika SD Kelas 4 — Konteks Kearifan Lokal Desa Pendem, Kota Batu.
        </p>
      </div>

      {/* Capaian Pembelajaran */}
      <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200">
        <h3 className="text-base font-extrabold text-emerald-900 flex items-center gap-2 mb-2">
          <School className="w-5 h-5 text-emerald-700" /> Capaian Pembelajaran (CP) Kurikulum Merdeka - Fase B (Kelas 4)
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-emerald-950 font-medium">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Memahami operasi pembagian bilangan cacah sampai dengan 100 menggunakan benda-benda konkret (manipulatif virtual) dan gambar.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Menghubungkan operasi perkalian dan pembagian sebagai operasi yang saling berkebalikan serta pembagian sebagai pengurangan berulang.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Menguasai teknik algoritma pembagian bersusun (Porogapit: Ba-Ka-Ku-Tu) untuk bilangan puluhan dan ratusan.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Menyelesaikan masalah kontekstual dan soal cerita sehari-hari yang melibatkan pembagian habis maupun pembagian bersisa.</span>
          </li>
        </ul>
      </div>

      {/* Konteks Kearifan Lokal Desa Pendem */}
      <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200">
        <h3 className="text-base font-extrabold text-amber-900 flex items-center gap-2 mb-2">
          <MapPin className="w-5 h-5 text-amber-700" /> Konteks Kearifan Lokal Desa Pendem Kota Batu
        </h3>
        <p className="text-xs sm:text-sm text-amber-950 leading-relaxed mb-3 font-medium">
          Desa Pendem terletak di Kecamatan Junrejo, Kota Batu, Jawa Timur. Wilayah ini merupakan pintu gerbang utama Kota Batu dengan panorama alam Gunung Panderman dan Arjuno yang sejuk.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-amber-900 font-semibold">
          <div className="bg-white/80 p-3 rounded-xl border border-amber-200">
            🍏 <b>Kebun Apel & Pertanian:</b> Menanamkan konsep berbagi hasil panen apel segar secara adil kepada tetangga dan keluarga.
          </div>
          <div className="bg-white/80 p-3 rounded-xl border border-amber-200">
            🥛 <b>Peternakan Sapi Perah:</b> Mengajarkan pembagian liter susu murni ke jeriken sebagai model pengurangan berulang.
          </div>
          <div className="bg-white/80 p-3 rounded-xl border border-amber-200">
            🍪 <b>Sentra UMKM Keripik:</b> Mengajarkan pengemasan skala puluhan/ratusan bungkus dengan metode Porogapit.
          </div>
          <div className="bg-white/80 p-3 rounded-xl border border-amber-200">
            🌻 <b>Taman Bunga & Sayur:</b> Melatih ketelitian konsep pembagian dengan sisa (remainder) pada rangkaian bunga.
          </div>
        </div>
      </div>

      {/* Tips Pendampingan */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
        <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-rose-500" /> Saran untuk Guru dan Orang Tua
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
          <li>Ajak anak mengeksplorasi <b>Peta Petualangan</b> secara berurutan dari Pos 1 hingga Pos 5.</li>
          <li>Gunakan tab <b>Lab Porogapit</b> jika anak mengalami kesulitan memahami urutan langkah Bagi, Kali, Kurang, Turunkan (Ba-Ka-Ku-Tu).</li>
          <li>Berikan apresiasi dan motivasi saat anak mengumpulkan bintang dan meraih <b>Sertifikat Kelulusan</b> yang dapat dicetak atau disimpan.</li>
        </ol>
      </div>
    </div>
  );
};
