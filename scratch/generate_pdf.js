const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const PORT = 3000; // Use the already running dev server port
const CWD = 'E:/ui-creation-from-brief';
const SCREENSHOTS_DIR = path.join(CWD, 'scratch/screenshots');

const screenList = [
  { id: 'onboarding', label: '1. Onboarding', desc: 'Layar pengenalan awal yang dirancang untuk menarik perhatian pengguna baru. Menggunakan perpaduan animasi glow-green, logo besar, dan tagline "Level Up Your Finance, Game On Your Savings!". Layar ini dilengkapi slider komidi putar (carousel) interaktif dengan tiga fokus utama: Kontrol Nafsu Belanja, Jaga Daily Streak, dan Privasi 100% Aman. Layar ini memiliki opsi navigasi "Lewati", "Lanjut", serta tombol "Mulai Sekarang" untuk langsung menuju dashboard.' },
  { id: 'home', label: '2. Home Dashboard', desc: 'Pusat informasi keuangan pengguna (dashboard) yang mengadopsi elemen game (gamifikasi). Menampilkan foto profil, nama pengguna (Raditya Rayyan), level akun (Lv. 4 · Intermediate Saver), indikator daily streak (7 hari), dan tombol notifikasi. Terdapat Main Budget Card dengan visualisasi persentase sisa anggaran bulanan berbentuk cincin progres melingkar (Progress Ring) dengan info sisa saldo (Rp1.450.000) dan rekomendasi harian pintar ("Batas Aman Jajan Hari Ini: Rp50.000"). Dilengkapi pula dengan Impulsive Alert Widget dan Quick Quest Teaser.' },
  { id: 'quests', label: '3. Quest & Reward', desc: 'Halaman utama untuk sistem misi (quest) dan penukaran hadiah (reward store). Menampilkan total poin emas terkumpul (2.450 pts) beserta progress bar XP menuju tingkat berikutnya (Lv. 5 - Advanced Saver). Berisi daftar kartu misi yang sedang berjalan beserta progresnya, contohnya Tantangan Anti-Checkout (hari ke-2 dari 3, bernilai +150 XP) dan Streak Penghematan 15% (progres 80%, bernilai +100 XP). Terdapat katalog hadiah penukaran poin (Voucher Kuliah, Saldo GoPay/DANA, Analitik Premium, dll.) lengkap dengan indikator kecukupan poin.' },
  { id: 'transaction', label: '4. Catat Transaksi', desc: 'Layar pengisian pengeluaran yang efisien dan interaktif. Menampilkan nominal transaksi berukuran besar dengan format rupiah otomatis. Memiliki pilihan ikon kategori pengeluaran instan (Makan, Belanja, Hiburan, Lain-lain), kolom catatan teks opsional untuk detail pengeluaran, serta papan tombol angka bawaan (Custom Numpad) di layar bawah untuk kemudahan pengisian secepat kalkulator. Tombol simpan menjanjikan imbalan instan ("Klaim XP & Simpan Transaksi — Potensi +10 XP") untuk memotivasi pencatatan.' },
  { id: 'profile', label: '5. Profil & Privasi', desc: 'Halaman profil personal yang berfokus pada statistik pencapaian dan kontrol privasi ketat. Menampilkan identitas akademis/personal dan level pengguna saat ini. Memiliki kartu ringkasan "Total Dihemat" dan "Misi Sukses" (12 kali). Terdapat fitur sakelar (switch) "Mode Privasi Finansial Penuh" untuk menyembunyikan nominal saldo riil dan grafik keuangan (diganti dengan symbol ••••••) dari papan peringkat publik (leaderboard) komunitas. Dilengkapi juga dengan daftar riwayat transaksi pengeluaran keuangan dan pencairan poin.' },
  { id: 'quest-detail', label: '6. Detail Misi', desc: 'Layar yang menyajikan informasi detail dan status terkini dari misi tertentu (misal: Tantangan Kalahkan Nafsu Checkout E-Commerce). Dilengkapi dengan countdown timer sisa waktu penyelesaian misi (Format Jam:Menit:Detik) untuk memicu rasa urgensi positif. Terdapat AI Psychological Tips (saran psikologis dinamis dari asisten virtual) untuk memandu perilaku pengguna agar berhasil menyelesaikan misi, serta Trend Chart (grafik tren garis belanja mingguan) dengan garis batas anggaran merah.' },
  { id: 'reward-claim', label: '7. Klaim Hadiah', desc: 'Layar perayaan (Mission Accomplished) bernuansa neon hijau yang muncul sesaat setelah misi diselesaikan atau setelah menyimpan transaksi hemat. Menampilkan efek animasi koin jatuh (falling coins) di latar belakang layar yang sedikit gelap (backdrop blur). Dilengkapi visualisasi jumlah poin/XP yang diraih (+150 Gold & +50 XP) dengan peti hadiah bercahaya. Pengguna dapat memilih untuk langsung mencairkan poin tersebut menjadi saldo E-Wallet atau menyimpannya ke inventori.' },
  { id: 'analytics', label: '8. Analisis Mendalam', desc: 'Layar untuk mendiagnosis pola belanja konsumtif pengguna secara periodik (Mingguan/Bulanan). Menampilkan Impulse Gauge Matrix berupa grafik speedometer tingkat keborosan pengguna yang terbagi dalam 3 warna (Aman/Hijau, Waspada/Kuning, Bahaya/Merah). Menyajikan pula Uraian Kebocoran Mikro untuk mendeteksi pengeluaran kecil berulang yang sering tidak disadari namun berdampak besar (misal: kopi & boba, jajan makanan ringan, belanja marketplace). Dilengkapi keterangan perlindungan privasi data sesuai UU PDP No. 27 Tahun 2022.' },
  { id: 'ewallet', label: '9. E-Wallet Hub', desc: 'Layar integrasi dan pencairan dana poin menjadi saldo uang digital riil. Menampilkan daftar akun E-Wallet lokal yang terhubung (seperti GoPay, DANA, ShopeePay) dengan nomor telepon terenkripsi sebagian. Memiliki formulir input pengisian jumlah koin emas yang ingin dikonversi ke saldo rupiah (Rasio: 1.000 Gold Points = Rp10.000) dengan opsi nominal penarikan cepat (1.000, 2.000, 2.450). Tombol pencairan diintegrasikan dengan otentikasi sidik jari (Fingerprint) untuk keamanan ganda.' }
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  console.log('1. Launching Puppeteer Browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1000 });

  console.log(`Navigating to http://localhost:${PORT}...`);
  await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle2' });
  await sleep(3000); // Give it some time to compile/render

  console.log('2. Capturing screenshots of the 9 screens...');
  
  for (let idx = 0; idx < screenList.length; idx++) {
    const screen = screenList[idx];
    console.log(`Processing Screen: ${screen.label}`);
    
    // Find the button that has the text of the screen
    const clicked = await page.evaluate((labelText) => {
      const buttons = Array.from(document.querySelectorAll('aside nav button'));
      const match = buttons.find(b => b.textContent.includes(labelText));
      if (match) {
        match.click();
        return true;
      }
      return false;
    }, screen.label);

    if (!clicked) {
      console.warn(`Warning: Could not find nav button for ${screen.label}`);
    }

    // Wait for the transition to finish
    await sleep(1000);

    // Find the phone frame container and take screenshot
    const phoneFrame = await page.$('#phone-frame-container');
    if (phoneFrame) {
      const imgPath = path.join(SCREENSHOTS_DIR, `${screen.id}.png`);
      await phoneFrame.screenshot({ path: imgPath });
      console.log(`Saved screenshot to ${imgPath}`);
    } else {
      console.error(`ERROR: Phone frame container not found for screen ${screen.label}`);
    }
  }

  console.log('3. Generating PDF HTML document...');
  
  let pagesHtml = '';
  for (let idx = 0; idx < screenList.length; idx++) {
    const screen = screenList[idx];
    const imagePath = path.join(SCREENSHOTS_DIR, `${screen.id}.png`);
    // Convert screenshot image to Base64 to make the PDF self-contained
    const base64Image = fs.readFileSync(imagePath).toString('base64');
    const imageSrc = `data:image/png;base64,${base64Image}`;

    pagesHtml += `
    <div class="page">
      <div class="header">
        <span class="app-title">ALGORHYTHM FINANCE</span>
        <span class="page-number">Screen ${idx + 1} of 9</span>
      </div>
      <div class="content">
        <div class="screenshot-container">
          <img src="${imageSrc}" class="screenshot" alt="${screen.label}" />
        </div>
        <div class="details-container">
          <h2 class="screen-title">${screen.label}</h2>
          <div class="category-tag">Fungsionalitas Utama</div>
          <p class="screen-desc">${screen.desc}</p>
          
          <div class="technical-notes">
            <h3>Spesifikasi Prototipe</h3>
            <ul>
              <li><strong>ID Layar:</strong> <code>${screen.id}</code></li>
              <li><strong>Komponen Sumber:</strong> <code>/components/algorhythm/screens/${screen.id}-screen.tsx</code></li>
              <li><strong>Integrasi Gaya:</strong> Tailwind CSS & Lucide Icons</li>
              <li><strong>Status Interaksi:</strong> Aktif & Terhubung ke Navigasi</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer">
        Algorhythm Finance UI Prototype Documentation &bull; Generated Automatically
      </div>
    </div>
    `;
  }

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Algorhythm Prototype Screens Documentation</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
      
      body {
        font-family: 'Inter', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f3f4f6;
        color: #1f2937;
      }
      
      /* Cover Page */
      .cover {
        page-break-after: always;
        height: 297mm;
        background-color: #0d0f12;
        color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 40px;
        box-sizing: border-box;
      }
      
      .cover-header {
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.2em;
        color: #10b981;
      }
      
      .cover-main {
        margin-top: 150px;
      }
      
      .cover-title {
        font-size: 48px;
        font-weight: 900;
        line-height: 1.1;
        margin: 0;
        letter-spacing: -0.02em;
        color: #ffffff;
      }
      
      .cover-subtitle {
        font-size: 20px;
        color: #9ca3af;
        margin-top: 15px;
        font-weight: 500;
      }
      
      .cover-badge {
        display: inline-block;
        background-color: rgba(16, 185, 129, 0.15);
        border: 1px solid rgba(16, 185, 129, 0.3);
        color: #10b981;
        padding: 6px 14px;
        border-radius: 9999px;
        font-size: 12px;
        font-weight: 700;
        margin-top: 30px;
      }
      
      .cover-footer {
        font-size: 12px;
        color: #6b7280;
        border-top: 1px solid #1f2937;
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
      }
      
      /* Standard Page */
      .page {
        page-break-after: always;
        height: 297mm;
        width: 210mm;
        background-color: #ffffff;
        box-sizing: border-box;
        padding: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
      }
      
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e5e7eb;
        padding-bottom: 12px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.05em;
        color: #9ca3af;
      }
      
      .app-title {
        color: #10b981;
      }
      
      .content {
        display: flex;
        flex: 1;
        margin-top: 30px;
        margin-bottom: 30px;
        gap: 30px;
      }
      
      .screenshot-container {
        flex: 0 0 350px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 20px;
        padding: 15px;
      }
      
      .screenshot {
        width: 100%;
        max-height: 220mm;
        object-fit: contain;
        border-radius: 24px;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
      }
      
      .details-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      }
      
      .screen-title {
        font-size: 24px;
        font-weight: 900;
        margin: 0 0 10px 0;
        color: #111827;
        letter-spacing: -0.01em;
      }
      
      .category-tag {
        display: inline-block;
        background-color: #ecfdf5;
        color: #065f46;
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 10px;
        font-weight: 700;
        align-self: flex-start;
        margin-bottom: 20px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      
      .screen-desc {
        font-size: 13px;
        line-height: 1.6;
        color: #4b5563;
        margin: 0 0 25px 0;
        text-align: justify;
      }
      
      .technical-notes {
        background-color: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 15px;
        margin-top: auto;
      }
      
      .technical-notes h3 {
        font-size: 12px;
        font-weight: 700;
        margin: 0 0 10px 0;
        color: #374151;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      
      .technical-notes ul {
        margin: 0;
        padding-left: 15px;
        font-size: 11.5px;
        color: #4b5563;
      }
      
      .technical-notes li {
        margin-bottom: 6px;
      }
      
      .technical-notes code {
        font-family: monospace;
        background-color: #f3f4f6;
        padding: 2px 4px;
        border-radius: 4px;
        color: #0f172a;
      }
      
      .footer {
        border-top: 1px solid #e5e7eb;
        padding-top: 12px;
        font-size: 10px;
        color: #9ca3af;
        text-align: center;
      }
      
      @media print {
        body {
          background-color: transparent;
        }
        .page {
          page-break-after: always;
        }
        .page:last-child {
          page-break-after: avoid;
        }
      }
    </style>
  </head>
  <body>
    <!-- Cover -->
    <div class="cover">
      <div class="cover-header">
        ALGORHYTHM FINANCE
      </div>
      
      <div class="cover-main">
        <h1 class="cover-title">UI Prototype<br>Screenshots &amp; Documentation</h1>
        <div class="cover-subtitle">Dokumentasi Portofolio 9 Layar Utama Algorhythm</div>
        <div class="cover-badge">Laporan Desain Finansial Gamifikasi</div>
      </div>
      
      <div class="cover-footer">
        <span>Tanggal Dibuat: 2026-07-05</span>
        <span>Developer: Antigravity AI Assistant</span>
      </div>
    </div>
    
    <!-- Screens -->
    ${pagesHtml}
  </body>
  </html>
  `;

  const htmlPath = path.join(CWD, 'scratch/document.html');
  fs.writeFileSync(htmlPath, htmlContent);
  console.log(`HTML generated at ${htmlPath}`);

  console.log('4. Rendering HTML to PDF using Puppeteer...');
  const docPage = await browser.newPage();
  await docPage.goto(`file://${htmlPath}`, { waitUntil: 'networkidle2' });
  
  const pdfPath = path.join(CWD, 'Algorhythm_Prototype_Screens.pdf');
  await docPage.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm'
    }
  });

  console.log(`SUCCESS: PDF document generated successfully at ${pdfPath}`);

  // Cleanup
  console.log('5. Cleaning up browser...');
  await browser.close();
  console.log('Done!');
}

main().catch(err => {
  console.error('Fatal error during execution:', err);
  process.exit(1);
});
