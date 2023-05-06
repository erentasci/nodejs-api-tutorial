import express = require("express");
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://jnvlkmlizxcmqzihupyh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpudmxrbWxpenhjbXF6aWh1cHloIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMyMTI3MDIsImV4cCI6MTk5ODc4ODcwMn0.QOOB-OekTzWAeeEVF4-ar04ALzwWOEwZNFPyORJxNdA";

const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();

app.use(express.json());

app.get("/todos", async (req, res) => {
  let { data: todos, error } = await supabase.from("todos").select("*");
  console.log(todos);

  try {
    if (!todos) {
      return console.log("No data");
    }
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  let { data: todo, error } = await supabase
    .from("todos")
    .select("*")
    .eq("id", id);
  if (!todo) {
    console.log("No data");
  }
  try {
    res.status(200).json(todo);
  } catch {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post("/todos", async (req, res) => {
  const { title, description } = req.body;

  const { data, error } = await supabase.from("todos").insert([
    {
      title,
      description,
    },
  ]);

  try {
    console.log("Todo Created!");
    res.status(201).send("Todo created");
  } catch {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
