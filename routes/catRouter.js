const { default: axios } = require("axios");
const express = require("express");
const catRouter = express.Router();

// Obtain api
// Breeds, all cats {name, breed, info} , info cat by id

catRouter.get("/breed", async (req, res) => {
  try {
    const data = (
      await axios({
        method: "GET",
        url: "https://api.thecatapi.com/v1/breeds",
        headers: {
          "x-api-key": process.env.CAT__KEY,
        },
      })
    ).data.map((cat) => {
      dataCat = {
        id: cat.id,
        name: cat.name,
        description: cat.description,
        image: cat.image?.url || "undefined",
      };

      return dataCat;
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      msg: "Error en el servidor 😿 porfavor comuniquese con el desarrollador backend",
    });
    console.log(error);
  }
});

catRouter.get("/breed/:breed", async (req, res) => {
  try {
    const { breed } = req.params;

    const data = (
      await axios({
        method: "GET",
        url: `https://api.thecatapi.com/v1/images/search?breed_ids=${breed}&limit=8`,
        headers: {
          "x-api-key": process.env.CAT__KEY,
        },
      })
    ).data;

    const infoData = data[0].breeds;
    const imagesData = data.map((cat) => {
      return cat?.url || "undefined";
    });

    return res.status(200).json({
      info: infoData,
      images: imagesData,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error en el servidor 😿 porfavor comuniquese con el desarrollador backend",
    });
    console.log(error);
  }
});
module.exports = catRouter;
