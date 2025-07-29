import mongoose from "mongoose";

// Connect to the MongoDB database
const uri = process.env.DB_URL || "mongodb://localhost:27017/vi-forms";

let clientReadyState: mongoose.ConnectionStates | null = null;

async function connectDb() {
  try {
    // Check if already connected
    if (clientReadyState === mongoose.ConnectionStates.connected) {
      console.log("Already connected to MongoDB database");
      return;
    }

    // Create a new connection to the database
    const dbClient = await mongoose.connect(uri, {
      serverApi: {
        version: "1",
        deprecationErrors: true,
      },
    });

    clientReadyState = dbClient.connection.readyState;

    if (clientReadyState === mongoose.ConnectionStates.connected) {
      console.log("Connected to MongoDB database");
    }

    // Log errors
    dbClient.connection.on("error", (error) => {
      console.error("Error connecting to MongoDB database:", error);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB database:", error);
    throw error; // Rethrow the error after logging it
  }
}

// Optionally, you can add a function to close the connection gracefully
export async function disconnectDb() {
  if (clientReadyState === mongoose.ConnectionStates.connected) {
    await mongoose.disconnect();
    clientReadyState = null;
    console.log("Disconnected from MongoDB database");
  }
}

export default connectDb;
