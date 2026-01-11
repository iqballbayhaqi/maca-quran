# 📖 Maca Quran

A free online Al-Quran reading application with Indonesian translation, murottal audio, colored tajwid, and various other interesting features.

![Version](https://img.shields.io/badge/Version-0.1.0-blue?style=flat)
![React](https://img.shields.io/badge/React-17.0.2-61DAFB?style=flat&logo=react)
![Material-UI](https://img.shields.io/badge/Material--UI-4.12.2-0081CB?style=flat&logo=mui)
![Node](https://img.shields.io/badge/Node.js-24.x-339933?style=flat&logo=nodedotjs)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

## ✨ Features

- 📚 **Read Al-Quran** - Read all 114 surahs of Al-Quran with Indonesian translation
- 🎨 **Colored Tajwid** - Tajwid display with colors to facilitate reading
- 🔊 **Murottal Audio** - Listen to verse recitations with murottal audio
- 🔖 **Bookmark** - Save favorite verses to read again
- 📝 **Notes** - Add notes to specific verses
- 📅 **Daily Verse** - Get a selected verse every day
- 🎯 **Daily Target** - Set daily reading targets
- 📖 **Memorization Mode** - Special feature for memorizing Al-Quran
- 📜 **Reading History** - Track your reading progress
- 🔍 **Search** - Search verses easily
- 🖼️ **Share Verse** - Share verses as images
- 🌙 **Dark Mode** - Dark theme for comfortable reading
- 🌐 **Multi Language** - Indonesian and English language support

## 🛠️ Technologies

- **Frontend**: React.js 17
- **UI Framework**: Material-UI v4
- **Routing**: React Router DOM v5
- **Audio Player**: React H5 Audio Player
- **SEO**: React Helmet
- **API**: [Quran API by Gading](https://api.quran.gading.dev)

## 🚀 Installation

### Prerequisites

- Node.js 24.x
- Yarn or npm

### Installation Steps

1. Clone this repository

```bash
git clone https://github.com/iqballbayhaqi/maca-quran.git
cd maca-quran
```

2. Install dependencies

```bash
yarn install
# or
npm install
```

3. Run the application

```bash
yarn start
# or
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Scripts

| Script | Description |
|--------|-------------|
| `yarn start` | Runs the app in development mode |
| `yarn build` | Builds the app for production |
| `yarn test` | Launches the test runner |
| `yarn eject` | Ejects from Create React App |

## 📁 Folder Structure

```
src/
├── components/          # Reusable components
│   ├── drawer/         # Side drawer navigation
│   ├── header.js       # Header component
│   ├── menuAyat.js     # Verse menu component
│   ├── menuSurat.js    # Surah menu component
│   ├── NoteDialog.js   # Notes dialog
│   └── SEO.js          # SEO meta tags
├── containers/          # Main pages
│   ├── AboutPage/      # About page
│   ├── BookmarkPage/   # Bookmark page
│   ├── DailyAyatPage/  # Daily verse page
│   ├── DailyTargetPage/# Daily target page
│   ├── DetailPage/     # Surah detail page
│   ├── Home/           # Home page
│   ├── MemorizationPage/# Memorization mode page
│   ├── MenuPage/       # Surah menu page
│   ├── NotesPage/      # Notes page
│   ├── ReadingHistoryPage/# History page
│   ├── SearchPage/     # Search page
│   └── ShareAyatPage/  # Share verse page
├── i18n/               # Internationalization
├── images/             # Images and assets
├── tajwid/             # Colored tajwid logic
├── theme/              # Theme and dark mode
└── utils/              # Utility functions
```

## 🤝 Contributing

Contributions are welcome! Please create a pull request or open an issue for suggestions and improvements.

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 👨‍💻 Developer

**iqballbayhaqi**

- Website: [iqbalbaihaqi.com](https://iqbalbaihaqi.com/)
- GitHub: [@iqballbayhaqi](https://github.com/iqballbayhaqi)

---

<p align="center">
  Made with ❤️ in Jakarta
</p>
