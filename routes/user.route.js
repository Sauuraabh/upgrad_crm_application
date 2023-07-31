const userController = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/index');

module.exports = function (app) {
    app.get('/crm/api/v1/users',authMiddleware.verifyToken ,userController.findAll);
}