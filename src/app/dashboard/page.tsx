import React from 'react'

function Dashboard() {
  return (
    <div>
        <h1 className="text-5xl font-bold text-center">Dashboard</h1>
        <p className="text-lg text-center">All Task!</p>
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

export default Dashboard
