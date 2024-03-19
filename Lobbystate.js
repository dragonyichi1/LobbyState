// Import Alt1 API
const alt1 = window.alt1;

// Pushbullet API credentials
const pushbulletAccessToken = 'o.egFzHq7wcNRFRBDdU4r03RrG6HPaKmWc';

// Function to send notification via Pushbullet
async function sendNotification(title, body) {
    try {
        const response = await fetch('https://api.pushbullet.com/v2/pushes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Token': pushbulletAccessToken
            },
            body: JSON.stringify({
                type: 'note',
                title: title,
                body: body
            })
        });
        if (!response.ok) {
            throw new Error('Failed to send notification');
        }
    } catch (error) {
        console.error('Error sending notification:', error);
    }
}

// Function to check lobby state and send notification if in lobby
function checkLobbyState() {
    if (!alt1) {
        console.error('Alt1 API not detected.');
        return;
    }

    const gamestate = alt1.getVarp(281);

    // Lobby state check (Varp 281 value)
    if (gamestate === 7) {
        sendNotification('RuneScape Lobby', 'You are currently in the lobby.');
    }
}

// Interval to periodically check lobby state
setInterval(checkLobbyState, 5000); // Check every 5 seconds
