import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { Users, Calendar, MessageSquare, TrendingUp } from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    communities: 0,
    members: 0,
    events: 0,
    posts: 0
  })
  const [salesData, setSalesData] = useState([])
  const [membersData, setMembersData] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [recentSales, setRecentSales] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [user])

  const fetchDashboardData = async () => {
    try {
      // Fetch communities count
      const { count: communitiesCount } = await supabase
        .from('communities')
        .select('*', { count: 'exact', head: true })

      // Fetch total members count
      const { count: membersCount } = await supabase
        .from('community_members')
        .select('*', { count: 'exact', head: true })

      // Fetch posts count
      const { count: postsCount } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })

      setStats({
        communities: communitiesCount || 23,
        members: membersCount || 14,
        events: 0,
        posts: postsCount || 56
      })

      // Mock sales data
      setSalesData([
        { month: 'Jan', sales: 0 },
        { month: 'Feb', sales: 0 },
        { month: 'Mar', sales: 0 },
        { month: 'Apr', sales: 0 },
        { month: 'May', sales: 0 },
        { month: 'Jun', sales: 0 },
        { month: 'Jul', sales: 0 },
        { month: 'Aug', sales: 0 },
        { month: 'Sep', sales: 0 },
        { month: 'Oct', sales: 0 },
        { month: 'Nov', sales: 0 },
        { month: 'Dec', sales: 0 }
      ])

      // Mock members growth data
      setMembersData([
        { month: 'Jan', members: 2 },
        { month: 'Feb', members: 4 },
        { month: 'Mar', members: 6 },
        { month: 'Apr', members: 8 },
        { month: 'May', members: 12 },
        { month: 'Jun', members: 10 },
        { month: 'Jul', members: 8 },
        { month: 'Aug', members: 6 },
        { month: 'Sep', members: 4 },
        { month: 'Oct', members: 2 },
        { month: 'Nov', members: 1 },
        { month: 'Dec', members: 0 }
      ])

      // Fetch recent activity
      const { data: posts } = await supabase
        .from('posts')
        .select(`
          *,
          author:profiles(full_name, avatar_url),
          community:communities(name)
        `)
        .order('created_at', { ascending: false })
        .limit(5)

      const { data: comments } = await supabase
        .from('comments')
        .select(`
          *,
          author:profiles(full_name, avatar_url),
          post:posts(title)
        `)
        .order('created_at', { ascending: false })
        .limit(5)

      // Combine and sort activities
      const activities = [
        ...(posts || []).map(post => ({
          id: post.id,
          type: 'post',
          user: post.author?.full_name || 'Anonymous',
          action: 'added a new post',
          time: formatTimeAgo(post.created_at),
          avatar: post.author?.avatar_url
        })),
        ...(comments || []).map(comment => ({
          id: comment.id,
          type: 'comment',
          user: comment.author?.full_name || 'Anonymous',
          action: 'posted new comment',
          time: formatTimeAgo(comment.created_at),
          avatar: comment.author?.avatar_url
        }))
      ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

      // Add some mock activities if none exist
      if (activities.length === 0) {
        setRecentActivity([
          {
            id: 1,
            user: 'Janusz',
            action: 'posted new comment',
            time: '2 weeks ago',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
          },
          {
            id: 2,
            user: 'Janusz',
            action: 'added a new post',
            time: '2 weeks ago',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
          },
          {
            id: 3,
            user: 'Janusz',
            action: 'posted new comment',
            time: '2 weeks ago',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
          },
          {
            id: 4,
            user: 'Janusz',
            action: 'added a new post',
            time: '2 weeks ago',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
          },
          {
            id: 5,
            user: 'Janusz',
            action: 'posted new comment',
            time: '3 weeks ago',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
          },
          {
            id: 6,
            user: 'Phil',
            action: 'joined Advertising',
            time: '3 weeks ago',
            avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100'
          }
        ])
      } else {
        setRecentActivity(activities.slice(0, 6))
      }

      // Fetch recent sales
      const { data: sales } = await supabase
        .from('sales')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)

      setRecentSales(sales || [])

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)
    
    if (diffInSeconds < 60) return 'just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
    return `${Math.floor(diffInSeconds / 604800)} weeks ago`
  }

  return (
    <Layout>
      <div className="header">
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Dashboard</h1>
      </div>

      {/* Stats Grid */}
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
            <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '500' }}>
              Community 2
            </span>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.communities}</div>
            <div className="stat-label">Courses</div>
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
              <Users size={20} />
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.members}</div>
            <div className="stat-label">Members</div>
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
              <Calendar size={20} />
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.events}</div>
            <div className="stat-label">Events</div>
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
              <MessageSquare size={20} />
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.posts}</div>
            <div className="stat-label">Blog</div>
          </div>
        </div>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-3" style={{ marginBottom: '2rem' }}>
        {/* Sales Chart */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <TrendingUp size={16} color="#4f46e5" />
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>My Sales</h3>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>Monthly Data</p>
          <div style={{ height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Community Members Chart */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Users size={16} color="#4f46e5" />
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>Community Members</h3>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>Monthly Data</p>
          <div style={{ height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={membersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="members" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            Recent Activity
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>
            Community member recent activity
          </p>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div 
                  className="activity-avatar"
                  style={{
                    backgroundImage: activity.avatar ? `url(${activity.avatar})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="activity-content">
                  <div className="activity-text">
                    <strong>{activity.user}</strong> {activity.action}
                  </div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Sales Table */}
      <div className="card">
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
          Recent Sales
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ 
                  textAlign: 'left', 
                  padding: '0.75rem', 
                  fontSize: '0.875rem', 
                  fontWeight: '500',
                  color: '#64748b'
                }}>
                  COURSE / PRODUCT
                </th>
                <th style={{ 
                  textAlign: 'left', 
                  padding: '0.75rem', 
                  fontSize: '0.875rem', 
                  fontWeight: '500',
                  color: '#64748b'
                }}>
                  CUSTOMER NAME
                </th>
                <th style={{ 
                  textAlign: 'left', 
                  padding: '0.75rem', 
                  fontSize: '0.875rem', 
                  fontWeight: '500',
                  color: '#64748b'
                }}>
                  ORDER ID
                </th>
                <th style={{ 
                  textAlign: 'left', 
                  padding: '0.75rem', 
                  fontSize: '0.875rem', 
                  fontWeight: '500',
                  color: '#64748b'
                }}>
                  SALE AMOUNT
                </th>
                <th style={{ 
                  textAlign: 'left', 
                  padding: '0.75rem', 
                  fontSize: '0.875rem', 
                  fontWeight: '500',
                  color: '#64748b'
                }}>
                  CREATED ON
                </th>
              </tr>
            </thead>
            <tbody>
              {recentSales.length === 0 ? (
                <tr>
                  <td 
                    colSpan="5" 
                    style={{ 
                      textAlign: 'center', 
                      padding: '2rem', 
                      color: '#64748b',
                      fontSize: '0.875rem'
                    }}
                  >
                    No recent sale found
                  </td>
                </tr>
              ) : (
                recentSales.map((sale) => (
                  <tr key={sale.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>
                      {sale.course_name}
                    </td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>
                      {sale.customer_name}
                    </td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>
                      #{sale.id.slice(0, 8)}
                    </td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>
                      ${sale.amount}
                    </td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>
                      {new Date(sale.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: '3rem',
        paddingTop: '2rem',
        borderTop: '1px solid #e2e8f0',
        fontSize: '0.875rem',
        color: '#64748b'
      }}>
        <span>2023 © AI Tribes</span>
        <a href="#" style={{ color: '#4f46e5', textDecoration: 'none' }}>Support</a>
      </div>
    </Layout>
  )
}

export default Dashboard
