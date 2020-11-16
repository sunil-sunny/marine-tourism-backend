const express = require('express')
const router = express.Router()




router.post('/register',async (req, res) => {

    res.send("App Started")
});

module.exports = router;