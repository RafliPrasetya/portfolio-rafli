# 🚀 Portfolio Website — Rafli Ainun Prasetya

Modern, high-performance personal portfolio website built with pure semantic **HTML5**, **Vanilla CSS3**, and **Modern JavaScript (ES6+)**.

---

## 🎨 Theme & Aesthetic Concept
- **Concept:** *Cyber-Luminescent Modern Tech & Aurora Glassmorphism* (Beda konsep dengan gaya Neo-Brutalism, berfokus pada nuansa modern, sleek, ambient glow gradien, dan kartu kaca bertekstur elegan).
- **Color Identity:** Deep Obsidian Midnight (`#070B14`) dipadukan dengan aksen Electric Emerald (`#10B981`) dan Cyan (`#06B6D4`).
- **Typography:** Google Fonts (*Plus Jakarta Sans* untuk tampilan modern profesional & *JetBrains Mono* untuk kode & tag teknologi).
- **Fitur Interaktif:**
  - 🌓 **Dark / Light Theme Toggle** (tersimpan otomatis di browser via `localStorage`).
  - 🔍 **Interactive Project Filter** (All, Web & Full-Stack, IoT & Hardware, Mobile & Support).
  - 📑 **Project Architecture Modal** (klik tombol "View Details" untuk melihat rincian arsitektur teknis tiap proyek).
  - 📋 **Copy to Clipboard with Toast Notification** (klik alamat email atau nomor telepon untuk menyalin instan).
  - 📱 **Mobile Responsive Navigation** (hamburger menu dengan animasi halus).
  - 🧭 **Scrollspy Active Navigation** (sorotan menu navigasi otomatis mengikuti posisi scroll).

---

## 📂 Struktur File

```
Portfolio Rafli/
├── index.html        # Struktur semantik & konten lengkap dari CV
├── style.css         # Styling modern, variabel CSS, tema dark/light, glassmorphism
├── script.js         # Logika tema, filter proyek, modal arsitektur, tabs, dan toast
├── README.md         # Panduan penggunaan & deployment
└── Asset/            # Foto profil, logo organisasi (Geniwangi & MPM), dan berkas PDF sertifikat
```

---

## 💻 Cara Menjalankan Secara Lokal

Cukup buka file `index.html` langsung:
1. Masuk ke folder `c:\Users\ASUS\Documents\Coding\Portfolio Rafli`
2. Klik dua kali pada file `index.html` untuk langsung membukanya di browser apa pun (Google Chrome, Microsoft Edge, Firefox, Brave).

Atau jika ingin menggunakan live server:
```bash
# Menggunakan npx serve
npx -y serve .
```

---

## 🌐 Cara Deploy Gratis ke Internet

### Opsi 1: Netlify (Paling Mudah, Drag & Drop)
1. Buka [app.netlify.com/drop](https://app.netlify.com/drop)
2. Tarik (*drag & drop*) folder `Portfolio Rafli` ke halaman tersebut.
3. Website langsung aktif online dengan domain gratis (contoh: `rafli-prasetya.netlify.app`) dan SSL otomatis!

### Opsi 2: Vercel
1. Buka [vercel.com](https://vercel.com)
2. Import repository GitHub kamu atau gunakan Vercel CLI (`npx vercel`).

### Opsi 3: GitHub Pages
1. Push folder ini ke repository GitHub baru milikmu: `https://github.com/RafliPrasetya/portfolio`.
2. Buka menu **Settings** > **Pages** di repository GitHub tersebut.
3. Pilih branch `main` / `root`, lalu klik **Save**.
