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

const getAllReports = async (req, res) => {
    try {
        // Fetch all reports from the database and populate the reportedUserId field
        const reports = await reportModel.find().populate('reportedUserId');

        // Filter reports where the reportedUserId's banned field is false
        const filteredReports = reports.filter(report => report.reportedUserId.banned === false);

        res.status(200).send({
            success: true,
            message: "All reports retrieved successfully",
            reports: filteredReports,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching reports",
            error,
        });
    }
};


module.exports = { reportUser, getAllReports };


