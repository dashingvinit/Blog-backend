const { StatusCodes } = require('http-status-codes');
const { BlogRepository } = require('../repositories');
const blogRepository = new BlogRepository();

async function getBlogs() {
  try {
    const blogs = await blogRepository.getAll();
    return blogs;
  } catch (error) {
    // console.log(error);
    throw new AppError(
      'Something went wrong while fetching gyms',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  getBlogs,
};
