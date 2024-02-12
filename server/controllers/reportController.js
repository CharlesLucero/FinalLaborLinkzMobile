const reportModel = require("../models/reportModel");
const reportUser = async (req, res) => {
    try {
        const { reportedUserId, violation, description } = req.body;

        if (!reportedUserId || !violation || !description) {
            return res.status(400).send({
                success: false,
                message: "Please Provide All Fields",
            });
        }

        const report = new reportModel({
            reportedUserId,
            violation,
            description,
            reportedBy: req.auth._id,
        });

        await report.save();

        res.status(201).send({
            success: true,
            message: "Reported user successfully",
            report,
        });

        console.log(req);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in Create report API",
            error,
        });
    }
};

module.exports = { reportUser };


