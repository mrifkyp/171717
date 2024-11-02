const express = require('express');
const axios = require('axios'); // Fixed typo: "cons" to "const"
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/esohasl', async (req, res) => { // Marked as async to use await
    const { url } = req.query;

    if (!url || !url.startsWith('https://esohasl.net/script/')) { // Fixed logic to check for valid URL
        return res.json({ "error": "You need a valid URL parameter" });
    }

    const esohasl = url.replace('https://esohasl.net/script/', 'https://api.esohasl.net/v1/scripts/raw/');

    try {
        const response = await axios.get(esohasl); // Await the axios call
        res.json({ "result": response.data }); // Return the fetched data
    } catch (error) {
        res.status(500).json({ "error": "Failed to fetch content" }); // Handle errors properly
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Fixed template string syntax
});
