/**
 * Tajwid Color Helper
 * Mewarnai teks Arab berdasarkan aturan tajwid
 */

// Warna untuk setiap jenis tajwid
export const TAJWID_COLORS = {
  // Nun Mati & Tanwin
  ikhfa: "#1AA7EC",           // Biru - Ikhfa (nun mati/tanwin + 15 huruf)
  idgham: "#9B59B6",          // Ungu - Idgham (nun mati/tanwin + ي ر م ل و ن)
  idghamGhunnah: "#8E44AD",   // Ungu tua - Idgham dengan Ghunnah (+ ي ن م و)
  idghamBilaGhunnah: "#6C3483", // Ungu gelap - Idgham tanpa Ghunnah (+ ل ر)
  iqlab: "#00BCD4",           // Cyan - Iqlab (nun mati/tanwin + ب)
  idzhar: "#27AE60",          // Hijau - Idzhar Halqi (nun mati/tanwin + ء ه ع ح غ خ)
  
  // Mim Mati
  ikhfaSyafawi: "#E91E63",    // Pink - Ikhfa Syafawi (mim mati + ب)
  idghamMimi: "#FF5722",      // Orange tua - Idgham Mimi/Mitslain (mim mati + م)
  idzharSyafawi: "#4CAF50",   // Hijau terang - Idzhar Syafawi (mim mati + selain ب dan م)
  
  // Lainnya
  ghunnah: "#FF9800",         // Orange - Ghunnah (nun/mim bertasydid)
  qalqalah: "#E74C3C",        // Merah - Qalqalah (ق ط ب ج د mati)
  mad: "#2196F3",             // Biru terang - Mad (panjang)
  madWajibMuttasil: "#1976D2", // Biru tua - Mad Wajib Muttasil
  madJaizMunfasil: "#42A5F5", // Biru muda - Mad Jaiz Munfasil
};

// Unicode constants
const SUKUN = "\u0652";
const TASYDID = "\u0651";
const FATHAH = "\u064E";
const KASRAH = "\u0650";
const DAMMAH = "\u064F";
const TANWIN_FATH = "\u064B";
const TANWIN_KASR = "\u064D";
const TANWIN_DAM = "\u064C";
const SUPERSCRIPT_ALIF = "\u0670";
const MADDAH = "\u0653";

// Huruf Arab
const NUN = "\u0646";
const MIM = "\u0645";
const BA = "\u0628";
const ALIF = "\u0627";
const WAW = "\u0648";
const YA = "\u064A";
const ALIF_MAQSURAH = "\u0649";
const HAMZAH = "\u0621";
const HAMZAH_ABOVE = "\u0654";
const HAMZAH_BELOW = "\u0655";
const ALIF_HAMZAH_ABOVE = "\u0623";
const ALIF_HAMZAH_BELOW = "\u0625";
const WAW_HAMZAH = "\u0624";
const YA_HAMZAH = "\u0626";

// Huruf Ikhfa (15 huruf) - setelah nun mati/tanwin
const HURUF_IKHFA = [
  "\u062A", // ت Ta
  "\u062B", // ث Tsa
  "\u062C", // ج Jim
  "\u062F", // د Dal
  "\u0630", // ذ Dzal
  "\u0632", // ز Zay
  "\u0633", // س Sin
  "\u0634", // ش Syin
  "\u0635", // ص Shad
  "\u0636", // ض Dhad
  "\u0637", // ط Tha
  "\u0638", // ظ Zha
  "\u0641", // ف Fa
  "\u0642", // ق Qaf
  "\u0643", // ك Kaf
];

// Huruf Idgham dengan Ghunnah (ي ن م و)
const HURUF_IDGHAM_GHUNNAH = [
  "\u064A", // ي Ya
  "\u0646", // ن Nun
  "\u0645", // م Mim
  "\u0648", // و Waw
];

