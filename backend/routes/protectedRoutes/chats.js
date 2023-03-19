const requireAuth = require('../middleware/requireAuth')


const router = express.Router()

router.use(requireAuth)