const express = require('express');
const router = express.Router();
const user= require ('../controllers/user')
const jwt = require("jsonwebtoken");
const passport = require('passport');


/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       required:
 *         - name
 *         - password 
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           description: The user's mail
 *         name:
 *           type: string
 *           description: The name of the user
 *         last_name:
 *           type: string
 *           description: The last name of the user
 *         password:
 *           type: string
 *           description: Better be as strong as you
 *         Birth_date:
 *           type: string
 *           format: date
 *           description: The date the user was born
 *       example:
 *         id: d5fE_asz
 *         email: alimail@gmail.com
 *         name: Ali
 *         last name: Ben salah
 *         password: VeryStrongPassword123
 *         creation_date: 2020-03-10T04:05:06.157Z
 *         birth_date: 2000-05-11T09:25:16.367Z
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /api/user/getall:
 *   get:
 *     summary: Lists all the users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 * /api/user/add:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       500:
 *         description: Some server error
 * /api/user/getone/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       404:
 *         description: The user was not found
 * /api/user/update/{id}:
 *   put:
 *    summary: Update the user by the id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/user'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 * /api/user/delete/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */


router.post('/add', user.create);
router.get('/getALL', user.UserList);
router.get('/login', user.login);
router.get('/getone/:id', user.UserById);
router.delete('/delete/:id', user.deleteUserById);
router.get('/protected',passport.authenticate('jwt',{session :false}))
router.put('/update/:id',user.Update);
module.exports = router;
