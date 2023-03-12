import express from 'express' //ESModules
import * as activityServices from '../services/activity.service' 
// import toNewActivityEntry from '../utils/utils_activity'
import toNewPlanEntry from '../utils/plan.utils'
import toNewEventEntry from '../utils/event.utils'
import * as planServices from '../services/plan.service'
import * as eventServices from '../services/event.service'
import planController from '../controllers/plan.controller'
import eventController from '../controllers/event.controller'
import activityController from '../controllers/activity.controller'
import asyncErrorMiddleware from '../middlewares/asyncError.middleware'

// Crea router
const router = express.Router()

// Gets all activities (plan/events)
router.route('/activities')
    .get(activityController.getAll)

router.route('/plan/:id')
    // Get Plan
    .get(asyncErrorMiddleware(planController.getPlan))
    // Delete Plan 
    .delete(asyncErrorMiddleware(planController.deletePlan))


router.route('/event/:id')
    // Get Event
    .get(asyncErrorMiddleware(eventController.getEvent))
    // Delete event
    .delete(asyncErrorMiddleware(eventController.deleteEvent))
    

// Create Plan
router.route('/plan')
    .post(asyncErrorMiddleware(planController.addPlan))

// Create Event
router.route('/event')
    .post(asyncErrorMiddleware(eventController.addEvent))

export default router