// Huruf Idgham tanpa Ghunnah (ل ر)
const HURUF_IDGHAM_BILA_GHUNNAH = [
  "\u0644", // ل Lam
  "\u0631", // ر Ra
];

// Huruf Idzhar Halqi (ء ه ع ح غ خ)
const HURUF_IDZHAR = [
  "\u0621", // ء Hamzah
  "\u0623", // أ Alif dengan hamzah di atas
  "\u0625", // إ Alif dengan hamzah di bawah
  "\u0647", // ه Ha
  "\u0639", // ع 'Ain
  "\u062D", // ح Ha
  "\u063A", // غ Ghain
  "\u062E", // خ Kha
];

// Huruf Qalqalah (ق ط ب ج د)
const HURUF_QALQALAH = [
  "\u0642", // ق Qaf
  "\u0637", // ط Tha
  "\u0628", // ب Ba
  "\u062C", // ج Jim
  "\u062F", // د Dal
];

// Harakat
const HARAKAT = [
  SUKUN, TASYDID, FATHAH, KASRAH, DAMMAH,
  TANWIN_FATH, TANWIN_KASR, TANWIN_DAM,
  SUPERSCRIPT_ALIF, MADDAH, HAMZAH_ABOVE, HAMZAH_BELOW,
  "\u0657", "\u0656", "\u065C", "\u0615", "\u0617", "\u0618", "\u0619", "\u061A"
];

// Check if character is tanwin
const isTanwin = (char) => {
  return char === TANWIN_FATH || char === TANWIN_KASR || char === TANWIN_DAM;
};

// Check if character is harakat
const isHarakat = (char) => {
  return HARAKAT.includes(char);
};

// Find next letter (skipping harakat and spaces)
const getNextLetter = (text, currentIndex) => {
  let index = currentIndex + 1;
  while (index < text.length) {
    const char = text[index];
    if (!isHarakat(char) && char !== " ") {
      return { char, index };
    }
    index++;
  }
  return null;
};

// Check if letter has sukun
const hasSukun = (text, letterIndex) => {
  let index = letterIndex + 1;
  while (index < text.length && isHarakat(text[index])) {
    if (text[index] === SUKUN) return true;
    index++;
  }
  return false;
};

// Check if letter has tasydid
const hasTasydid = (text, letterIndex) => {
  let index = letterIndex + 1;
  while (index < text.length && isHarakat(text[index])) {
    if (text[index] === TASYDID) return true;
    index++;
  }
  return false;
};

// Check if letter has tanwin
const getLetterTanwin = (text, letterIndex) => {
  let index = letterIndex + 1;
  while (index < text.length && isHarakat(text[index])) {
    if (isTanwin(text[index])) return { hasTanwin: true, tanwinIndex: index };
    index++;
  }
  return { hasTanwin: false, tanwinIndex: -1 };
};

// Get all harakat after a letter
const getHarakatAfter = (text, letterIndex) => {
  let harakat = "";
  let index = letterIndex + 1;
  while (index < text.length && isHarakat(text[index])) {
    harakat += text[index];
    index++;
  }
  return { harakat, endIndex: index - 1 };
};

// Check for Mad
const isMadLetter = (char) => {
  return char === ALIF || char === WAW || char === YA || char === ALIF_MAQSURAH;
};

/**
 * Apply tajwid colors to Arabic text
 * @param {string} text - Arabic text
 * @returns {Array} - Array of segments with text and color
 */
