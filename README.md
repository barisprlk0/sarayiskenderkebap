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

## Yayına almadan önce doğrulanacaklar

Bu bilgiler web'deki rehber kayıtlarından alındı, işletmeden teyit edilmedi:

- **Adres ve harita konumu:** Talatpaşa Mah. 1015. Sok. No:68, Esenyurt. Telefonu tabelayla eşleşen kayıttan alındı.
- **Çalışma saatleri:** 10:30 – 00:00. Kaynaklar birbiriyle çelişiyor.
- **Menü:** Yemek adları sipariş platformu listesinden ve fotoğraflardan derlendi. Bazı adlar fotoğrafa bakılarak verildi.
- **Metinler:** Dış mekân masaları, toplu yemek ve kuryeyle paket servis ifadeleri fotoğraflardan çıkarıldı.

Alan adı belli olunca `index.html` içine `canonical`, `og:url` ve `og:image` etiketleri ile yapılandırılmış veriye `url` ve `image` alanları eklenmeli.
