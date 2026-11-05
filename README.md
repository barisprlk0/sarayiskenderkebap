# Saray İskender Kebap

İşletmenin tanıtım sitesi. Derleme adımı olmayan statik bir sayfadır: HTML, CSS ve JavaScript.

## Yerelde çalıştırma

```bash
python -m http.server 8765
```

Ardından tarayıcıda `http://localhost:8765` adresini açın.

## Yapı

| Yol | İçerik |
| --- | --- |
| `index.html` | Tüm sayfa içeriği; menü, adres ve telefon burada |
| `assets/css/style.css` | Tasarım; renkler dosyanın başındaki değişkenlerde |
| `assets/js/main.js` | Menü sekmeleri, görsel büyütme, mobil menü |
| `assets/img/` | Optimize edilmiş WebP görseller |
| `scripts/optimize_images.py` | Ham fotoğraflardan görselleri üretir (Pillow gerekir) |
| `scripts/image_manifest.json` | Hangi görselin hangi fotoğraftan üretildiği |

## Bilgilerin kaynağı

- **Telefon:** Tabela ve işletmenin Google kaydı.
- **Adres, konum ve saatler:** İşletmenin Google kaydı (5 Kasım 2026'da okundu). Saatleri bir rehber sitesi de doğruluyor.
- **Menü:** İşletmeden alınmış bir liste değildir. Fotoğraflardan ve kayıtlarda geçen ürünlerden seçildi; yemek adlarının çoğu fotoğrafa bakılarak verildi. Bu yüzden sitede "Sofradan seçmeler" olarak sunulur ve fiyat içermez.
- **Mekân metinleri:** Dış mekân masaları, toplu yemek ve kuryeyle paket servis ifadeleri fotoğraflardan çıkarıldı.

İşletme onayladığında menü `index.html` içindeki `#menu` bölümünden güncellenebilir.
