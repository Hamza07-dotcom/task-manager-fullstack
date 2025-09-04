const express = require('express');
const router = express.Router();
const Task = require('../models/task.model');
const auth = require('../middleware/auth.middleware');

// All routes require authentication
router.use(auth);

// Create task
router.post('/', async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            owner: req.user._id
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get task by id
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update task
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'status', 'dueDate'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates' });
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        updates.forEach(update => task[update] = req.body[update]);
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