export const applyTajwidColors = (text) => {
  if (!text) return [];
  
  const segments = [];
  let i = 0;
  
  while (i < text.length) {
    const char = text[i];
    const { harakat, endIndex } = getHarakatAfter(text, i);
    const fullChar = char + harakat;
    const nextLetter = getNextLetter(text, endIndex);
    
    let color = null;
    
    // 1. Check for Ghunnah (nun/mim bertasydid)
    if ((char === NUN || char === MIM) && hasTasydid(text, i)) {
      color = TAJWID_COLORS.ghunnah;
    }
    
    // 2. Check for Nun Mati/Tanwin rules
    else if (char === NUN && (hasSukun(text, i) || getLetterTanwin(text, i).hasTanwin)) {
      if (nextLetter) {
        const nextChar = nextLetter.char;
        
        // Ikhfa
        if (HURUF_IKHFA.includes(nextChar)) {
          color = TAJWID_COLORS.ikhfa;
        }
        // Idgham dengan Ghunnah
        else if (HURUF_IDGHAM_GHUNNAH.includes(nextChar)) {
          color = TAJWID_COLORS.idghamGhunnah;
        }
        // Idgham tanpa Ghunnah
        else if (HURUF_IDGHAM_BILA_GHUNNAH.includes(nextChar)) {
          color = TAJWID_COLORS.idghamBilaGhunnah;
        }
        // Iqlab
        else if (nextChar === BA) {
          color = TAJWID_COLORS.iqlab;
        }
        // Idzhar Halqi
        else if (HURUF_IDZHAR.includes(nextChar)) {
          color = TAJWID_COLORS.idzhar;
        }
      }
    }
    
    // 3. Check for Tanwin rules (on any letter with tanwin)
    else if (getLetterTanwin(text, i).hasTanwin) {
      if (nextLetter) {
        const nextChar = nextLetter.char;
        
        // Ikhfa
        if (HURUF_IKHFA.includes(nextChar)) {
          color = TAJWID_COLORS.ikhfa;
        }
        // Idgham dengan Ghunnah
        else if (HURUF_IDGHAM_GHUNNAH.includes(nextChar)) {
          color = TAJWID_COLORS.idghamGhunnah;
        }
        // Idgham tanpa Ghunnah
        else if (HURUF_IDGHAM_BILA_GHUNNAH.includes(nextChar)) {
          color = TAJWID_COLORS.idghamBilaGhunnah;
        }
        // Iqlab
        else if (nextChar === BA) {
          color = TAJWID_COLORS.iqlab;
        }
        // Idzhar Halqi
        else if (HURUF_IDZHAR.includes(nextChar)) {
          color = TAJWID_COLORS.idzhar;
        }
      }
    }
    
    // 4. Check for Mim Mati rules
    else if (char === MIM && hasSukun(text, i)) {
      if (nextLetter) {
        const nextChar = nextLetter.char;
        
        // Ikhfa Syafawi (mim mati + ba)
        if (nextChar === BA) {
          color = TAJWID_COLORS.ikhfaSyafawi;
        }
        // Idgham Mimi (mim mati + mim)
        else if (nextChar === MIM) {
          color = TAJWID_COLORS.idghamMimi;
        }
        // Idzhar Syafawi (mim mati + selain ba dan mim)
        else {
          color = TAJWID_COLORS.idzharSyafawi;
        }
      }
    }
    
    // 5. Check for Qalqalah (ق ط ب ج د mati)
    else if (HURUF_QALQALAH.includes(char) && hasSukun(text, i)) {
      color = TAJWID_COLORS.qalqalah;
    }
    
    // 6. Check for Mad
    else if (isMadLetter(char)) {
      // Mad Asli - alif setelah fathah, waw setelah dhammah, ya setelah kasrah
      const prevIndex = i - 1;
      if (prevIndex >= 0) {
        let checkIndex = prevIndex;
        // Go back to find the letter before harakat
        while (checkIndex >= 0 && isHarakat(text[checkIndex])) {
          checkIndex--;
        }
        if (checkIndex >= 0) {
          const prevHarakat = getHarakatAfter(text, checkIndex);
          if (char === ALIF && prevHarakat.harakat.includes(FATHAH)) {
            color = TAJWID_COLORS.mad;
          } else if (char === WAW && prevHarakat.harakat.includes(DAMMAH) && hasSukun(text, i)) {
            color = TAJWID_COLORS.mad;
          } else if ((char === YA || char === ALIF_MAQSURAH) && prevHarakat.harakat.includes(KASRAH) && hasSukun(text, i)) {
            color = TAJWID_COLORS.mad;
          }
        }
      }
      
      // Check for Mad Wajib Muttasil (mad + hamzah dalam satu kata)
      if (color === TAJWID_COLORS.mad && nextLetter) {
        if (nextLetter.char === HAMZAH || nextLetter.char === ALIF_HAMZAH_ABOVE || 
            nextLetter.char === ALIF_HAMZAH_BELOW || nextLetter.char === WAW_HAMZAH || 
            nextLetter.char === YA_HAMZAH) {
          color = TAJWID_COLORS.madWajibMuttasil;
        }
      }
    }
    
    // Add segment
    if (color) {
      segments.push({ text: fullChar, color });
    } else {
      segments.push({ text: fullChar, color: null });
    }
    
    i = endIndex + 1;
  }
  
  // Merge consecutive segments with same color
  const mergedSegments = [];
  for (const segment of segments) {
    if (mergedSegments.length > 0 && 
        mergedSegments[mergedSegments.length - 1].color === segment.color) {
      mergedSegments[mergedSegments.length - 1].text += segment.text;
    } else {
      mergedSegments.push({ ...segment });
    }
  }
  
  return mergedSegments;
};

