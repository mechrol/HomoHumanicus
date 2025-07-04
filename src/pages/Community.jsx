import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Layout from '../components/Layout'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { Plus, Search, Settings, ChevronDown, Edit, ExternalLink, Palette, Copy, Bot, Zap, CheckCircle } from 'lucide-react'

const Community = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [communities, setCommunities] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    fetchCommunities()
    
    // Check if we have a new community from the create page
    if (location.state?.newCommunity) {
      setSuccessMessage(location.state.message)
      setShowSuccessMessage(true)
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 5000)
      
      // Clear the location state
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  const fetchCommunities = async () => {
    try {
      // First try to get communities from localStorage (newly created ones)
      const localCommunities = JSON.parse(localStorage.getItem('communities') || '[]')
      
      const { data, error } = await supabase
        .from('communities')
        .select(`
          *,
          creator:profiles(full_name),
          member_count
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      // Combine local communities with database communities
      let allCommunities = [...localCommunities]

      // Add comprehensive mock communities matching the image
      if ((!data || data.length === 0) && localCommunities.length === 0) {
        const mockCommunities = [
          {
            id: '1',
            name: 'PATRON',
            description: 'Subscription Services',
            image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
            created_at: '28 Feb, 2025',
            status: true,
            category: 'Business'
          },
          {
            id: '2',
            name: 'Homohumanicus',
            description: 'Health and Wellness',
            image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400',
            created_at: '13 Feb, 2025',
            status: true,
            category: 'Health'
          },
          {
            id: '3',
            name: 'Ziołolecznictwo',
            description: 'Health and Wellness',
            image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400',
            created_at: '5 Feb, 2025',
            status: true,
            category: 'Health'
          },
          {
            id: '4',
            name: 'Przedsiębiorcy RP',
            description: 'A Entrepreneurship community is a dynamic group of individuals focused on starting and growing businesses.',
            image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
            created_at: '4 Feb, 2025',
            status: true,
            category: 'Business'
          },
          {
            id: '5',
            name: 'Narodowa Agencja Informacyjna',
            description: 'Społeczność w NAI to grupa społeczna, które prezentują projekty podlegające ocenie pod kątem ich transformacyj...',
            image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
            created_at: '28 Nov, 2024',
            status: true,
            category: 'News'
          },
          {
            id: '6',
            name: 'Wolność i Przedsiębiorczość',
            description: 'Społeczność w Agencji "Bank Zaufania" to grupa społeczna, które prezentują projekty podlegające ocenie pod kąt...',
            image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
            created_at: '27 Nov, 2024',
            status: true,
            category: 'Business'
          },
          {
            id: '7',
            name: 'Agencja Społecznych Konsultantów',
            description: 'Agencja Społecznych Konsultantów zrzesza wspierających członków, których misją jest projektowanie biegu różnych...',
            image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
            created_at: '25 Oct, 2024',
            status: true,
            category: 'Consulting'
          },
          {
            id: '8',
            name: 'TOKmate',
            description: 'Tokmate Agency Service offers a complete solution for businesses and creators to dominate TikTok with ease. As t...',
            image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400',
            created_at: '21 Oct, 2024',
            status: true,
            category: 'Marketing'
          },
          {
            id: '9',
            name: 'Ekspert Wellness.',
            description: '"Ekspert Wellness jako nowy zawód dostępny dla wszystkich" Celem społeczności jest stworzenie wszystkich materiał...',
            image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400',
            created_at: '18 Sep, 2024',
            status: true,
            category: 'Wellness'
          }
        ]
        allCommunities = [...allCommunities, ...mockCommunities]
      } else if (data && data.length > 0) {
        allCommunities = [...allCommunities, ...data]
      }

      setCommunities(allCommunities)
    } catch (error) {
      console.error('Error fetching communities:', error)
    }
  }

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleActionClick = (action, communityId) => {
    console.log(`${action} clicked for community ${communityId}`)
    setActiveDropdown(null)
    
    switch(action) {
      case 'edit':
        navigate(`/community/edit/${communityId}`)
        break
      case 'visit':
        window.open(`https://community-${communityId}.aitribes.app`, '_blank')
        break
      case 'customize':
        navigate(`/community/customize/${communityId}`)
        break
      case 'clone':
        navigate(`/community/clone/${communityId}`)
        break
      case 'ai-member-feed':
        navigate(`/community/ai-member-feed/${communityId}`)
        break
      case 'ai-custom-prompt':
        navigate(`/community/ai-custom-prompt/${communityId}`)
        break
      default:
        break
    }
  }

  const toggleStatus = (communityId) => {
    setCommunities(prev => {
      const updated = prev.map(community => 
        community.id === communityId 
          ? { ...community, status: !community.status }
          : community
      )
      
      // Update localStorage for newly created communities
      const localCommunities = updated.filter(c => 
        !['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(c.id)
      )
      localStorage.setItem('communities', JSON.stringify(localCommunities))
      
      return updated
    })
  }

  const dropdownItems = [
    { key: 'edit', label: 'Edit', icon: Edit },
    { key: 'visit', label: 'Visit', icon: ExternalLink },
    { key: 'customize', label: 'Customize Community', icon: Palette },
    { key: 'clone', label: 'Clone', icon: Copy },
    { key: 'ai-member-feed', label: 'AI Member Feed', icon: Bot },
    { key: 'ai-custom-prompt', label: 'AI Custom Prompt Feed', icon: Zap }
  ]

  return (
    <Layout>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Success Message */}
        {showSuccessMessage && (
          <div style={{
            position: 'fixed',
            top: '90px',
            right: '2rem',
            backgroundColor: '#10b981',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            animation: 'slideIn 0.3s ease-out'
          }}>
            <CheckCircle size={20} />
            {successMessage}
          </div>
        )}

        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Settings size={24} color="#4f46e5" />
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
              Community
            </h1>
            <span style={{
              backgroundColor: '#4f46e5',
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: '600'
            }}>
              {communities.length}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', minWidth: '300px' }}>
              <Search 
                size={16} 
                style={{ 
                  position: 'absolute', 
                  left: '0.75rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: '#64748b'
                }} 
              />
              <input
                type="text"
                placeholder="Search by Community Name..."
                className="input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
            <button className="btn btn-primary">
              Search
            </button>
            <button
              onClick={() => navigate('/community/create')}
              className="btn btn-primary"
            >
              <Plus size={18} />
              New Community
            </button>
          </div>
        </div>

        {/* Communities Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredCommunities.map((community) => (
            <div
              key={community.id}
              className="card"
              style={{
                padding: '0',
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
                border: location.state?.newCommunity?.id === community.id ? '2px solid #10b981' : '1px solid #e2e8f0',
                borderRadius: '0.75rem'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
              }}
            >
              {/* Community Header with Name */}
              <div style={{
                padding: '1rem 1.5rem 0.5rem',
                borderBottom: '1px solid #f1f5f9'
              }}>
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: 'bold', 
                  margin: 0,
                  color: '#1e293b'
                }}>
                  {community.name}
                </h3>
              </div>

              {/* Community Image */}
              <div style={{
                height: '160px',
                backgroundImage: `url(${community.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                margin: '0 1.5rem'
              }}>
                {/* New Community Badge */}
                {location.state?.newCommunity?.id === community.id && (
                  <div style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    NEW
                  </div>
                )}
              </div>

              {/* Community Content */}
              <div style={{ padding: '1rem 1.5rem 1.5rem' }}>
                <p style={{ 
                  color: '#64748b', 
                  fontSize: '0.875rem',
                  marginBottom: '1rem',
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {community.description}
                </p>

                {/* Footer with Date, Toggle and Actions */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <span style={{ 
                    fontSize: '0.875rem', 
                    color: '#64748b',
                    fontWeight: '500'
                  }}>
                    {community.created_at}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* Status Toggle */}
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        checked={community.status}
                        onChange={() => toggleStatus(community.id)}
                        style={{ display: 'none' }}
                      />
                      <div style={{
                        width: '3rem',
                        height: '1.5rem',
                        backgroundColor: community.status ? '#4f46e5' : '#e2e8f0',
                        borderRadius: '0.75rem',
                        position: 'relative',
                        transition: 'background-color 0.2s'
                      }}>
                        <div style={{
                          width: '1.25rem',
                          height: '1.25rem',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          position: 'absolute',
                          top: '0.125rem',
                          left: community.status ? '1.625rem' : '0.125rem',
                          transition: 'left 0.2s',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }} />
                      </div>
                    </label>

                    {/* Actions Dropdown */}
                    <div style={{ position: 'relative' }}>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === community.id ? null : community.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 1rem',
                          backgroundColor: '#4f46e5',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = '#4338ca'
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = '#4f46e5'
                        }}
                      >
                        Actions
                        <ChevronDown size={14} />
                      </button>

                      {/* Dropdown Menu */}
                      {activeDropdown === community.id && (
                        <div style={{
                          position: 'absolute',
                          top: '100%',
                          right: 0,
                          marginTop: '0.5rem',
                          width: '220px',
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '0.5rem',
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                          zIndex: 1000,
                          overflow: 'hidden'
                        }}>
                          {dropdownItems.map((item) => (
                            <button
                              key={item.key}
                              onClick={() => handleActionClick(item.key, community.id)}
                              style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                border: 'none',
                                background: 'transparent',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                color: '#374151',
                                textAlign: 'left',
                                transition: 'background-color 0.2s'
                              }}
                              onMouseOver={(e) => e.target.style.backgroundColor = '#f8fafc'}
                              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                              <item.icon size={16} color="#64748b" />
                              {item.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCommunities.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#64748b'
          }}>
            <Settings size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
              No communities found
            </h3>
            <p style={{ marginBottom: '2rem' }}>
              {searchTerm ? 'Try adjusting your search terms' : 'Create your first community to get started'}
            </p>
            <button
              onClick={() => navigate('/community/create')}
              className="btn btn-primary"
            >
              <Plus size={18} />
              Create Community
            </button>
          </div>
        )}

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
          <span>2025 © AITribes</span>
          <span style={{ cursor: 'pointer' }}>Support</span>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {activeDropdown && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 50
          }}
          onClick={() => setActiveDropdown(null)}
        />
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </Layout>
  )
}

export default Community
