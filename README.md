# 📖 Maca Quran

Aplikasi baca Al-Quran online gratis dengan terjemahan Indonesia, audio murottal, tajwid berwarna, dan berbagai fitur menarik lainnya.

![React](https://img.shields.io/badge/React-17.0.2-61DAFB?style=flat&logo=react)
![Material-UI](https://img.shields.io/badge/Material--UI-4.12.2-0081CB?style=flat&logo=mui)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

## ✨ Fitur

- 📚 **Baca Al-Quran** - Baca 114 surah Al-Quran lengkap dengan terjemahan Indonesia
- 🎨 **Tajwid Berwarna** - Tampilan tajwid dengan warna untuk memudahkan bacaan
- 🔊 **Audio Murottal** - Dengarkan bacaan ayat dengan audio murottal
- 🔖 **Bookmark** - Simpan ayat favorit untuk dibaca kembali
- 📝 **Catatan** - Tambahkan catatan pada ayat tertentu
- 📅 **Ayat Harian** - Dapatkan ayat pilihan setiap hari
- 🎯 **Target Harian** - Atur target membaca harian
- 📖 **Mode Hafalan** - Fitur khusus untuk menghafal Al-Quran
- 📜 **Riwayat Bacaan** - Lacak progress bacaan Anda
- 🔍 **Pencarian** - Cari ayat dengan mudah
- 🖼️ **Bagikan Ayat** - Bagikan ayat sebagai gambar
- 🌙 **Mode Gelap** - Tema gelap untuk kenyamanan membaca
- 🌐 **Multi Bahasa** - Dukungan bahasa Indonesia dan Inggris

## 🛠️ Teknologi

- **Frontend**: React.js 17
- **UI Framework**: Material-UI v4
- **Routing**: React Router DOM v5
- **Audio Player**: React H5 Audio Player
- **SEO**: React Helmet
- **API**: [Quran API by Gading](https://api.quran.gading.dev)

## 🚀 Instalasi

### Prasyarat

- Node.js 24.x
- Yarn atau npm

### Langkah Instalasi

1. Clone repository ini

```bash
git clone https://github.com/iqballbayhaqi/maca-quran.git
cd maca-quran
```

2. Install dependencies

```bash
yarn install
# atau
npm install
```

3. Jalankan aplikasi

```bash
yarn start
# atau
npm start
```

4. Buka [http://localhost:3000](http://localhost:3000) di browser

## 📦 Scripts

| Script | Deskripsi |
|--------|-----------|
| `yarn start` | Menjalankan aplikasi dalam mode development |
| `yarn build` | Build aplikasi untuk production |
| `yarn test` | Menjalankan test runner |
| `yarn eject` | Eject dari Create React App |

## 📁 Struktur Folder

```
src/
├── components/          # Komponen reusable
│   ├── drawer/         # Side drawer navigation
│   ├── header.js       # Header component
│   ├── menuAyat.js     # Menu ayat component
│   ├── menuSurat.js    # Menu surah component
│   ├── NoteDialog.js   # Dialog untuk catatan
│   └── SEO.js          # SEO meta tags
├── containers/          # Halaman utama
│   ├── AboutPage/      # Halaman tentang
│   ├── BookmarkPage/   # Halaman bookmark
│   ├── DailyAyatPage/  # Halaman ayat harian
│   ├── DailyTargetPage/# Halaman target harian
│   ├── DetailPage/     # Halaman detail surah
│   ├── Home/           # Halaman beranda
│   ├── MemorizationPage/# Halaman mode hafalan
│   ├── MenuPage/       # Halaman menu surah
│   ├── NotesPage/      # Halaman catatan
│   ├── ReadingHistoryPage/# Halaman riwayat
│   ├── SearchPage/     # Halaman pencarian
│   └── ShareAyatPage/  # Halaman bagikan ayat
├── i18n/               # Internasionalisasi
├── images/             # Gambar dan aset
├── tajwid/             # Logic tajwid berwarna
├── theme/              # Theme dan dark mode
└── utils/              # Utility functions
```

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan buat pull request atau buka issue untuk saran dan perbaikan.

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## 👨‍💻 Developer

**iqballbayhaqi**

- Website: [iqbalbaihaqi.com](https://iqbalbaihaqi.com/)
- GitHub: [@iqballbayhaqi](https://github.com/iqballbayhaqi)

---

<p align="center">
  Made with ❤️ in Jakarta
</p>
