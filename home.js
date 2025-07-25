const express = require('express');
const app = express();

const db = require('./data/db');
const Anayemek = require('./models/anayemek');
const icecekler = require('./models/icecekler');  

// Görüntüleme ayarları ve statik dosyalar
app.set('view engine', 'ejs');
app.use(express.static('public'));

// ROUTE

// app.get("/index", function(req, res) {
// res.render('index');
// });

// app.get("/", function(req, res) {
// res.render('index');
// });



// Veritabanı işlemlerini sıralı yap
db.serialize(() => {
  // 🍗 Anayemek ekle
  const anayemek1 = new Anayemek(null,"Tavuk Izgara", 60, "Lezzetli ızgara tavuk", "res_img_5.jpg", 1, 1);
  db.run(`
    INSERT INTO anayemekler (name, price, description, imageUrl, isActive, isHome)
    VALUES (?, ?, ?, ?, ?, ?)
  `, [anayemek1.name, anayemek1.price, anayemek1.description, anayemek1.imageUrl, anayemek1.isActive, anayemek1.isHome]);

  const anayemek2 = new Anayemek(null,"Et Tavuk Ekmek", 20, "Lezzetli Ekmek tavuk", "res_img_3.jpg", 1, 1);
  db.run(`
    INSERT INTO anayemekler (name, price, description, imageUrl, isActive, isHome)
    VALUES (?, ?, ?, ?, ?, ?)
  `, [anayemek2.name, anayemek2.price, anayemek2.description, anayemek2.imageUrl, anayemek2.isActive, anayemek2.isHome]);

  // 🧃 İçecek ekle
  const icecek1 = new icecekler(null,"su", 400, "buz gibi su", "res_img_6.jpg", 1, 1);
  db.run(`
    INSERT INTO icecekler (name, price, description, imageUrl, isActive, isHome)
    VALUES (?, ?, ?, ?, ?, ?)
  `, [icecek1.name, icecek1.price, icecek1.description, icecek1.imageUrl, icecek1.isActive, icecek1.isHome]);

 

  // ✅ Veritabanı okuma
  db.each("SELECT * FROM anayemekler", (err, row) => {
    if (err) console.error("Anayemek hata:", err);
    else console.log("Anayemek:", row);
  });

  db.each("SELECT * FROM icecekler", (err, row) => {
    if (err) console.error("icecekler hata:", err);
    else console.log("icecek:", row);
  });

  // 🔐 Son olarak veritabanını kapat
  // db.close((err) => {
  //   if (err) console.error("Kapatma hatası:", err);
  //   else console.log("Veritabanı kapatıldı");
  });
  //});


// bu bölüm menüye gönderim yapıldığı yer bu bağlatı olmadan veri gösterilmez
app.get(['/', '/index'], (req, res) => {
  db.all('SELECT * FROM anayemekler', (err1, anayemekler) => {
    if (err1) {
      console.error("Anayemekler okuma hatası:", err1);
      return res.status(500).send("Veritabanı hatası (anayemekler)");
    }

    db.all('SELECT * FROM icecekler', (err2, icecekler) => {
      if (err2) {
        console.error("İçecekler okuma hatası:", err2);
        return res.status(500).send("Veritabanı hatası (icecekler)");
      }

      res.render('index', {
        anayemekler: anayemekler,
        icecekler: icecekler // dikkat: ejs'de kullandığın isimle aynı
      });
    });
  });
});

// 🌐 Server başlat
app.listen(3000, () => {
console.log('Server is running on http://localhost:3000');
});
