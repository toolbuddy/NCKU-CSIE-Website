import express from 'express';

import home from 'routes/home.js';
import student from 'routes/student.js';
import about from 'routes/about.js';
import research from 'routes/research.js';
import announcement from 'routes/announcement.js';
import resource from 'routes/resource.js';
import user from 'routes/user.js';

const router = express.Router();

router.use( '/', home );

// Resolve URL /about
router.use( '/about', about );

// Resolve URL /announcement
router.use( '/announcement', announcement );

// Resolve URL /research
router.use( '/research', research );

// Resolve URL /resource
router.use( '/resource', resource );

// Resolve URL /student
router.use( '/student', student );

// Resolve URL /user
router.use( '/user', user );

export default router;
