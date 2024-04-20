import Result from "../models/resultModel.js";

export const createResult = async (req, res) => {
  try {
    const newResult = new Result(req.body);
    await newResult.save();

    res.status(200).json({ message: "OK" });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};
export const getResults = async (req, res) => {
  const results = await Item.find();

  res.status(200).json(results);
};

export const deleteResults = async (req, res) => {
  // TODO2: implement this function
  // HINT: you can serve the internet and find what method to use for deleting item.
  res.status(501).send("Unimplemented");
};

export const filterItems = async (req, res) => {
  // TODO3: implement this filter function
  // WARNING: you are not allowed to query all items and do something to filter it afterward.
  // Otherwise, you will be punished by -0.5 scores for this part
  res.status(501).send("Unimplemented");
};