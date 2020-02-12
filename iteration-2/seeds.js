var mongoose 	= require("mongoose"),
	Park	 	= require("./models/park"),
	Comment		= require("./models/comment");

var data = [
	{
		name: "Yellowstone National Park",
		image: "https://source.unsplash.com/qVmbifOhp8c",
		description: "Yellowstone National Park is an American national park located mostly in Wyoming, with small sections in Montana and Idaho. It was established by the U.S. Congress and signed into law by President Ulysses S. Grant on March 1, 1872.[5][6] Yellowstone was the first national park in the U.S. and is also widely held to be the first national park in the world.[7] The park is known for its wildlife and its many geothermal features, especially Old Faithful geyser, one of its most popular features.[8] It has many types of ecosystem, but the subalpine forest is the most abundant. It is part of the South Central Rockies forests ecoregion.",
		directionsInfo: "Yellowstone National Park covers nearly 3,500 square miles in the northwest corner of Wyoming (3% of the park is in Montana and 1% is in Idaho). Yellowstone has five entrance stations, and several are closed to regular vehicles during winter. It takes many hours to drive between these entrances, so be sure to check the status of roads at the entrance you intend to use while planning your trip and before you arrive.",
		address: {
			city: "Yellowstone National Park",
			stateCode: "WY"
		}
	},
	{
		name: "Yosemite National Park",
		image: "https://source.unsplash.com/M6XC789HLe8",
		description: "Yosemite National Park is an American national park located in the western Sierra Nevada of Central California, bounded on the southeast by Sierra National Forest and on the northwest by Stanislaus National Forest. The park is managed by the National Park Service and covers an area of 748,436 acres (1,169 sq mi; 3,029 km2) and sits in four counties: centered in Tuolumne and Mariposa, extending north and east to Mono and south to Madera County. Designated a World Heritage site in 1984, Yosemite is internationally recognized for its granite cliffs, waterfalls, clear streams, giant sequoia groves, lakes, mountains, meadows, glaciers, and biological diversity.Almost 95% of the park is designated wilderness.",
		directionsInfo: "",
		address: {
			city: "Yosemite National Park",
			stateCode: "CA"
		}
	},
	{
		name: "Grand Canyon National Park",
		image: "https://source.unsplash.com/2kkzQlDqfcc",
		description: "Unique combinations of geologic color and erosional forms decorate a canyon that is 277 river miles (446km) long, up to 18 miles (29km) wide, and a mile (1.6km) deep. Grand Canyon overwhelms our senses through its immense size.",
		directionsInfo: "South Rim: Open all year, is located 60 miles north of Williams, Arizona (via route 64 from Interstate 40) and 80 miles northwest of Flagstaff (via route 180). Grand Canyon lies entirely within the state of Arizona. North Rim: Now closed for the winter - opens May 15, 2020, for the season. North Rim is located 30 miles south of Jacob Lake on Highway 67; the actual rim of the canyon is an additional 14 miles south. Jacob Lake, AZ is located in northern Arizona on Highway 89A, not far from the Utah border.",
		address: {
			city: "Grand Canyon",
			stateCode: "AZ"
		}
	}
]

function seedDB() {
	// Remove all campgrounds
	Park.remove({}, function(err){
		if(err){
			console.log(err);
		} else {
			console.log("removed campgrounds!");
			// Add new campgrounds from data seeds
			data.forEach(function(seed){
				Park.create(seed, function(err, park){
					if(err){
						console.log(err);
					} else {
						console.log("added a campground");
						Comment.create({
							text: "This place is great, but I wish it has internet.",
							author: "Homer"
									   }, function(err, comment){
							if(err){
								console.log(err);
							} else{
								park.comments.push(comment);
								park.save();	
								console.log("Created new commnet");
							}
						});
					}
				});
			});
		}
	});
	// Add a few comments
}


module.exports = seedDB;