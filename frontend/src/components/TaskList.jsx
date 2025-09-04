import { useState } from 'react'
import axios from 'axios'

export default function TaskList({ tasks, onTaskUpdated, onTaskDeleted }) {
  const [editingTask, setEditingTask] = useState(null)

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const res = await axios.patch(
        `http://localhost:5001/api/tasks/${taskId}`,
        {
          status: newStatus,
        }
      )
      onTaskUpdated(res.data)
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5001/api/tasks/${taskId}`)
      onTaskDeleted(taskId)
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
        >
          <div>
            <h3 className="text-lg font-medium">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            {task.dueDate && (
              <p className="text-sm text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(task._id, e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button
              onClick={() => handleDelete(task._id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
