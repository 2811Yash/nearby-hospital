const express = require("express");
const cors = require("cors");
const app = express();

// ✅ Allow all origins (for development)
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { getJson } = require("serpapi");

app.get("/hospitals", (req, res) => {
  const location = req.query.location;
  const query = `Hospitals near ${location}`;
  
  getJson({
    engine: "google",
    q: query,
    api_key: "0d4158ffca710a27cae0b0cb2612ada8c17555b5de50123589ecf6e20c7876de"
  }, (json) => {
    if (json && json.local_results && json.local_results.places) {
      res.json(json.local_results.places);
    } else {
      res.status(500).json({ error: "No data found" });
    }
  });
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:3000");
});
