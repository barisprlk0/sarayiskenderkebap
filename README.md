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

- **Telefonlar:** Tabela, işletmenin Google kaydı ve broşürü. Ek numaralar ve Instagram broşürden; Instagram adresi broşürdeki QR koddan okundu.
- **Adres ve konum:** İşletmenin Google kaydı (5 Kasım 2026'da okundu).
- **Saatler:** İşletmenin broşürü (07:00 – 23:00). Broşür gün belirtmiyor; Google kaydı farklı saat gösteriyor (Pzt–Cmt 08:00, Pazar 09:00 açılış).
- **Menü:** İşletmenin basılı (fiyatlı) menüsü; bölümler, sıralama ve ürün adları onu birebir izler. Tombik Et Döner, Yeşil Salata ve kilo ürünleri yalnızca broşürde geçtiği için bölümlerinin sonuna eklendi. Fiyatlar bilerek yazılmadı.
- **Menü görselleri:** Önce işletmenin kendi fotoğrafları kullanıldı. Basılı menüdeki ya da broşürdeki görseller kullanılmaz. Kendi fotoğrafı olmayan ürünlerin görseli internetten alındı. Aynı görünen ürünler (Adana/Urfa Dürüm, Üç Çeyrek/Yarım Döner, kilo ürünleri ile porsiyonları) aynı fotoğrafı paylaşır.
- **İnternetten alınan görseller:** Yalnızca serbest lisanslı görseller kullanıldı; `scripts/web_images/` içinde durur. Eser sahibi ve lisans bilgileri sitenin altındaki "Görsel kaynakları" bölümündedir, bu görseller değiştirilirse bölüm de güncellenmelidir.
- **Mekân metinleri:** Dış mekân masaları, toplu yemek ve kuryeyle paket servis ifadeleri fotoğraflardan çıkarıldı.

Menü `index.html` içindeki `#menu` bölümünden güncellenir.
