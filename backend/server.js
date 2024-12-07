const express = require('express')
const cors = require('cors');
const app = express()
const database = require("./database.js");

const port = 3000

// const memos = ["메모1 내용", "메모2 내용","메모3 내용"];
// const memos = [];

// 
console.log('__dirname: ', __dirname);
console.log('__filename: ' + __filename);
app.use(express.static('dist'));

// 요청 본문 파싱 미들웨어 추가
app.use(express.json());
// CORS 추가
app.use(cors({
    origin: 'http://127.0.0.1:5501', // Vue 애플리케이션의 URL
}));

app.get('/api/memos', async (req, res) => {
  try {
    const result = await database.GetMemosList();
    console.log("result: ", result);
    // res.send(result);
    res.status(200).send({
      message: "Memo successfully inserted",
      result: result
    });
  } catch (err) {
    console.error('Error fetching memos:', error);
    res.status(500).send({ error: 'Failed to fetch memos' });
  }
  
});

app.post("/api/memos", async (req, res) => {
  try {
    const content = req.body.content;
    if (!content) {
      return res.status(400).send({ error: "Content is required" });
    }
    console.log('req.body.content: ', content);

    await database.PostMemosInput(content);
    const result = await database.GetMemosList();
    console.log("result: ", result);
    res.status(200).send({
      message: "Memo successfully inserted",
      result: result
    });
  } catch (error) {
    console.error('Error in POST /api/memos:', error);
    res.status(500).send({ error: "Failed to insert memo" });
  }
})

app.put("/api/memos/:id", async (req, res) => {
  console.log("req.params.id: ", req.params.id);
  console.log("req.body.content: ", req.body.content);
  // memos[req.params.idx] = req.body.content;
  // res.send(memos);
  try {
    const id = req.params.id;
    const content = req.body.content;
    if (!content) {
      return res.status(400).send({ error: "Content is required" });
    }
    // console.log('req.body.content: ', content);

    await database.PutMemosUpdate(id, content);
    const result = await database.GetMemosList();
    res.status(200).send({
      message: "Memo successfully updated",
      result: result
    });
  } catch (error) {
    console.error('Error in PUT /api/memos:', error);
    res.status(500).send({ error: "Failed to update memo" });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});