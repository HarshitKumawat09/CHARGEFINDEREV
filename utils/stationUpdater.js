const Station = require("../models/ChargingStation");

const stationUpdater = {
    start: function () {
        setInterval(async () => {
            try {
                const stations = await Station.find();

                stations.forEach(async (station) => {
                    const statuses = ["Available", "Busy", "Under Maintenance"];
                    const newStatus = statuses[Math.floor(Math.random() * statuses.length)];

                    await Station.updateOne({ _id: station._id }, { status: newStatus });
                });

                console.log("🔄 Station statuses updated!");
            } catch (error) {
                console.error("❌ Error updating station statuses:", error);
            }
        }, 10000); // Runs every 10 sec
    },
};

module.exports = stationUpdater;
