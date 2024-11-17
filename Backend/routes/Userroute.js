const express = require("express");
const getdata = require("../controllers/UsersController");

const router = express.Router();

router.route("/getUsers").get(getdata.getAllUsers);
router.route("/getSearch").get(getdata.getSearchData);
router.route("/getPaginate").get(getdata.Pagination);

module.exports = router;
