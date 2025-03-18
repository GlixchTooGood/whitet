const express = require('express');
const app = express();

app.get('/staff', (req, res) => {
    const userRole = req.user.role;

    if (userRole === 'Owner' || userRole === 'Admin' || userRole === 'Mod') {
        res.redirect('/staff');
    } else {
        res.redirect('/stats');
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});