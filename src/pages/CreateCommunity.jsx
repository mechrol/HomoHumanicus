import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { ChevronDown, Info, Check } from 'lucide-react'

const CreateCommunity = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    subdomain: '',
    timezone: '',
    themeType: 'predefined',
    selectedColor: '#4285f4',
    feedType: 'manual',
    customPrompt: 'Generate community post in the topic health and fitness. Stick to the information pertaining to the community topic.',
    numberOfPosts: '5',
    niche: '',
    language: 'English'
  })

  const predefinedColors = [
    '#4285f4', '#ea4335', '#ff6d01', '#fbbc04', '#34a853', '#9aa0a6',
    '#00acc1', '#00bcd4', '#03dac6', '#2196f3', '#3f51b5', '#673ab7',
    '#9c27b0', '#e91e63', '#f44336'
  ]

  const timezones = [
    'UTC-12:00 Baker Island',
    'UTC-11:00 American Samoa',
    'UTC-10:00 Hawaii',
    'UTC-09:00 Alaska',
    'UTC-08:00 Pacific Time',
    'UTC-07:00 Mountain Time',
    'UTC-06:00 Central Time',
    'UTC-05:00 Eastern Time',
    'UTC-04:00 Atlantic Time',
    'UTC-03:00 Argentina',
    'UTC-02:00 South Georgia',
    'UTC-01:00 Azores',
    'UTC+00:00 London',
    'UTC+01:00 Central Europe',
    'UTC+02:00 Eastern Europe',
    'UTC+03:00 Moscow',
    'UTC+04:00 Dubai',
    'UTC+05:00 Pakistan',
    'UTC+06:00 Bangladesh',
    'UTC+07:00 Thailand',
    'UTC+08:00 China',
    'UTC+09:00 Japan',
    'UTC+10:00 Australia',
    'UTC+11:00 Solomon Islands',
    'UTC+12:00 New Zealand'
  ]

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi'
  ]

  const postNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    // Validate required fields
    if (!formData.name || !formData.description || !formData.subdomain) {
      alert('Please fill in all required fields (Community Name, Description, and URL)')
      return
    }

    console.log('Saving community:', formData)
    
    // Create new community data with current timestamp
    const newCommunity = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      subdomain: formData.subdomain,
      image: getRandomCommunityImage(),
      created_at: new Date().toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      }),
      status: true,
      category: getCategoryFromNiche(formData.niche),
      themeColor: formData.selectedColor,
      feedType: formData.feedType,
      language: formData.language,
      timezone: formData.timezone,
      numberOfPosts: formData.numberOfPosts,
      niche: formData.niche,
      customPrompt: formData.customPrompt
    }

    // Store in localStorage to persist across navigation
    const existingCommunities = JSON.parse(localStorage.getItem('communities') || '[]')
    const updatedCommunities = [newCommunity, ...existingCommunities]
    localStorage.setItem('communities', JSON.stringify(updatedCommunities))

    // Navigate back to community page with success message
    navigate('/community', { 
      state: { 
        newCommunity: newCommunity,
        message: `Community "${formData.name}" created successfully!` 
      } 
    })
  }

  const getRandomCommunityImage = () => {
    const images = [
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400'
    ]
    return images[Math.floor(Math.random() * images.length)]
  }

  const getCategoryFromNiche = (niche) => {
    if (!niche) return 'General'
    const lowerNiche = niche.toLowerCase()
    if (lowerNiche.includes('health') || lowerNiche.includes('fitness') || lowerNiche.includes('wellness')) return 'Health'
    if (lowerNiche.includes('business') || lowerNiche.includes('entrepreneur') || lowerNiche.includes('startup')) return 'Business'
    if (lowerNiche.includes('tech') || lowerNiche.includes('technology') || lowerNiche.includes('ai')) return 'Technology'
    if (lowerNiche.includes('education') || lowerNiche.includes('learning') || lowerNiche.includes('course')) return 'Education'
    return 'General'
  }

  const handleBack = () => {
    navigate('/community')
  }

  return (
    <Layout>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        height: 'calc(100vh - 140px)'
      }}>
        {/* Left Panel - Form */}
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '2rem',
          borderRadius: '0.75rem',
          overflowY: 'auto'
        }}>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            marginBottom: '2rem',
            textAlign: 'center',
            color: '#1e293b'
          }}>
            Create Community
          </h1>

          {/* Community Details Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              marginBottom: '1.5rem',
              color: '#374151'
            }}>
              Community Details
            </h2>

            {/* Community Name */}
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                Community Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                className="input"
                placeholder="Enter Community Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>

            {/* Community Short Description */}
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                Community Short Description <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <textarea
                className="input"
                rows="3"
                placeholder="Enter Community Description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            {/* Community URL */}
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                Community URL <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ 
                  padding: '0.75rem', 
                  backgroundColor: '#e2e8f0', 
                  borderRadius: '0.5rem 0 0 0.5rem',
                  fontSize: '0.875rem',
                  color: '#64748b',
                  border: '1px solid #d1d5db',
                  borderRight: 'none'
                }}>
                  https://
                </span>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Community Subdomain Name"
                  value={formData.subdomain}
                  onChange={(e) => handleInputChange('subdomain', e.target.value)}
                  style={{ 
                    borderRadius: '0',
                    borderLeft: 'none',
                    borderRight: 'none'
                  }}
                />
                <span style={{ 
                  padding: '0.75rem', 
                  backgroundColor: '#e2e8f0', 
                  borderRadius: '0 0.5rem 0.5rem 0',
                  fontSize: '0.875rem',
                  color: '#64748b',
                  border: '1px solid #d1d5db',
                  borderLeft: 'none'
                }}>
                  .aitribes.app
                </span>
              </div>
            </div>

            {/* Time Zone */}
            <div className="form-group">
              <label>Time Zone</label>
              <div style={{ position: 'relative' }}>
                <select
                  className="input"
                  value={formData.timezone}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                  style={{ appearance: 'none', paddingRight: '2.5rem' }}
                >
                  <option value="">Select</option>
                  {timezones.map((tz) => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
                <ChevronDown 
                  size={16} 
                  style={{ 
                    position: 'absolute', 
                    right: '0.75rem', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: '#64748b'
                  }} 
                />
              </div>
            </div>

            {/* Theme Color */}
            <div className="form-group">
              <label>Theme Color</label>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="themeType"
                      value="predefined"
                      checked={formData.themeType === 'predefined'}
                      onChange={(e) => handleInputChange('themeType', e.target.value)}
                      style={{ accentColor: '#4f46e5' }}
                    />
                    Pre Defined Color
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="themeType"
                      value="custom"
                      checked={formData.themeType === 'custom'}
                      onChange={(e) => handleInputChange('themeType', e.target.value)}
                      style={{ accentColor: '#4f46e5' }}
                    />
                    Custom Color
                  </label>
                </div>

                {formData.themeType === 'predefined' && (
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(5, 1fr)', 
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    {predefinedColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleInputChange('selectedColor', color)}
                        style={{
                          width: '3rem',
                          height: '3rem',
                          backgroundColor: color,
                          border: formData.selectedColor === color ? '3px solid #1e293b' : '2px solid #e2e8f0',
                          borderRadius: '0.5rem',
                          cursor: 'pointer',
                          position: 'relative',
                          transition: 'all 0.2s'
                        }}
                      >
                        {formData.selectedColor === color && (
                          <Check size={16} color="white" style={{ 
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                          }} />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {formData.themeType === 'custom' && (
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={formData.selectedColor}
                      onChange={(e) => handleInputChange('selectedColor', e.target.value)}
                      style={{ 
                        width: '3rem', 
                        height: '3rem', 
                        border: 'none', 
                        borderRadius: '0.5rem',
                        cursor: 'pointer'
                      }}
                    />
                    <input
                      type="text"
                      className="input"
                      value={formData.selectedColor}
                      onChange={(e) => handleInputChange('selectedColor', e.target.value)}
                      style={{ maxWidth: '120px' }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Community Feed */}
            <div className="form-group">
              <label>Community Feed</label>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="feedType"
                    value="manual"
                    checked={formData.feedType === 'manual'}
                    onChange={(e) => handleInputChange('feedType', e.target.value)}
                    style={{ accentColor: '#4f46e5' }}
                  />
                  Manual
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="feedType"
                    value="ai"
                    checked={formData.feedType === 'ai'}
                    onChange={(e) => handleInputChange('feedType', e.target.value)}
                    style={{ accentColor: '#4f46e5' }}
                  />
                  AI
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="feedType"
                    value="ai-custom"
                    checked={formData.feedType === 'ai-custom'}
                    onChange={(e) => handleInputChange('feedType', e.target.value)}
                    style={{ accentColor: '#4f46e5' }}
                  />
                  AI-Custom Prompt
                </label>
              </div>

              {formData.feedType === 'ai-custom' && (
                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    Custom Prompt <Info size={14} color="#64748b" />
                  </label>
                  <textarea
                    className="input"
                    rows="3"
                    value={formData.customPrompt}
                    onChange={(e) => handleInputChange('customPrompt', e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Community Niche */}
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                Community Niche <Info size={14} color="#64748b" />
              </label>
              <input
                type="text"
                className="input"
                placeholder="Enter Community Niche Name here.."
                value={formData.niche}
                onChange={(e) => handleInputChange('niche', e.target.value)}
              />
            </div>

            {/* Select Language */}
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                Select Language <Info size={14} color="#64748b" />
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  className="input"
                  value={formData.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  style={{ appearance: 'none', paddingRight: '2.5rem' }}
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
                <ChevronDown 
                  size={16} 
                  style={{ 
                    position: 'absolute', 
                    right: '0.75rem', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: '#64748b'
                  }} 
                />
              </div>
            </div>

            {/* Number Of Post */}
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                Number Of Post <Info size={14} color="#64748b" />
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  className="input"
                  value={formData.numberOfPosts}
                  onChange={(e) => handleInputChange('numberOfPosts', e.target.value)}
                  style={{ appearance: 'none', paddingRight: '2.5rem' }}
                >
                  {postNumbers.map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <ChevronDown 
                  size={16} 
                  style={{ 
                    position: 'absolute', 
                    right: '0.75rem', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: '#64748b'
                  }} 
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem' }}>
            <button
              onClick={handleSave}
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              Save
            </button>
            <button
              onClick={handleBack}
              className="btn btn-secondary"
            >
              Back
            </button>
          </div>
        </div>

        {/* Right Panel - Template Preview */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          border: '1px solid #e2e8f0',
          overflowY: 'auto'
        }}>
          <h2 style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            marginBottom: '1.5rem',
            color: '#374151'
          }}>
            Template Sample Preview
          </h2>

          {/* Mock Community Preview */}
          <div style={{
            border: '2px solid #e2e8f0',
            borderRadius: '0.75rem',
            padding: '1rem',
            backgroundColor: '#fafafa',
            minHeight: '600px'
          }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              padding: '0.75rem',
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  backgroundColor: formData.selectedColor,
                  borderRadius: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  {formData.name ? formData.name.charAt(0).toUpperCase() : 'C'}
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>
                    {formData.name || 'Community Name'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {formData.subdomain || 'subdomain'}.aitribes.app
                  </div>
                </div>
              </div>
              <div style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '50%',
                backgroundColor: '#e2e8f0',
                backgroundImage: 'url(https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
            </div>

            {/* Hero Image */}
            <div style={{
              height: '120px',
              backgroundColor: '#e2e8f0',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
              backgroundImage: 'url(https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />

            {/* Community Info */}
            <div style={{
              backgroundColor: 'white',
              padding: '1rem',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ 
                fontSize: '1rem', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                color: formData.selectedColor
              }}>
                {formData.name || 'The Great Content League'}
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4 }}>
                {formData.description || 'Welcome to our amazing community where we share insights, connect with like-minded individuals, and grow together. Join us in this exciting journey of learning and collaboration.'}
              </p>
            </div>

            {/* Sample Posts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {Array.from({ length: parseInt(formData.numberOfPosts) || 3 }, (_, i) => (
                <div key={i} style={{
                  backgroundColor: 'white',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      borderRadius: '50%',
                      backgroundColor: '#e2e8f0',
                      backgroundImage: `url(https://images.pexels.com/photos/${220453 + i}/pexels-photo-${220453 + i}.jpeg?auto=compress&cs=tinysrgb&w=30)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: '500' }}>User {i + 1}</span>
                    <span style={{ fontSize: '0.625rem', color: '#64748b' }}>2h</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#374151', lineHeight: 1.3 }}>
                    {formData.feedType === 'ai-custom' && formData.customPrompt 
                      ? `AI Generated: ${formData.customPrompt.substring(0, 80)}...`
                      : `Sample ${formData.feedType} post content for ${formData.niche || 'community'} niche...`
                    }
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.625rem', color: '#64748b' }}>👍 {Math.floor(Math.random() * 20) + 1}</span>
                    <span style={{ fontSize: '0.625rem', color: '#64748b' }}>💬 {Math.floor(Math.random() * 10) + 1}</span>
                    <span style={{ fontSize: '0.625rem', color: '#64748b' }}>🔄 {Math.floor(Math.random() * 5) + 1}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Language & Settings Info */}
            <div style={{ 
              marginTop: '1rem', 
              padding: '0.75rem',
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              border: '1px solid #e2e8f0',
              fontSize: '0.75rem',
              color: '#64748b'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span>Language: {formData.language}</span>
                <span>Posts: {formData.numberOfPosts}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Feed: {formData.feedType}</span>
                <span>Timezone: {formData.timezone || 'Not set'}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem',
            fontSize: '0.75rem',
            color: '#64748b'
          }}>
            <span>2025 © AITribes</span>
            <span>Support</span>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCommunity
