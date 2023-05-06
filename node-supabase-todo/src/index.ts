import express = require("express");
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "YOUR SUPABASE URL";
const supabaseKey = "YOUR SUPABASE KEY";

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

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
