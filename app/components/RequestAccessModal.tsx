'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

interface RequestAccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RequestAccessModal({ isOpen, onClose }: RequestAccessModalProps) {
  const [role, setRole] = useState<'counsel' | 'funder'>('counsel')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    organization: '',
    barNumber: '',
    jurisdiction: '',
    aumRange: '',
    location: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  if (!isOpen) return null

    const isFormValid = () => {
    const baseValid = formData.firstName && formData.lastName && formData.email && formData.organization
    if (role === 'counsel') {
      return baseValid && formData.jurisdiction
    }
    return baseValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const { error } = await supabase
      .from('access_requests')
      .insert([{
        full_name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        role: role,
        title: formData.title,
        organization: formData.organization,
        bar_number: role === 'counsel' ? formData.barNumber : null,
        jurisdiction: role === 'counsel' ? formData.jurisdiction : null,
        aum_range: role === 'funder' ? formData.aumRange : null,
        location: role === 'funder' ? formData.location : null,
        status: 'pending'
      }])

    if (error) {
      setStatus('error')
      setErrorMessage(error.message)
    } else {
      setStatus('success')
    }
  }

  const handleClose = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      title: '',
      organization: '',
      barNumber: '',
      jurisdiction: '',
      aumRange: '',
      location: ''
    })
    setRole('counsel')
    setStatus('idle')
    setErrorMessage('')
    onClose()
  }

  const jurisdictions = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming', 'District of Columbia', 'Other'
  ]

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>×</button>
        
        {status === 'success' ? (
          <div className="modal-success">
            <div className="success-icon">✓</div>
            <h2>Request Received</h2>
            <p> We'll be in touch soon.</p>
            <button onClick={handleClose} className="btn-primary">Done</button>
          </div>
        ) : (
          <>
            <h2>Request Access</h2>
            <p className="modal-subtitle">Request early access to CaseFin.</p>
            
            {/* Role Toggle */}
            <div className="role-toggle">
              <button 
                type="button"
                className={`role-option ${role === 'counsel' ? 'active' : ''}`}
                onClick={() => setRole('counsel')}
              >
                Counsel
              </button>
              <button 
                type="button"
                className={`role-option ${role === 'funder' ? 'active' : ''}`}
                onClick={() => setRole('funder')}
              >
                Funder
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              {/* Name Row */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={e => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={e => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Work Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder={role === 'counsel' ? 'e.g. Partner, Associate' : 'e.g. Managing Director'}
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label htmlFor="organization">
                  {role === 'counsel' ? 'Firm Name' : 'Fund Name'}
                </label>
                <input
                  type="text"
                  id="organization"
                  required
                  value={formData.organization}
                  onChange={e => setFormData({...formData, organization: e.target.value})}
                />
              </div>

              {/* Counsel-specific fields */}
              {role === 'counsel' && (
                <>
                  <div className="form-group">
                    <label htmlFor="jurisdiction">Primary Jurisdiction</label>
                    <select
                      id="jurisdiction"
                      required
                      value={formData.jurisdiction}
                      onChange={e => setFormData({...formData, jurisdiction: e.target.value})}
                    >
                      <option value="">Select jurisdiction</option>
                      {jurisdictions.map(j => (
                        <option key={j} value={j}>{j}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="barNumber">Bar Number <span className="optional">(optional)</span></label>
                    <input
                      type="text"
                      id="barNumber"
                      value={formData.barNumber}
                      onChange={e => setFormData({...formData, barNumber: e.target.value})}
                    />
                  </div>
                </>
              )}

              {/* Funder-specific fields */}
              {role === 'funder' && (
                <>
                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      placeholder="e.g. New York, London"
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="aumRange">Capital Scale</label>
                    <select
                      id="aumRange"
                      value={formData.aumRange}
                      onChange={e => setFormData({...formData, aumRange: e.target.value})}
                    >
                      <option value="">Select range</option>
                      <option value="<50M">Under $50M</option>
                      <option value="50-250M">$50M – $250M</option>
                      <option value="250M-1B">$250M – $1B</option>
                      <option value="1B+">$1B+</option>
                      <option value="undisclosed">Prefer not to say</option>
                    </select>
                  </div>
                </>
              )}

              {status === 'error' && (
                <p className="form-error">{errorMessage}</p>
              )}

              <button 
                type="submit" 
                className={`btn-primary btn-full ${status === 'loading' || !isFormValid() ? 'btn-disabled' : ''}`}
                disabled={status === 'loading' || !isFormValid()}
              >
                {status === 'loading' ? 'Submitting...' : 'Request Access'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}