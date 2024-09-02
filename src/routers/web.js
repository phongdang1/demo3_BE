import express from "express";
import postController from "../controllers/postController";

const router = express.Router();

/**
 * @swagger
 * /example:
 *   get:
 *     summary: Returns a list of examples
 *     responses:
 *       200:
 *         description: A list of examples
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get("/example", (req, res) => {
  res.json(["example1", "example2"]);
});
router.get("/get-all-post-admin", postController.getAllPostByAdmin);

module.exports = router;
