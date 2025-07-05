import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

const DebugInfo = ({ user, onRefresh }) => {
  const [debugInfo, setDebugInfo] = useState({
    userInfo: null,
    jobsCount: 0,
    lastError: null,
    jobsData: []
  })

  useEffect(() => {
    const checkDebugInfo = async () => {
      if (!user) return

      try {
        // Get user info
        const { data: { user: userData } } = await supabase.auth.getUser()
        
        // Get jobs count
        const { count, error: jobsError } = await supabase
          .from('jobs')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)

        // Get actual jobs data
        const { data: jobsData, error: fetchError } = await supabase
          .from('jobs')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        setDebugInfo({
          userInfo: userData,
          jobsCount: count || 0,
          lastError: jobsError || fetchError,
          jobsData: jobsData || []
        })

        console.log('Debug Info:', {
          user: userData,
          jobsCount: count,
          error: jobsError || fetchError,
          jobsData: jobsData
        })

      } catch (error) {
        console.error('Debug error:', error)
        setDebugInfo(prev => ({
          ...prev,
          lastError: error.message
        }))
      }
    }

    checkDebugInfo()
  }, [user])

  if (!user) return null

  return (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-yellow-800">Debug Info</h3>
          <button
            onClick={onRefresh}
            className="text-xs bg-yellow-200 hover:bg-yellow-300 px-2 py-1 rounded"
          >
            Refresh Jobs
          </button>
        </div>
      <div className="text-xs text-yellow-700 space-y-1">
        <div><strong>User ID:</strong> {user.id}</div>
        <div><strong>User Email:</strong> {user.email}</div>
        <div><strong>Jobs Count:</strong> {debugInfo.jobsCount}</div>
        {debugInfo.lastError && (
          <div><strong>Error:</strong> {typeof debugInfo.lastError === 'object' ? JSON.stringify(debugInfo.lastError) : debugInfo.lastError}</div>
        )}
        {debugInfo.jobsData.length > 0 && (
          <div><strong>Sample Job:</strong> {debugInfo.jobsData[0].company} - {debugInfo.jobsData[0].role}</div>
        )}
      </div>
    </div>
  )
}

export default DebugInfo 