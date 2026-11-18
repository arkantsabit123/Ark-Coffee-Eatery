"""Progress checklist for the proposed Basic website package."""

from package_tracker import (
    DONE,
    ChecklistItem,
    print_package_report,
)


ITEMS = [
    ChecklistItem(
        DONE,
        "ARK-F01",
        "Membuat situs satu halaman dengan bagian sesuai spesifikasi dan layout responsif",
        "Halaman Astro memuat bagian yang ditentukan; browser build statis lulus tanpa overflow pada lebar 320, 375, 768, 1024, dan 1440 px.",
    ),
    ChecklistItem(
        DONE,
        "ARK-F02",
        "Memuat kategori menu, item, deskripsi, dan harga yang disetujui",
        "Data menu kanonis tampil pada build statis.",
    ),
    ChecklistItem(
        DONE,
        "ARK-F03",
        "Memuat gambar hero dan enam gambar galeri serta memastikan hak penggunaannya",
        "Pemilik mengonfirmasi file JPG adalah foto miliknya dan menyetujui penggunaannya; 22 gambar berhasil dimuat pada build statis.",
    ),
    ChecklistItem(
        DONE,
        "ARK-F04",
        "Menghubungkan tombol WhatsApp dengan nomor kontak yang disetujui",
        "Nomor yang disetujui dan pesan kontekstual digunakan pada data situs dan CTA.",
    ),
    ChecklistItem(
        DONE,
        "ARK-F09",
        "Menggunakan lokasi, jam buka, dan informasi kontak yang disetujui",
        "Data situs kanonis memuat informasi yang telah disetujui pemilik.",
    ),
    ChecklistItem(
        DONE,
        "ARK-N02",
        "Menambahkan SEO dasar dan metadata publik",
        "Metadata, canonical untuk Pages, sitemap, dan robots tersedia.",
    ),
    ChecklistItem(
        DONE,
        "ARK-N01",
        "Melakukan pemeriksaan dasar aksesibilitas dan penggunaan keyboard",
        "Build statis: satu H1 dan landmark utama, alt untuk 22 gambar, tidak ada overflow pada 5 lebar layar, skip-link memindahkan fokus ke main, nav dapat dibuka dengan Enter/ditutup Escape, FAQ dapat dioperasikan dengan keyboard, dan reduced-motion menonaktifkan smooth scroll. Audit formal screen reader/axe tidak termasuk cakupan dasar ini.",
    ),
    ChecklistItem(
        DONE,
        "ARK-N03",
        "Menjalankan pemeriksaan dan tes proyek",
        "Pemeriksaan dan build lulus; 15 tes lulus pada 2026-11-18.",
    ),
    ChecklistItem(
        DONE,
        "SCOPE",
        "Menyepakati cakupan akhir Paket Dasar dan kriteria serah-terima",
        "Pemilik menyetujui scope dasar, source code termasuk, tanpa revisi, dan tanpa deployment/backend/payment pada 2026-11-18.",
    ),
    ChecklistItem(
        DONE,
        "RELEASE",
        "Mendapatkan penerimaan akhir pelanggan atas hasil sesuai kontrak",
        "Pemilik menerima hasil Paket Dasar pada 2026-11-18. Source tersedia di repository lokal; tidak ada commit, push, atau deployment.",
    ),
]


if __name__ == "__main__":
    print_package_report(
        "Paket Dasar",
        "Rp 1.500.000-Rp 2.500.000",
        ITEMS,
        "Semua 10 item Paket Dasar diterima pemilik pada 2026-11-18. Source tetap lokal; tidak dilakukan deployment. Paket ini tidak mencakup backend produksi.",
    )
