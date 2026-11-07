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

- **Telefonlar:** Tabela, işletmenin Google kaydı ve broşürü.
- **Instagram:** İşletme tarafından verildi (@esenyurt.sarayiskender). Broşürdeki QR kodun gösterdiği @saray_iskender_ hesabı artık açılmıyor.
- **Adres ve konum:** İşletmenin Google kaydı (5 Kasım 2026'da okundu); No:91/F işletme tarafından onaylandı.
- **Saatler:** İşletmenin Google kaydı, işletme tarafından onaylandı (Pzt–Cmt 08:00 – 23:00, Pazar 09:00 – 23:00). Broşürdeki 07:00 açılış kullanılmadı.
- **Menü:** İşletmenin basılı (fiyatlı) menüsü; bölümler, sıralama ve ürün adları onu birebir izler. Tombik Et Döner, Yeşil Salata ve kilo ürünleri yalnızca broşürde geçtiği için bölümlerinin sonuna eklendi. Fiyatlar bilerek yazılmadı.
- **Menü görselleri:** Önce işletmenin kendi fotoğrafları kullanıldı. Basılı menüdeki ya da broşürdeki görseller kullanılmaz. Kendi fotoğrafı olmayan ürünlerin görseli internetten alındı. Aynı görünen ürünler (Adana/Urfa Dürüm, Üç Çeyrek/Yarım Döner, kilo ürünleri ile porsiyonları) aynı fotoğrafı paylaşır.
- **Tavuk Sac Tava görseli:** Site sahibi tarafından verildi (`scripts/web_images/tavuk-sac-tava.jpg`), kaynak listesinde yer almaz.
- **İnternetten alınan görseller:** Serbest lisanslı görseller kullanıldı; `scripts/web_images/` içinde durur. Site sahibinin isteğiyle eser sahibi ve lisans bilgisi sitede gösterilmiyor. CC BY ve CC BY-SA lisansları atıf şart koştuğu için bu görseller ya işletmenin kendi fotoğraflarıyla değiştirilmeli ya da aşağıdaki liste sitede yeniden gösterilmelidir.

  | Ürün | Eser sahibi | Lisans | Kaynak |
  | --- | --- | --- | --- |
  | Urfa Kebap | E4024 | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Urfa_kebap.jpg |
  | Beyti | E4024 | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Beyti_plate.jpg |
  | Ali Nazik (Dönerden) | E4024 | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Ali_Nazik.jpg |
  | Tavuk Suyu | E4024 | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Tavuk_suyu_%C3%A7orba.jpg |
  | Göbek Salata | E4024 | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Lettuce_salad.jpg |
  | Coca Cola | Ralf Roletschek | Kamu malı | https://commons.wikimedia.org/wiki/File:15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_(Germany).jpg |
  | Fanta | Emilian Robert Vicol | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:Fanta-Orange-Can-330ml_84177_(7116950883).jpg |
  | Cappy Meyve Suyu | quinn.anya | CC BY-SA 2.0 | https://www.flickr.com/photos/53326337@N00/4950571291 |
  | Şalgam Suyu | Sadettin | Kamu malı | https://commons.wikimedia.org/wiki/File:Glass_of_%C5%9Falgam.jpg |
  | Mercimek | E4024 | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Mercimek_%C3%A7orbas%C4%B1_in_Ankara,_Turkey.jpg |
  | Sandwich Döner | Aethonatic | CC0 | https://commons.wikimedia.org/wiki/File:KC_Fish_Bar_-_doner_kebab_burger_-_3_May_2026.jpg |
  | Çoban Salata | E4024 | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Amanida_turca.jpg |
  | Yeşil Salata | FranHogan | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Mixed_green_salad.jpg |
  | Tavuk Pirzola | E4024 | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Tavuk_pirzola.jpg |
  | Özel Lahmacun | E4024 | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Lahmacun_and_lemon.jpg |
  | Kuşbaşılı Kaşarlı Pide | E4024 | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Pide_with_cheese_and_veal.jpg |
- **Mekân metinleri:** Dış mekân masaları, toplu yemek ve kuryeyle paket servis ifadeleri fotoğraflardan çıkarıldı.

Menü `index.html` içindeki `#menu` bölümünden güncellenir.
