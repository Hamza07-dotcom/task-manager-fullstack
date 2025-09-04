import { useState, useEffect } from 'react'
import axios from 'axios'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/tasks')
      setTasks(res.data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask])
  }

  const handleTaskUpdated = (updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    )
  }

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true
    return task.status === filter
  })

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Task Dashboard</h1>
        <TaskForm onTaskAdded={handleTaskAdded} />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Tasks</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Tasks</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <TaskList
          tasks={filteredTasks}
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
        />
      </div>
    </div>
  )
}
