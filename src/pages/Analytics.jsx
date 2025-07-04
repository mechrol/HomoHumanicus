import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Users, MessageSquare, Eye, ArrowUp, ArrowDown } from 'lucide-react'

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d')
  const [analyticsData, setAnalyticsData] = useState({
    engagement: [],
    growth: [],
    demographics: [],
    topCommunities: []
  })

  useEffect(() => {
    generateAnalyticsData()
  }, [timeRange])

  const generateAnalyticsData = () => {
    // Generate mock analytics data based on time range
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
    
    const engagement = []
    const growth = []
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      
      engagement.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        posts: Math.floor(Math.random() * 50) + 10,
        comments: Math.floor(Math.random() * 200) + 50,
        views: Math.floor(Math.random() * 1000) + 200,
        likes: Math.floor(Math.random() * 300) + 100
      })
      
      growth.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        newMembers: Math.floor(Math.random() * 20) + 5,
        activeUsers: Math.floor(Math.random() * 100) + 50,
        retention: Math.floor(Math.random() * 30) + 70
      })
    }

    const demographics = [
      { name: 'AI Researchers', value: 35, color: '#4f46e5' },
      { name: 'Students', value: 28, color: '#06b6d4' },
      { name: 'Industry Professionals', value: 22, color: '#10b981' },
      { name: 'Hobbyists', value: 15, color: '#f59e0b' }
    ]

    const topCommunities = [
      { name: 'AI Researchers', members: 156, growth: 12.5, posts: 89 },
      { name: 'Machine Learning', members: 134, growth: 8.3, posts: 67 },
      { name: 'Deep Learning', members: 98, growth: 15.2, posts: 45 },
      { name: 'AI Ethics', members: 87, growth: -2.1, posts: 34 },
      { name: 'Computer Vision', members: 76, growth: 6.7, posts: 28 }
    ]

    setAnalyticsData({
      engagement,
      growth,
      demographics,
      topCommunities
    })
  }

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
        <div>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>{title}</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e293b' }}>{value}</p>
        </div>
        <div style={{ 
          padding: '0.75rem', 
          backgroundColor: `${color}15`, 
          borderRadius: '0.5rem',
          color: color
        }}>
          <Icon size={20} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {change > 0 ? (
          <ArrowUp size={16} color="#10b981" />
        ) : (
          <ArrowDown size={16} color="#ef4444" />
        )}
        <span style={{ 
          fontSize: '0.875rem', 
          color: change > 0 ? '#10b981' : '#ef4444',
          fontWeight: '500'
        }}>
          {Math.abs(change)}%
        </span>
        <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
          vs last {timeRange}
        </span>
      </div>
    </div>
  )

  return (
    <Layout>
      <div className="header">
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Analytics</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`btn ${timeRange === range ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-4" style={{ marginBottom: '2rem' }}>
        <StatCard
          title="Total Engagement"
          value="12.4K"
          change={15.3}
          icon={TrendingUp}
          color="#4f46e5"
        />
        <StatCard
          title="Active Members"
          value="2,847"
          change={8.7}
          icon={Users}
          color="#06b6d4"
        />
        <StatCard
          title="Posts Created"
          value="456"
          change={12.1}
          icon={MessageSquare}
          color="#10b981"
        />
        <StatCard
          title="Page Views"
          value="18.2K"
          change={-3.2}
          icon={Eye}
          color="#f59e0b"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-2" style={{ marginBottom: '2rem' }}>
        {/* Engagement Over Time */}
        <div className="card">
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
            Engagement Over Time
          </h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.engagement}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stackId="1"
                  stroke="#4f46e5" 
                  fill="#4f46e5"
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="comments" 
                  stackId="1"
                  stroke="#06b6d4" 
                  fill="#06b6d4"
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="posts" 
                  stackId="1"
                  stroke="#10b981" 
                  fill="#10b981"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: '#4f46e5', borderRadius: '2px' }} />
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Views</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: '#06b6d4', borderRadius: '2px' }} />
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Comments</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '2px' }} />
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Posts</span>
            </div>
          </div>
        </div>

        {/* Member Growth */}
        <div className="card">
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
            Member Growth
          </h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.growth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
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
                  dataKey="newMembers" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="activeUsers" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '2px' }} />
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>New Members</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: '#f59e0b', borderRadius: '2px' }} />
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Active Users</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-2" style={{ marginBottom: '2rem' }}>
        {/* User Demographics */}
        <div className="card">
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
            User Demographics
          </h3>
          <div style={{ height: '300px', display: 'flex', alignItems: 'center' }}>
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.demographics}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analyticsData.demographics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1, paddingLeft: '1rem' }}>
              {analyticsData.demographics.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div style={{ 
                    width: '12px', 
                    height: '12px', 
                    backgroundColor: item.color, 
                    borderRadius: '2px' 
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: '500' }}>{item.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Communities */}
        <div className="card">
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
            Top Communities
          </h3>
          <div style={{ overflowY: 'auto', maxHeight: '300px' }}>
            {analyticsData.topCommunities.map((community, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '1rem 0',
                borderBottom: index < analyticsData.topCommunities.length - 1 ? '1px solid #f1f5f9' : 'none'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                    {community.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {community.members} members • {community.posts} posts
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {community.growth > 0 ? (
                    <ArrowUp size={14} color="#10b981" />
                  ) : (
                    <ArrowDown size={14} color="#ef4444" />
                  )}
                  <span style={{ 
                    fontSize: '0.875rem', 
                    color: community.growth > 0 ? '#10b981' : '#ef4444',
                    fontWeight: '500'
                  }}>
                    {Math.abs(community.growth)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Metrics Table */}
      <div className="card">
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
          Detailed Community Metrics
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
                  Community
                </th>
                <th style={{ 
                  textAlign: 'left', 
                  padding: '0.75rem', 
                  fontSize: '0.875rem', 
                  fontWeight: '500',
                  color: '#64748b'
                }}>
                  Members
                </th>
                <th style={{ 
                  textAlign: 'left', 
                  padding: '0.75rem', 
                  fontSize: '0.875rem', 
                  fontWeight: '500',
                  color: '#64748b'
                }}>
                  Posts
                </th>
                <th style={{ 
                  textAlign: 'left', 
                  padding: '0.75rem', 
                  fontSize: '0.875rem', 
                  fontWeight: '500',
                  color: '#64748b'
                }}>
                  Engagement Rate
                </th>
                <th style={{ 
                  textAlign: 'left', 
                  padding: '0.75rem', 
                  fontSize: '0.875rem', 
                  fontWeight: '500',
                  color: '#64748b'
                }}>
                  Growth
                </th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.topCommunities.map((community, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.75rem', fontSize: '0.875rem', fontWeight: '500' }}>
                    {community.name}
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>
                    {community.members}
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>
                    {community.posts}
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>
                    {((community.posts / community.members) * 100).toFixed(1)}%
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {community.growth > 0 ? (
                        <ArrowUp size={14} color="#10b981" />
                      ) : (
                        <ArrowDown size={14} color="#ef4444" />
                      )}
                      <span style={{ 
                        color: community.growth > 0 ? '#10b981' : '#ef4444',
                        fontWeight: '500'
                      }}>
                        {Math.abs(community.growth)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default Analytics
