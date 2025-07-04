import { Briefcase, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const DashboardStats = ({ jobs, suggestions }) => {
  const getStatusCount = (status) => {
    return jobs.filter(job => job.status === status).length
  }

  const getTotalApplications = () => jobs.length

  const getActiveApplications = () => {
    return jobs.filter(job => 
      ['applied', 'interviewing', 'waiting'].includes(job.status)
    ).length
  }

  const getSuccessRate = () => {
    if (jobs.length === 0) return 0
    const successful = getStatusCount('offer')
    return Math.round((successful / jobs.length) * 100)
  }

  const getAverageResponseTime = () => {
    const jobsWithContact = jobs.filter(job => job.lastContactedAt)
    if (jobsWithContact.length === 0) return null

    const totalDays = jobsWithContact.reduce((sum, job) => {
      const applied = job.appliedAt ? new Date(job.appliedAt) : new Date()
      const contacted = new Date(job.lastContactedAt)
      return sum + Math.floor((contacted - applied) / (1000 * 60 * 60 * 24))
    }, 0)

    return Math.round(totalDays / jobsWithContact.length)
  }

  const stats = [
    {
      label: 'Total Applications',
      value: getTotalApplications(),
      icon: Briefcase,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Active Applications',
      value: getActiveApplications(),
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      label: 'Success Rate',
      value: `${getSuccessRate()}%`,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Follow-up Suggestions',
      value: suggestions.length,
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ]

  const statusBreakdown = [
    { status: 'applied', label: 'Applied', count: getStatusCount('applied'), color: 'bg-blue-100 text-blue-800' },
    { status: 'interviewing', label: 'Interviewing', count: getStatusCount('interviewing'), color: 'bg-yellow-100 text-yellow-800' },
    { status: 'waiting', label: 'Waiting', count: getStatusCount('waiting'), color: 'bg-orange-100 text-orange-800' },
    { status: 'rejected', label: 'Rejected', count: getStatusCount('rejected'), color: 'bg-red-100 text-red-800' },
    { status: 'offer', label: 'Offers', count: getStatusCount('offer'), color: 'bg-green-100 text-green-800' },
    { status: 'ghosted', label: 'Ghosted', count: getStatusCount('ghosted'), color: 'bg-gray-100 text-gray-800' }
  ]

  return (
    <div className="mb-8">
      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Status Breakdown */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {statusBreakdown.map((item) => (
            <div key={item.status} className="text-center">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${item.color}`}>
                {item.count}
              </div>
              <p className="text-xs text-gray-600 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      {jobs.length > 0 && (
        <div className="card mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights</h3>
          <div className="space-y-3">
            {getAverageResponseTime() && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} />
                <span>Average response time: {getAverageResponseTime()} days</span>
              </div>
            )}
            
            {suggestions.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-orange-600">
                <AlertCircle size={16} />
                <span>{suggestions.length} job(s) need follow-up attention</span>
              </div>
            )}

            {getStatusCount('rejected') > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <XCircle size={16} />
                <span>{getStatusCount('rejected')} rejection(s) - consider recovery messages</span>
              </div>
            )}

            {getStatusCount('offer') > 0 && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle size={16} />
                <span>Congratulations! {getStatusCount('offer')} offer(s) received</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardStats 