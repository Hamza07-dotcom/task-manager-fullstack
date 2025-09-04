import { useState } from 'react'
import axios from 'axios'

export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log('Creating task:', { title, description, dueDate });
      const res = await axios.post(
        'http://localhost:5001/api/tasks',
        {
          title,
          description,
          dueDate,
          status: 'todo'
        }
      )
      console.log('Task created:', res.data);
      onTaskAdded(res.data)
      setTitle('')
      setDescription('')
      setDueDate('')
    } catch (error) {
      console.error('Error creating task:', error.response?.data || error.message)
      alert('Failed to create task. Please check console for details.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  )
}
