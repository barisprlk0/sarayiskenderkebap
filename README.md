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
- **Menü:** İşletmenin basılı menüsü ve broşürü. Fiyatlar bilerek yazılmadı. Hangi fotoğrafın hangi ürüne ait olduğu görsellerden eşleştirildi.
- **Mekân metinleri:** Dış mekân masaları, toplu yemek ve kuryeyle paket servis ifadeleri fotoğraflardan çıkarıldı.

Menü `index.html` içindeki `#menu` bölümünden güncellenir.
