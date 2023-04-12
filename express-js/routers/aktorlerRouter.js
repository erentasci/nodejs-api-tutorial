const router = require("express").Router();
let data = require("../data.js");

router.get("/", (req, res) => {
  res.status(200).json(data);
});

let next_id = 4;

router.post("/", (req, res) => {
  let yeni_aktor = req.body; // Body ile aktor aldık
  yeni_aktor.id = next_id; // id verildi
  next_id++; // id arttırıldı
  data.push(yeni_aktor); // data'ya aktor eklendi
  res.status(201).json(yeni_aktor); // 201: Created
});

router.delete("/:id", (req, res) => {
  const { id } = req.params; // id'yi aldık paramstan - string olarak geliyor
  const aktor = data.find((aktor) => {
    return aktor.id === parseInt(id); // integer yaptık
  });

  if (aktor) {
    data = data.filter((aktor) => {
      return aktor.id !== parseInt(id);
    });
    res.status(204).end(); // 204: Başarılı olarak silindi
  } else {
    res.status(404).json({ errorMessage: "Aradığınız aktör bulunamadı." });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const aktor = data.find((aktor) => {
    return aktor.id === parseInt(id);
  });
  if (aktor.id && aktor.isim) {
    aktor.isim = req.body.isim;
    // console.log(aktor.isim);
    aktor.filmler = req.body.filmler;
    // console.log(aktor.filmler);
    res.status(200).json(aktor);
  } else {
    res.status(404).json({ errorMessage: "Aktör eklenemedi." });
  }
});

// Get Methodu sadece tarayıcıda çalışır..
router.get("/:id", (req, res) => {
  //   const id = req.params.id;
  // console.log("req.params: ", req.params); // GET (genelde)
  // console.log("req.query", req.query); // GET (genelde)
  console.log("req.body", req.body); // POST (genelde)
  const { id } = req.params;
  const aktor = data.find((aktor) => {
    return aktor.id === parseInt(id);
  });
  if (aktor) {
    res.status(200).json(aktor);
  } else {
    res.status(404).send("Aradığınız aktör bulunamadı...");
  }
});

module.exports = router;
