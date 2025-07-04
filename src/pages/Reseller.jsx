import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { 
  Plus, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'

const Reseller = () => {
  const { user } = useAuth()
  const [resellers, setResellers] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [newReseller, setNewReseller] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    commission_rate: 10,
    status: 'active'
  })

  useEffect(() => {
    fetchResellers()
  }, [])

  const fetchResellers = async () => {
    try {
      const { data, error } = await supabase
        .from('resellers')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Mock data if no resellers exist
      if (!data || data.length === 0) {
        const mockResellers = [
          {
            id: '1',
            name: 'John Smith',
            email: 'john.smith@example.com',
            phone: '+1 (555) 123-4567',
            company: 'TechSolutions Inc.',
            commission_rate: 15,
            status: 'active',
            total_sales: 25000,
            total_commissions: 3750,
            customers_count: 12,
            created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            last_sale: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '2',
            name: 'Sarah Johnson',
            email: 'sarah.johnson@example.com',
            phone: '+1 (555) 987-6543',
            company: 'Digital Marketing Pro',
            commission_rate: 12,
            status: 'active',
            total_sales: 18500,
            total_commissions: 2220,
            customers_count: 8,
            created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
            last_sale: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '3',
            name: 'Mike Chen',
            email: 'mike.chen@example.com',
            phone: '+1 (555) 456-7890',
            company: 'AI Consulting Group',
            commission_rate: 20,
            status: 'pending',
            total_sales: 0,
            total_commissions: 0,
            customers_count: 0,
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            last_sale: null
          },
          {
            id: '4',
            name: 'Lisa Rodriguez',
            email: 'lisa.rodriguez@example.com',
            phone: '+1 (555) 321-0987',
            company: 'Growth Hackers LLC',
            commission_rate: 10,
            status: 'inactive',
            total_sales: 12000,
            total_commissions: 1200,
            customers_count: 5,
            created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
            last_sale: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
          }
        ]
        setResellers(mockResellers)
      } else {
        setResellers(data)
      }
    } catch (error) {
      console.error('Error fetching resellers:', error)
    }
  }

  const createReseller = async (e) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase
        .from('resellers')
        .insert([newReseller])
        .select()

      if (error) throw error

      setNewReseller({
        name: '',
        email: '',
        phone: '',
        company: '',
        commission_rate: 10,
        status: 'active'
      })
      setShowCreateForm(false)
      fetchResellers()
    } catch (error) {
      console.error('Error creating reseller:', error)
    }
  }

  const filteredResellers = resellers.filter(reseller => {
    const matchesSearch = reseller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reseller.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reseller.company.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || reseller.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle size={16} color="#10b981" />
      case 'pending':
        return <Clock size={16} color="#f59e0b" />
      case 'inactive':
        return <XCircle size={16} color="#ef4444" />
      default:
        return <Clock size={16} color="#64748b" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return { bg: '#dcfce7', text: '#166534' }
      case 'pending':
        return { bg: '#fef3c7', text: '#92400e' }
      case 'inactive':
        return { bg: '#fee2e2', text: '#991b1b' }
      default:
        return { bg: '#f1f5f9', text: '#475569' }
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Calculate summary stats
  const totalResellers = resellers.length
  const activeResellers = resellers.filter(r => r.status === 'active').length
  const totalSales = resellers.reduce((sum, r) => sum + (r.total_sales || 0), 0)
  const totalCommissions = resellers.reduce((sum, r) => sum + (r.total_commissions || 0), 0)

  return (
    <Layout>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Reseller Management
            </h1>
            <p style={{ color: '#64748b' }}>
              Manage your reseller network and track their performance
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn btn-primary"
          >
            <Plus size={18} />
            Add Reseller
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-4" style={{ marginBottom: '2rem' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ 
                padding: '0.75rem', 
                backgroundColor: '#eff6ff', 
                borderRadius: '0.5rem',
                color: '#2563eb'
              }}>
                <Users size={20} />
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{totalResellers}</div>
              <div className="stat-label">Total Resellers</div>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ 
                padding: '0.75rem', 
                backgroundColor: '#f0fdf4', 
                borderRadius: '0.5rem',
                color: '#16a34a'
              }}>
                <CheckCircle size={20} />
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{activeResellers}</div>
              <div className="stat-label">Active Resellers</div>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ 
                padding: '0.75rem', 
                backgroundColor: '#fef3c7', 
                borderRadius: '0.5rem',
                color: '#d97706'
              }}>
                <DollarSign size={20} />
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{formatCurrency(totalSales)}</div>
              <div className="stat-label">Total Sales</div>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ 
                padding: '0.75rem', 
                backgroundColor: '#fce7f3', 
                borderRadius: '0.5rem',
                color: '#be185d'
              }}>
                <TrendingUp size={20} />
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{formatCurrency(totalCommissions)}</div>
              <div className="stat-label">Total Commissions</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card" style={{ marginBottom: '2rem', padding: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '300px' }}>
              <Search size={16} color="#64748b" />
              <input
                type="text"
                placeholder="Search resellers..."
                className="input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ border: 'none', padding: '0.5rem 0', flex: 1 }}
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={16} color="#64748b" />
              <select
                className="input"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ minWidth: '120px' }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Resellers Table */}
        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ 
                    textAlign: 'left', 
                    padding: '1rem', 
                    fontSize: '0.875rem', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Reseller
                  </th>
                  <th style={{ 
                    textAlign: 'left', 
                    padding: '1rem', 
                    fontSize: '0.875rem', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Contact
                  </th>
                  <th style={{ 
                    textAlign: 'left', 
                    padding: '1rem', 
                    fontSize: '0.875rem', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Performance
                  </th>
                  <th style={{ 
                    textAlign: 'left', 
                    padding: '1rem', 
                    fontSize: '0.875rem', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Commission
                  </th>
                  <th style={{ 
                    textAlign: 'left', 
                    padding: '1rem', 
                    fontSize: '0.875rem', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Status
                  </th>
                  <th style={{ 
                    textAlign: 'left', 
                    padding: '1rem', 
                    fontSize: '0.875rem', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredResellers.map((reseller) => {
                  const statusColors = getStatusColor(reseller.status)
                  return (
                    <tr key={reseller.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1rem' }}>
                        <div>
                          <div style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                            {reseller.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                            {reseller.company}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Mail size={12} color="#64748b" />
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                              {reseller.email}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Phone size={12} color="#64748b" />
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                              {reseller.phone}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                            {formatCurrency(reseller.total_sales)}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                            {reseller.customers_count} customers
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                            Last sale: {formatDate(reseller.last_sale)}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                            {reseller.commission_rate}%
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                            Earned: {formatCurrency(reseller.total_commissions)}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '1rem',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          backgroundColor: statusColors.bg,
                          color: statusColors.text
                        }}>
                          {getStatusIcon(reseller.status)}
                          {reseller.status.charAt(0).toUpperCase() + reseller.status.slice(1)}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            className="btn btn-secondary"
                            style={{ padding: '0.5rem', minWidth: 'auto' }}
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            className="btn btn-secondary"
                            style={{ padding: '0.5rem', minWidth: 'auto' }}
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            className="btn btn-secondary"
                            style={{ padding: '0.5rem', minWidth: 'auto' }}
                          >
                            <MoreVertical size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Reseller Modal */}
      {showCreateForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{ width: '600px', maxWidth: '90vw', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
              Add New Reseller
            </h3>
            <form onSubmit={createReseller}>
              <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="input"
                    value={newReseller.name}
                    onChange={(e) => setNewReseller({ ...newReseller, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="input"
                    value={newReseller.email}
                    onChange={(e) => setNewReseller({ ...newReseller, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    className="input"
                    value={newReseller.phone}
                    onChange={(e) => setNewReseller({ ...newReseller, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    className="input"
                    value={newReseller.company}
                    onChange={(e) => setNewReseller({ ...newReseller, company: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group">
                  <label>Commission Rate (%)</label>
                  <input
                    type="number"
                    className="input"
                    min="0"
                    max="100"
                    step="0.1"
                    value={newReseller.commission_rate}
                    onChange={(e) => setNewReseller({ ...newReseller, commission_rate: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    className="input"
                    value={newReseller.status}
                    onChange={(e) => setNewReseller({ ...newReseller, status: e.target.value })}
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Reseller
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Reseller
