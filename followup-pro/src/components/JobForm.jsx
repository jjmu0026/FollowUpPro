import { useState } from 'react'
import { X } from 'lucide-react'

const JobForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState({
    company: initialData?.company || '',
    role: initialData?.role || '',
    status: initialData?.status || 'applied',
    appliedAt: initialData?.appliedAt ? new Date(initialData.appliedAt).toISOString().split('T')[0] : '',
    lastContactedAt: initialData?.lastContactedAt ? new Date(initialData.lastContactedAt).toISOString().split('T')[0] : '',
    recruiterEmail: initialData?.recruiterEmail || '',
    notes: initialData?.notes || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      id: initialData?.id,
      appliedAt: formData.appliedAt ? new Date(formData.appliedAt) : null,
      lastContactedAt: formData.lastContactedAt ? new Date(formData.lastContactedAt) : null
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {initialData ? 'Edit Job' : 'Add New Job'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company *
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="e.g., Google, Microsoft"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role *
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="e.g., Software Engineer, Product Manager"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input-field"
          >
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="phone screen">Phone Screen</option>
            <option value="final interview">Final Interview</option>
            <option value="waiting">Waiting for Response</option>
            <option value="rejected">Rejected</option>
            <option value="offer">Offer</option>
            <option value="ghosted">Ghosted</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Applied Date
            </label>
            <input
              type="date"
              name="appliedAt"
              value={formData.appliedAt}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Contacted
            </label>
            <input
              type="date"
              name="lastContactedAt"
              value={formData.lastContactedAt}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recruiter Email
          </label>
          <input
            type="email"
            name="recruiterEmail"
            value={formData.recruiterEmail}
            onChange={handleChange}
            className="input-field"
            placeholder="recruiter@company.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="input-field"
            placeholder="Any additional notes about this application..."
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="btn-primary flex-1"
          >
            {initialData ? 'Update Job' : 'Add Job'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default JobForm 