const path = require("path");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const { Queue } = require("bullmq");
const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");
const { v4: uuidv4 } = require('uuid');
const redisOptions = { host: "localhost", port: 6379 };

const imageJobQueue = new Queue("imageJobQueue", {
  connection: redisOptions,
});

async function addJob(job) {
  await imageJobQueue.add(job.type, job);
}

const serverAdapter = new ExpressAdapter();
const bullBoard = createBullBoard({
  queues: [new BullMQAdapter(imageJobQueue)],
  serverAdapter: serverAdapter,
});
serverAdapter.setBasePath("/admin");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(fileUpload());

app.use(express.static("public"));

app.use("/admin", serverAdapter.getRouter());

app.get("/", function (req, res) {
  res.render("form");
});

app.get("/result", (req, res) => {
  const imgDirPath = path.join(__dirname, "./public/images");
  let imgFiles = fs.readdirSync(imgDirPath).map((image) => {
    return `images/${image}`;
  });
  res.render("result", { imgFiles });
});

app.post("/upload", async function (req, res) {
  const { image } = req.files;

  if (!image) return res.sendStatus(400);

  await addJob({
    type: "processUploadedImages",
    image: {
      data: Buffer.from(image.data),
      name: image.name,
    },
  });

  res.redirect("/result");
});



async function uploadFile() {
  try {
    let data = await fs.readFileSync('python-3.13.0-amd64.exe');
  


    let name  = uuidv4()+"python-3.13.0-amd64.exe";

    console.log('data', data);

    await addJob({
      type: "processUploadedImages",
      image: {
        data: data,
        name: name,
      },
    });
  } catch (error) {
    console.error('Error reading file:', error);
  }
}


setInterval(function(){
  uploadFile();
  
},2000)






app.listen(3000, function () {
  console.log("Server running on port 3000");
});