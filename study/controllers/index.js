const { Router } = require('express');
const router = Router()

//admin으로 들어오면 admin 폴더를 참고해라
router.use('/admin', require('./admin'));

module.exports = router;






