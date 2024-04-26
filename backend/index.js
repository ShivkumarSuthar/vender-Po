const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

// Importing routes
const venderPost = require("./routes/vender/venderPost");
const venderGet = require("./routes/vender/venderGet");
const venderList = require("./routes/vender/venderGetAll");
const VenderEdit = require("./routes/vender/VenderEdit");
const venderCode = require("./routes/vender/venderCode");

const user = require('./routes/user/user');
const userEdit = require('./routes/user/userEdit');
const postUser = require('./routes/user/postUser');

const userDetails = require("./routes/organization/userDetailsPost");
const getUserDetails = require("./routes/organization/userDetailsGet");
const userDetailsUpdate = require("./routes/organization/userDetailsUpdate");
const logoView = require("./routes/organization/logoView");

const PoPost = require("./routes/PO/createPO");
const PoEdit = require("./routes/PO/EditPo");
const PoList = require("./routes/PO/PoList");
const ViewPo = require("./routes/PO/PoData");
const Po_combined = require("./routes/PO/viewPo");
const poAddCombined = require("./routes/PO/poCombinedAdd")
const Po_item = require("./routes/poItems/Po_item");

const editPoItemCollection = require("./routes/poItems/editPoItemCollection");

const PoItemDoc = require("./routes/PoItemDoc/DocPost");
const editDoc = require("./routes/PoItemDoc/editDoc");
const docList = require("./routes/PoItemDoc/docList");

// Middleware

app.use(cors({
    origin: ["https://deploy-mern-1whq.vefcel.app"],
    methods: ["POST", "GET"],
    credentials: true
}
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use("/api/user", user);
app.use("/api/user/UserEdit", userEdit);
app.use("/api/user", postUser);

app.use("/api/vender", venderPost);
app.use("/api/vender", venderGet);
app.use("/api/vender", venderList);
app.use("/api/vender", VenderEdit);
app.use("/api/vender", venderCode);

app.use("/api/organization", userDetails);
app.use("/api/organization", getUserDetails);
app.use("/api/organization", userDetailsUpdate);
app.use("/", logoView);

app.use("/api/Po", PoEdit);
app.use("/api/Po", PoList);
app.use("/api/Po", ViewPo);
app.use("/api/Po", PoPost);
app.use("/api/Po", PoPost);
app.use("/api/Po", Po_combined);
app.use("/api/Po", poAddCombined);

app.use("/api/poItems", Po_item);
app.use("/api/poItems", editPoItemCollection);

app.use("/api/PoItems/files", PoItemDoc);
app.use("/api/PoItems/files", editDoc);
app.use("/api/PoItems/files", docList);

// Connecting to MongoDB
mongoose.connect("mongodb+srv://shivstr21:jM4JH4ev6nPwkzmW@cluster1.cauptxp.mongodb.net/POMS?retryWrites=true&w=majority&appName=cluster1");

// Starting the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Running server on PORT ${PORT}`));
