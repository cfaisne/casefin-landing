'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

interface AccessRequest {
  id: string
  full_name: string
  email: string
  role: string
  title: string
  organization: string
  jurisdiction: string
  bar_number: string
  aum_range: string
  location: string
  status: string
  created_at: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [requests, setRequests] = useState<AccessRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')

  useEffect(() => {
    checkAuthAndFetch()
  }, [])

  const checkAuthAndFetch = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      router.push('/admin/login')
      return
    }

    fetchRequests()
  }

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from('access_requests')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching requests:', error)
    } else {
      setRequests(data || [])
    }
    setLoading(false)
  }

const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
  const request = requests.find(r => r.id === id)
  if (!request) return

  const { error } = await supabase
    .from('access_requests')
    .update({ status })
    .eq('id', id)

  if (error) {
    console.error('Error updating status:', error)
    return
  }

  // Send email
  try {
    await fetch('/api/send-approval', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: request.email,
        name: request.full_name,
        status
      })
    })
  } catch (err) {
    console.error('Error sending email:', err)
  }

  fetchRequests()
}

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const filteredRequests = requests.filter(r => {
    if (filter === 'all') return true
    return r.status === filter
  })

  if (loading) {
    return <div className="admin-loading">Loading...</div>
  }

  return (
    <div className="admin-wrapper">
      <header className="admin-header">
        <h1>Access Requests</h1>
        <button onClick={handleLogout} className="btn-text">Logout</button>
      </header>

      <div className="admin-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({requests.length})
        </button>
        <button 
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending ({requests.filter(r => r.status === 'pending').length})
        </button>
        <button 
          className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}
          onClick={() => setFilter('approved')}
        >
          Approved ({requests.filter(r => r.status === 'approved').length})
        </button>
        <button 
          className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
          onClick={() => setFilter('rejected')}
        >
          Rejected ({requests.filter(r => r.status === 'rejected').length})
        </button>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Organization</th>
              <th>Details</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(request => (
              <tr key={request.id}>
                <td>{new Date(request.created_at).toLocaleDateString()}</td>
                <td>{request.full_name}</td>
                <td>{request.email}</td>
                <td className="capitalize">{request.role}</td>
                <td>{request.organization}</td>
                <td>
                  {request.role === 'counsel' ? (
                    <span>{request.jurisdiction}{request.bar_number && ` • Bar #${request.bar_number}`}</span>
                  ) : (
                    <span>{request.location}{request.aum_range && ` • ${request.aum_range}`}</span>
                  )}
                </td>
                <td>
                  <span className={`status-badge status-${request.status}`}>
                    {request.status}
                  </span>
                </td>
                <td>
                  {request.status === 'pending' && (
                    <div className="action-buttons">
                      <button 
                        className="btn-approve"
                        onClick={() => updateStatus(request.id, 'approved')}
                      >
                        Approve
                      </button>
                      <button 
                        className="btn-reject"
                        onClick={() => updateStatus(request.id, 'rejected')}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredRequests.length === 0 && (
          <p className="no-requests">No requests found.</p>
        )}
      </div>
    </div>
  )
}