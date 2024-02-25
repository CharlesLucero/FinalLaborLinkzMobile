const HiringProcess = require('../models/HiringProcessModel');

// Controller function to send an application from user1 to user2
// Controller function to send an application from user1 to user2
const sendApplication = async (req, res) => {
    const { senderId, receiverId, postId } = req.body;

    console.log(`SERVER:::::: THIS IS POST ID: ${postId}, ${senderId}, ${receiverId}` )

    try {
        // Check if the hiring process already exists
        const existingProcess = await HiringProcess.findOne({ senderId, receiverId });
        if (existingProcess) {
            return res.status(400).json({ message: 'Application already sent.' });
        }

        // Create a new hiring process with senderId, receiverId, and postId
        const newApplication = await HiringProcess.create({ senderId, receiverId, postId });
        return res.status(201).json({ message: 'Application sent successfully.', data: newApplication });
    } catch (error) {
        console.error('Error sending application:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};


// Controller function for user2 to accept an application
const acceptApplication = async (req, res) => {
    const { hiringProcessId } = req.params;

    try {
        // Find the hiring process by ID
        const hiringProcess = await HiringProcess.findById(hiringProcessId);
        if (!hiringProcess) {
            return res.status(404).json({ message: 'Hiring process not found.' });
        }

        // Accept the application
        await hiringProcess.accept();
        return res.status(200).json({ message: 'Application accepted successfully.', data: hiringProcess });
    } catch (error) {
        console.error('Error accepting application:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Controller function for user2 to decline an application
const declineApplication = async (req, res) => {
    const { hiringProcessId } = req.params;

    try {
        // Find the hiring process by ID
        const hiringProcess = await HiringProcess.findById(hiringProcessId);
        if (!hiringProcess) {
            return res.status(404).json({ message: 'Hiring process not found.' });
        }

        // Decline the application
        await hiringProcess.decline();
        return res.status(200).json({ message: 'Application declined successfully.', data: hiringProcess });
    } catch (error) {
        console.error('Error declining application:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const getReceivedApplications = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find all hiring processes where this user is the receiver
        const receivedApplications = await HiringProcess.find({ receiverId: userId }).populate('senderId');

        return res.status(200).json({ message: 'Received applications retrieved successfully.', data: receivedApplications });
    } catch (error) {
        console.error('Error retrieving received applications:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};



const getSentApplications = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find all hiring processes where this user is the sender
        const sentApplications = await HiringProcess.find({ senderId: userId }).populate('receiverId');

        return res.status(200).json({ message: 'Sent applications retrieved successfully.', data: sentApplications });
    } catch (error) {
        console.error('Error retrieving sent applications:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = {declineApplication,getSentApplications, getReceivedApplications, acceptApplication, sendApplication}