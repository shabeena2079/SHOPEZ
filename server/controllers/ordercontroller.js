const Order = require("../models/Order");


// Place Order (User)
const placeOrder = async (req, res) => {

  try {

    const order = new Order({
      ...req.body,
      user: req.user.id,
    });


    await order.save();


    res.status(201).json({
      message: "Order Placed Successfully",
      order,
    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



// Cancel Order (User)
const cancelOrder = async (req, res) => {

  try {

    const order = await Order.findById(req.params.id);


    if (!order) {

      return res.status(404).json({
        message:"Order Not Found",
      });

    }


    order.orderStatus = "Cancelled";


    await order.save();


    res.status(200).json({
      message:"Order Cancelled Successfully",
      order,
    });


  } catch(error) {

    res.status(500).json({
      message:error.message,
    });

  }

};



// Get Logged-in User Orders
const getMyOrders = async (req,res)=>{

  try{


    const orders = await Order.find({
      user:req.user.id,
    })
    .populate("products.product")
    .populate("user");


    res.status(200).json(orders);


  }catch(error){


    res.status(500).json({
      message:error.message,
    });


  }

};




// Get All Orders (Admin)
const getAllOrders = async (req,res)=>{

  try{


    const orders = await Order.find()
    .populate("products.product")
    .populate("user");


    res.status(200).json(orders);


  }catch(error){


    res.status(500).json({
      message:error.message,
    });


  }

};




// Update Order Status (Admin)
const updateOrderStatus = async(req,res)=>{

  try{


    const order = await Order.findByIdAndUpdate(

      req.params.id,

      {
        orderStatus:req.body.orderStatus,
      },

      {
        new:true,
      }

    );


    if(!order){

      return res.status(404).json({
        message:"Order Not Found",
      });

    }


    res.status(200).json({

      message:"Order Status Updated Successfully",

      order,

    });


  }catch(error){


    res.status(500).json({
      message:error.message,
    });


  }

};



module.exports = {

  placeOrder,

  getMyOrders,

  getAllOrders,

  updateOrderStatus,

  cancelOrder,

};