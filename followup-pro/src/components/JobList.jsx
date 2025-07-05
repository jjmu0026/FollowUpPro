import { useState } from 'react'
import { Edit, Trash2, Mail, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import JobForm from './JobForm'

const JobList = ({ jobs, onUpdate, onDelete, onSelect, onAddJob }) => {
  const [editingJob, setEditingJob] = useState(null)

  const getStatusIcon = (status) => {
    switch (status) {
      case 'applied':
        return <Clock className="text-blue-500" size={16} />
      case 'interviewing':
        return <AlertCircle className="text-yellow-500" size={16} />
      case 'waiting':
        return <Clock className="text-orange-500" size={16} />
      case 'rejected':
        return <XCircle className="text-red-500" size={16} />
      case 'offer':
        return <CheckCircle className="text-green-500" size={16} />
      case 'ghosted':
        return <XCircle className="text-gray-500" size={16} />
      default:
        return <Clock className="text-gray-500" size={16} />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-800'
      case 'interviewing':
        return 'bg-yellow-100 text-yellow-800'
      case 'waiting':
        return 'bg-orange-100 text-orange-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'offer':
        return 'bg-green-100 text-green-800'
      case 'ghosted':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDaysSinceContact = (lastContactedAt) => {
    if (!lastContactedAt) return null
    const days = Math.floor((new Date() - new Date(lastContactedAt)) / (1000 * 60 * 60 * 24))
    return days
  }

  const handleUpdate = (updatedJob) => {
    onUpdate(updatedJob)
    setEditingJob(null)
  }

  if (jobs.length === 0) {
    return (
      <div className="card">
        <div className="text-center py-12">
          <Mail className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs yet</h3>
          <p className="text-gray-600 mb-6">Add your first job application to get started</p>
          <button
            onClick={onAddJob}
            className="btn-primary"
          >
            Add Your First Job
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Your Job Applications</h2>
        <button
          onClick={onAddJob}
          className="btn-primary"
        >
          Add Job
        </button>
      </div>
      
      {jobs.map(job => (
        <div key={job.id} className="card">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {getStatusIcon(job.status)}
                <h3 className="font-semibold text-gray-900">{job.company}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                  {job.status}
                </span>
              </div>
              
              <p className="text-gray-600 mb-2">{job.role}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {job.appliedAt && (
                  <span>Applied: {new Date(job.appliedAt).toLocaleDateString()}</span>
                )}
                {job.lastContactedAt && (
                  <span>Last contact: {new Date(job.lastContactedAt).toLocaleDateString()}</span>
                )}
                {job.recruiterEmail && (
                  <span className="text-blue-600">{job.recruiterEmail}</span>
                )}
              </div>

              {job.notes && (
                <p className="text-sm text-gray-600 mt-2 italic">"{job.notes}"</p>
              )}

              {job.lastContactedAt && (
                <div className="mt-2">
                  {(() => {
                    const days = getDaysSinceContact(job.lastContactedAt)
                    if (days >= 5 && job.status !== 'rejected') {
                      return (
                        <div className="flex items-center gap-2 text-orange-600 text-sm">
                          <AlertCircle size={14} />
                          <span>Follow up suggested ({days} days since last contact)</span>
                        </div>
                      )
                    } else if (days < 5) {
                      return (
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Clock size={14} />
                          <span>Wait {5 - days} more days before following up</span>
                        </div>
                      )
                    }
                    return null
                  })()}
                </div>
              )}
            </div>

            <div className="flex gap-2 ml-4">
              <button
                onClick={() => onSelect(job)}
                className="btn-primary text-sm"
                disabled={job.status === 'rejected'}
              >
                Generate Follow-up
              </button>
              <button
                onClick={() => setEditingJob(job)}
                className="btn-secondary text-sm"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => onDelete(job.id)}
                className="text-red-600 hover:text-red-800 p-1"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      {editingJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <JobForm 
              initialData={editingJob}
              onSubmit={handleUpdate}
              onCancel={() => setEditingJob(null)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default JobList 