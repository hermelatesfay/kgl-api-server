const {procurementModel} = require("../models/procurement.js")

const createProcurement = async (req, res) => {
  try {

    const procurement = await procurementModel.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Procurement created successfully",
      procurement
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const getProcurement = async (req, res) => {
  try {
    let procurement = await procurementModel.find();
    res.json(procurement);
    res.status(200);
  } catch (err) {
    res.json({ message: "Failed to get procurement" });
    res.status(400);
  }
}


const updateProcurementByID = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    let updateProcurement = await procurementModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (updateProcurement) {
      res.json({ message: "Update Successful", updateProcurement });
      res.status(200);
    } else {
      res.json({ message: "Failed to update procurement" });
      res.status(400);
    }
  } catch (err) {
    res.json({ message: "Failed to update procurement", err });
    res.status(400);
  }
}


const deleteProcurementByID = async (req, res) => {
  try {
    const id = req.params.id;

    let deleteProcurement = await procurementModel.findByIdAndDelete(id);

    if (deleteProcurement) {
      res.json({ message: "Procurement deleted successfully" });
      res.status(200);
    } else {
      res.json({ message: "Failed to delete procurement" });
      res.status(400);
    }
  } catch (error) {
    res.json({ message: "Failed to delete procurement", error });
    res.status(400);
  }
}

module.exports = {createProcurement,getProcurement,updateProcurementByID,deleteProcurementByID}