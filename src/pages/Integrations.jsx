import React, { useState } from 'react'
import Layout from '../components/Layout'
import { 
  Slack, 
  Github, 
  Mail, 
  MessageSquare, 
  Calendar, 
  Database,
  Webhook,
  Settings,
  Check,
  Plus,
  ExternalLink
} from 'lucide-react'

const Integrations = () => {
  const [connectedIntegrations, setConnectedIntegrations] = useState([
    'slack',
    'github'
  ])

  const integrations = [
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get notifications and manage communities directly from Slack',
      icon: Slack,
      color: '#4A154B',
      category: 'Communication',
      features: ['Real-time notifications', 'Community management', 'Member interactions']
    },
    {
      id: 'discord',
      name: 'Discord',
      description: 'Connect your Discord server with AI Tribes communities',
      icon: MessageSquare,
      color: '#5865F2',
      category: 'Communication',
      features: ['Voice channels', 'Bot integration', 'Role management']
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Share and collaborate on AI projects with your community',
      icon: Github,
      color: '#181717',
      category: 'Development',
      features: ['Repository sharing', 'Issue tracking', 'Code collaboration']
    },
    {
      id: 'email',
      name: 'Email Notifications',
      description: 'Stay updated with email notifications for community activities',
      icon: Mail,
      color: '#EA4335',
      category: 'Communication',
      features: ['Daily digests', 'Instant notifications', 'Custom templates']
    },
    {
      id: 'calendar',
      name: 'Google Calendar',
      description: 'Sync community events with your Google Calendar',
      icon: Calendar,
      color: '#4285F4',
      category: 'Productivity',
      features: ['Event sync', 'Meeting reminders', 'Availability sharing']
    },
    {
      id: 'database',
      name: 'External Database',
      description: 'Connect external databases for advanced analytics',
      icon: Database,
      color: '#FF6B35',
      category: 'Analytics',
      features: ['Data export', 'Custom queries', 'Real-time sync']
    },
    {
      id: 'webhook',
      name: 'Webhooks',
      description: 'Create custom integrations with webhook endpoints',
      icon: Webhook,
      color: '#6366F1',
      category: 'Development',
      features: ['Custom endpoints', 'Event triggers', 'API access']
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Automate workflows with 5000+ apps through Zapier',
      icon: Settings,
      color: '#FF4A00',
      category: 'Automation',
      features: ['Workflow automation', '5000+ app connections', 'Custom triggers']
    }
  ]

  const categories = ['All', 'Communication', 'Development', 'Productivity', 'Analytics', 'Automation']
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredIntegrations = selectedCategory === 'All' 
    ? integrations 
    : integrations.filter(integration => integration.category === selectedCategory)

  const toggleIntegration = (integrationId) => {
    if (connectedIntegrations.includes(integrationId)) {
      setConnectedIntegrations(connectedIntegrations.filter(id => id !== integrationId))
    } else {
      setConnectedIntegrations([...connectedIntegrations, integrationId])
    }
  }

  const IntegrationCard = ({ integration }) => {
    const isConnected = connectedIntegrations.includes(integration.id)
    const IconComponent = integration.icon

    return (
      <div className="card" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{
            padding: '0.75rem',
            backgroundColor: `${integration.color}15`,
            borderRadius: '0.5rem',
            color: integration.color
          }}>
            <IconComponent size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                {integration.name}
              </h3>
              <span style={{
                fontSize: '0.75rem',
                padding: '0.25rem 0.5rem',
                backgroundColor: '#f1f5f9',
                color: '#64748b',
                borderRadius: '0.25rem'
              }}>
                {integration.category}
              </span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1rem' }}>
              {integration.description}
            </p>
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Features:
              </h4>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.25rem' 
              }}>
                {integration.features.map((feature, index) => (
                  <li key={index} style={{ 
                    fontSize: '0.75rem', 
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <div style={{ 
                      width: '4px', 
                      height: '4px', 
                      backgroundColor: integration.color, 
                      borderRadius: '50%' 
                    }} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => toggleIntegration(integration.id)}
            className={`btn ${isConnected ? 'btn-secondary' : 'btn-primary'}`}
            style={{ flex: 1 }}
          >
            {isConnected ? (
              <>
                <Check size={16} />
                Connected
              </>
            ) : (
              <>
                <Plus size={16} />
                Connect
              </>
            )}
          </button>
          <button className="btn btn-secondary">
            <ExternalLink size={16} />
          </button>
        </div>

        {isConnected && (
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '12px',
            height: '12px',
            backgroundColor: '#10b981',
            borderRadius: '50%',
            border: '2px solid white'
          }} />
        )}
      </div>
    )
  }

  return (
    <Layout>
      <div className="header">
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Integrations
          </h1>
          <p style={{ color: '#64748b' }}>
            Connect AI Tribes with your favorite tools and services
          </p>
        </div>
      </div>

      {/* Connected Integrations Summary */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>
            Connected Integrations
          </h3>
          <span style={{ 
            fontSize: '0.875rem', 
            color: '#64748b',
            padding: '0.25rem 0.75rem',
            backgroundColor: '#f1f5f9',
            borderRadius: '1rem'
          }}>
            {connectedIntegrations.length} active
          </span>
        </div>
        
        {connectedIntegrations.length > 0 ? (
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {connectedIntegrations.map(integrationId => {
              const integration = integrations.find(i => i.id === integrationId)
              const IconComponent = integration.icon
              return (
                <div key={integrationId} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '0.5rem',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{
                    padding: '0.25rem',
                    backgroundColor: `${integration.color}15`,
                    borderRadius: '0.25rem',
                    color: integration.color
                  }}>
                    <IconComponent size={16} />
                  </div>
                  <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                    {integration.name}
                  </span>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#10b981',
                    borderRadius: '50%'
                  }} />
                </div>
              )
            })}
          </div>
        ) : (
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
            No integrations connected yet. Browse available integrations below.
          </p>
        )}
      </div>

      {/* Category Filter */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-2" style={{ marginBottom: '2rem' }}>
        {filteredIntegrations.map(integration => (
          <IntegrationCard key={integration.id} integration={integration} />
        ))}
      </div>

      {/* Custom Integration CTA */}
      <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <Settings size={48} color="#64748b" style={{ margin: '0 auto' }} />
        </div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
          Need a Custom Integration?
        </h3>
        <p style={{ color: '#64748b', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
          Can't find the integration you need? Our team can help you build custom integrations 
          tailored to your specific requirements.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-primary">
            Request Custom Integration
          </button>
          <button className="btn btn-secondary">
            View API Documentation
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Integrations
