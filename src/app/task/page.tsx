import React from 'react'

function page() {
  return (
    <div>
        <h1 className="text-5xl font-bold text-center">Task Page</h1>
        <br /> <br />
        <form action="" className='max-w-md mx-auto border border-gray-300 rounded-md shadow-sm p-4'>
          <label htmlFor="taskName" className="block text-sm font-medium text-gray-700">Task Name</label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />

          <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700">Task Description</label>
          <textarea
            id="taskDescription"
            name="taskDescription"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />

          <button type="submit" className="mt-4 w-full bg-black text-white py-2 rounded-md">Add Task</button>
        </form>

        <div className='overflow-x-auto max-w-4xl mx-auto'>
          <table className='min-w-full border border-gray-300 rounded-md shadow-sm mt-8'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='px-4 py-2'>ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through your task data here */}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default page
