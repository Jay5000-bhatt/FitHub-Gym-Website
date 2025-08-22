import mongoose from "mongoose";
import dotenv from "dotenv";


const ConnectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
		});
		console.log("Succesfully Connected With Database.");
	} catch (error) {
		console.error("Error Connecting To Database:", error.message);
		process.exit(1);
	}
};

export default ConnectDB;
