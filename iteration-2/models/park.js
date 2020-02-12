var mongoose = require("mongoose");

var ParkSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	directionsInfo: String,
	address: {
		city: String,
		stateCode: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Park", ParkSchema);