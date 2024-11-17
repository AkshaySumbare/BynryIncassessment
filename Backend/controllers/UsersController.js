const Users = require("../models/User");

const getAllUsers = async (req, res) => {
  const { sort, select } = req.query;

  let result = Users.find();

  if (sort) {
    let sortFix = sort.replace(",", " ");
    result = result.sort(sortFix);
  }

  if (select) {
    let selectFix = select.split(",").join(" ");
    result = result.select(selectFix);
  }

  const myData = await result;

  res.status(200).json({ myData, nbHits: myData.length });
};

//****************Search Data************************** */

const getSearchData = async (req, res) => {
  let query = {};
  const searchData = req.query.search;
  if (searchData) {
    query = {
      $or: [
        { name: { $regex: searchData, $options: "i" } },
        { description: { $regex: searchData, $options: "i" } },
        { Interest: { $regex: searchData, $options: "i" } },
        { location: { $regex: searchData, $options: "i" } },
      ],
    };
  }

  let result = await Users.find(query);
  res.json(result);
};

//**********************Pagination********************** */

const Pagination = async (req, res) => {
  const allProducts = await Users.find({});
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const lastIndex = page * limit;

  const results = {};
  results.totalUser = allProducts.length;
  results.pageCount = Math.ceil(allProducts.length / limit);

  if (lastIndex < allProducts.length) {
    results.next = {
      page: page + 1,
    };
  }

  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
    };
  }

  results.paginateData = allProducts.slice(startIndex, lastIndex);

  res.json(results);
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Users.findOne({ _id: id });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updateUserdata = req.body;
    const updateData = await Users.updateOne(
      { _id: id },
      {
        $set: updateUserdata,
      }
    );
    return res.status(200).json(updateData);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  getSearchData,
  Pagination,
  getUserById,
  updateUserById,
};
