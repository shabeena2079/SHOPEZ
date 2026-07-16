const Banner = require("../models/Banner");

// Get Banner
const getBanner = async (req, res) => {
  try {

    let banner = await Banner.findOne();

    if (!banner) {

      banner = await Banner.create({
        image: ""
      });

    }

    res.status(200).json(banner);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// Update Banner
const updateBanner = async (req, res) => {
  try {

    const { image } = req.body;

    let banner = await Banner.findOne();

    if (!banner) {

      banner = new Banner({
        image
      });

    } else {

      banner.image = image;

    }

    await banner.save();

    res.status(200).json({
      message: "Banner Updated Successfully",
      banner
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  getBanner,
  updateBanner
};