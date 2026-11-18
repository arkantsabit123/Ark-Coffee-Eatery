# Paket Pembuatan Website Ark Coffee & Eatery

Dokumen ini merangkum tiga opsi paket dan status pekerjaan proyek saat ini. Harga adalah rentang indikatif yang diberikan pemilik proyek, bukan penawaran atau kontrak final.

## Paket Dasar — Rp 1.500.000-Rp 2.500.000

Usulan deliverable:

- Website statis responsif untuk desktop dan ponsel.
- Konten halaman, menu, dan galeri berdasarkan materi/fakta yang disetujui pelanggan.
- Tombol kontak WhatsApp menggunakan nomor yang disetujui.
- Informasi lokasi/jam operasional dan metadata dasar SEO.
- Pemeriksaan build dan tes lokal yang relevan.
- Pemeriksaan dasar keyboard dan struktur aksesibilitas.
- Serah-terima source code/repository.
- Tidak termasuk revisi.

Status proyek sekarang: pemilik menyetujui scope Paket Dasar, source code termasuk, tanpa revisi, mengonfirmasi gambar JPG adalah foto miliknya, dan menerima hasil Paket Dasar pada 2026-11-18. Implementasi utama situs serta pemeriksaan aksesibilitas dasar tersedia; build statis lulus pemeriksaan responsive/keyboard dasar. Audit formal screen reader/axe bukan bagian dari Paket Dasar. Source tersedia di repository lokal; tidak ada commit, push, atau deployment.

Tidak termasuk dalam Paket Dasar: deployment oleh pengembang, revisi, backend reservasi, login staf, database pelanggan, payment gateway, dan biaya layanan pihak ketiga.

## Paket Standar — Rp 2.500.000-Rp 4.000.000

Termasuk cakupan Paket Dasar, ditambah:

- Deployment situs statis ke platform yang disepakati.
- README/panduan menjalankan dan membangun situs.
- Revisi konten atau tampilan sesuai daftar revisi yang disetujui.
- Pemeriksaan URL hasil deployment dan serah-terima instruksi pengelolaan.

Status proyek sekarang: situs statis sebelumnya telah tersedia di GitHub Pages dan README lokal tersedia. Perubahan worktree terbaru belum di-deploy. Jumlah dan batas revisi, akun/domain tujuan, dan tanggung jawab atas biaya layanan perlu disepakati sebelum pekerjaan paket ini dijual atau dijadwalkan.

Tidak termasuk dalam usulan ini: backend reservasi produksi, autentikasi staf, penyimpanan data permanen, dan integrasi pembayaran.

## Paket Produksi Penuh — Rp 7.500.000-Rp 15.000.000+

Termasuk cakupan website/deployment yang disepakati, ditambah rencana implementasi:

- Backend reservasi dan penyimpanan database permanen.
- Login serta pembatasan akses staf (admin, manager, owner).
- Integrasi payment gateway yang disetujui; pengujian dimulai di sandbox jika tersedia.
- Penanganan notifikasi status pembayaran, kegagalan, duplikasi, dan refund sesuai kemampuan penyedia.
- Kontrol keamanan, audit aktivitas, pencadangan/operasional, dan prosedur retensi/penghapusan data.
- Pengujian staging, aksesibilitas, keamanan, dan alur end-to-end sebelum rilis.

Status proyek sekarang: hanya prototipe lokal dengan data sementara yang sudah ada. Tidak ada database permanen, login staf, integrasi payment gateway, atau refund uang sungguhan. Penyedia pembayaran, hosting/backend, database, kebutuhan backup, biaya layanan, dan persetujuan operasional belum diputuskan. Rentang harga ini belum merupakan harga tetap; final scope dan harga memerlukan keputusan teknis dan persetujuan pemilik.

**Tidak termasuk tanpa kesepakatan terpisah:** biaya transaksi/merchant, hosting atau domain berbayar, biaya pesan pihak ketiga, pemindahan data produksi, serta operasi/pemeliharaan berkala. Tidak ada integrasi live, transaksi, atau deployment produksi sebelum persetujuan eksplisit.

## Syarat yang perlu dicatat pada penawaran

- Materi, harga menu, kontak, jadwal, dan kebijakan bisnis harus disetujui pelanggan.
- Jumlah revisi Paket Dasar adalah nol sesuai konfirmasi pemilik. Jadwal pengerjaan, masa dukungan, dan kriteria penerimaan tetap perlu ditulis di kontrak/penawaran.
- Akses merchant atau rahasia API tidak boleh dikirim melalui chat atau disimpan dalam source code; konfigurasi harus memakai penyimpanan rahasia yang sesuai.
- Prototipe offline hanya untuk data sintetis. Jangan gunakan untuk pelanggan atau pembayaran sungguhan.

## Pelacakan status proyek

Jalankan dari folder repository:

```powershell
py scripts\basic-package.py
py scripts\standart-package.py
py scripts\full-production-package.py
```

Status saat ini adalah snapshot dalam file Python. Untuk memperbarui pelacakan, ubah status dan catatan bukti pada daftar `ITEMS` di masing-masing file. Status `NEEDS_AGREEMENT` atau `BLOCKED` bukan berarti pekerjaan selesai.