// Legend data for UI
export const TAJWID_LEGEND = [
  { id: "ghunnah", name: "Ghunnah", nameEn: "Ghunnah", color: TAJWID_COLORS.ghunnah, description: "Nun/Mim bertasydid" },
  { id: "ikhfa", name: "Ikhfa", nameEn: "Ikhfa", color: TAJWID_COLORS.ikhfa, description: "Nun mati/tanwin + 15 huruf" },
  { id: "idghamGhunnah", name: "Idgham Ghunnah", nameEn: "Idgham w/ Ghunnah", color: TAJWID_COLORS.idghamGhunnah, description: "Nun mati/tanwin + ي ن م و" },
  { id: "idghamBilaGhunnah", name: "Idgham Bila Ghunnah", nameEn: "Idgham w/o Ghunnah", color: TAJWID_COLORS.idghamBilaGhunnah, description: "Nun mati/tanwin + ل ر" },
  { id: "iqlab", name: "Iqlab", nameEn: "Iqlab", color: TAJWID_COLORS.iqlab, description: "Nun mati/tanwin + ب" },
  { id: "idzhar", name: "Idzhar Halqi", nameEn: "Idzhar Halqi", color: TAJWID_COLORS.idzhar, description: "Nun mati/tanwin + ء ه ع ح غ خ" },
  { id: "ikhfaSyafawi", name: "Ikhfa Syafawi", nameEn: "Ikhfa Syafawi", color: TAJWID_COLORS.ikhfaSyafawi, description: "Mim mati + ب" },
  { id: "idghamMimi", name: "Idgham Mimi", nameEn: "Idgham Mimi", color: TAJWID_COLORS.idghamMimi, description: "Mim mati + م" },
  { id: "idzharSyafawi", name: "Idzhar Syafawi", nameEn: "Idzhar Syafawi", color: TAJWID_COLORS.idzharSyafawi, description: "Mim mati + selain ب م" },
  { id: "qalqalah", name: "Qalqalah", nameEn: "Qalqalah", color: TAJWID_COLORS.qalqalah, description: "ق ط ب ج د sukun" },
  { id: "mad", name: "Mad", nameEn: "Mad", color: TAJWID_COLORS.mad, description: "Panjang 2 harakat" },
  { id: "madWajibMuttasil", name: "Mad Wajib", nameEn: "Mad Wajib", color: TAJWID_COLORS.madWajibMuttasil, description: "Mad + hamzah" },
];

export default applyTajwidColors;
