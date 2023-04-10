const multer = require("multer")
const uploadController = require("../controllers/upload");
const upload = multer({ dest: 'uploads' })

let routes = (app) => {
    app.get('/', (req, res) => {
        res.send('server working!')
    })

    app.post("/upload", upload.single('file'), uploadController.uploadFiles);

    app.use((req, res) => {
        return res.status(404).send("requested Api not Found");
    });
}

module.exports = routes;