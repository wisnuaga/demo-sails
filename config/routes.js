/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

  // costumer
  'POST /api/costumer': { action: 'costumer/create' },
  'PATCH /api/costumer/:id': { action: 'costumer/update' },
  'DELETE /api/costumer/:id': { action: 'costumer/delete' },
  'GET /api/costumer/:id': { action: 'costumer/find-by-id' },
  'GET /api/costumer': { action: 'costumer/find-all' },


  // gender
  'POST /api/gender': { action: 'gender/create' },
  'PATCH /api/gender/:id': { action: 'gender/update' },
  'DELETE /api/gender/:id': { action: 'gender/delete' },
  'GET /api/gender/:id': { action: 'gender/find-by-id' },
  'GET /api/gender': { action: 'gender/find-all' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
