// Function to check if the RuneScape client is in the lobby state
async function checkLobbyState() {
    // Capture a region of the game screen where the lobby state indicator is located
    const lobbyIndicatorRegion = { x: 100, y: 100, width: 400, height: 400 };
    const imgRef = alt1.capture(lobbyIndicatorRegion);

    // Convert the captured image to raw pixel data
    const imageData = imgRef.toData();

    // Example: Check if a specific pixel color indicates the lobby state
    const lobbyPixelColor = [255, 255, 255]; // Example lobby state pixel color (white)
    const lobbyStateDetected = imageData.data.some(pixel => {
        return pixel[0] === lobbyPixelColor[0] && pixel[1] === lobbyPixelColor[1] && pixel[2] === lobbyPixelColor[2];
    });

    // If lobby state is detected, send a Pushbullet notification
    if (lobbyStateDetected) {
        sendPushbulletNotification("RuneScape Lobby State", "The RuneScape client is in the lobby state.");
    }
}

// Function to send a Pushbullet notification
function sendPushbulletNotification(title, message) {
    const accessToken = "o.K7Lj9wuaTL34oyTCkegEzGXiuTAOBDsW";
    const requestBody = {
        type: "note",
        title: title,
        body: message
    };

    fetch("https://api.pushbullet.com/v2/pushes", {
        method: "POST",
        headers: {
            "Access-Token": accessToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    });
}

// Execute the checkLobbyState function periodically
setInterval(checkLobbyState, 5000); // Check every 5 seconds
