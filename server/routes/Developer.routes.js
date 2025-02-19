const express = require('express')
const router = express.Router()

const DeveloperController = require('../controllers/Developer.controller')
const DeveloperMiddleware = require('../middleware/Developer.middleware')
const TransactionMiddleware = require('../middleware/Transaction.middleware')
const UserMiddleware = require('../middleware/User.middleware')

router.post('/createdevelopertoken/:userId',
    DeveloperMiddleware.CheckAdminTokenValid,
    DeveloperMiddleware.CreateDeveloperTokenCheckTokenIfExist,
    DeveloperMiddleware.CreateDeveloperTokenHashed,
    DeveloperController.CreateDeveloperToken
)

router.get('/metrobank/account/:accountno',
    DeveloperMiddleware.CheckDeveloperTokenValid,
    TransactionMiddleware.CreateTransactionCheckEmptyFields,
    DeveloperController.GetRequestAccountNo
)

router.post('/metrobank/transfertransaction',
    DeveloperMiddleware.CheckDeveloperTokenValid,
    TransactionMiddleware.CheckAccountIfExist,
    TransactionMiddleware.CreateTransactionCheckEmptyFields,
    DeveloperController.TransferTransaction
)

router.get('/tokens/:userId',
    DeveloperMiddleware.CheckDeveloperTokenValid,
    DeveloperController.GetUserTokens
)

router.post('/deletetoken/:developerId',
    DeveloperMiddleware.CheckDeveloperTokenValid,
    DeveloperController.DeleteToken
)

router.get('/metrobank/myaccount/auth/:accountno',
    DeveloperMiddleware.CheckDeveloperTokenValid,
    DeveloperController.GenerateUrl
)

router.get('/metrobank/myaccount/transactions',
    DeveloperMiddleware.CheckDeveloperTokenValid,
    DeveloperMiddleware.CheckUserTokenValid,
    DeveloperController.GetAllUserTransaction
)

router.get('/it/auditlog',
    UserMiddleware.CheckDeveloperTokenValid,
    DeveloperController.GetAllAuditLog
)

router.get('/it/auditlog/:searchId',
    UserMiddleware.CheckDeveloperTokenValid,
    DeveloperController.SearchAuditLog
)

router.get('/it/backup',
    UserMiddleware.CheckDeveloperTokenValid,
    DeveloperController.BackUp
)

router.get('/it/restore',
    UserMiddleware.CheckDeveloperTokenValid,
    DeveloperController.Restore
)

module.exports = router