import { useMemo, useState } from 'react'
import logo from './assets/logo.png'

const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'product', label: 'Product' },
  { id: 'insights', label: 'Insights' },
  { id: 'community', label: 'Community' },
  { id: 'catalogue', label: 'Catalogue' },
  { id: 'ai-agent', label: 'AI Agent' },
]

function App() {
  const apiBase = (import.meta.env?.VITE_API_BASE_URL || '').replace(/\/$/, '')
  const apiUrl = (path) => `${apiBase}${path.startsWith('/') ? path : `/${path}`}`
  const [activeTab, setActiveTab] = useState('home')
  const [craftDescription, setCraftDescription] = useState('')
  const [artisanBackground, setArtisanBackground] = useState('')
  const [generated, setGenerated] = useState(null)
  const [insightsTab, setInsightsTab] = useState('overview')
  const [communityCategory, setCommunityCategory] = useState('default')
  const [genForm, setGenForm] = useState({ name: '', materials: '', technique: '', artisanStory: '', audience: '', tone: '' })
  const [genResult, setGenResult] = useState('')
  const [genLoading, setGenLoading] = useState(false)
  const [genError, setGenError] = useState('')
  const [recsLoading, setRecsLoading] = useState(false)
  const [recsError, setRecsError] = useState('')
  const [recsData, setRecsData] = useState(null)

  const handleGenerate = () => {
    if (!craftDescription.trim()) {
      alert('Please describe your craft first!')
      return
    }
    setGenerated({
      story: `"Every thread tells a story of tradition and passion. ${craftDescription} This ancient art form, passed down through generations, represents not just a craft, but a living heritage that connects us to our roots."`,
    })
  }

  const useTemplate = (type) => {
    const templates = {
      product:
        'Showcase the intricate details and unique features of your handcrafted piece...',
      heritage:
        'This traditional art form has been practiced in our family for over 100 years...',
      process:
        'Watch as skilled hands transform raw materials into beautiful works of art...',
    }
    setCraftDescription(templates[type])
  }

  const communityData = useMemo(() => ({
    artisans: {
      title: 'Fellow Artisans',
      members: [
        { name: 'Rajesh Kumar', type: 'Wood Carving Artist • Jaipur, Rajasthan', details: '25 years experience • 4.8★ rating', avatar: 'R', bgColor: 'bg-purple-500', textColor: 'text-purple-600', buttonColor: 'bg-purple-600 hover:bg-purple-700', buttonText: 'Connect' },
        { name: 'Sunita Devi', type: 'Textile Weaver • Varanasi, UP', details: '15 years experience • 4.9★ rating', avatar: 'S', bgColor: 'bg-green-500', textColor: 'text-purple-600', buttonColor: 'bg-purple-600 hover:bg-purple-700', buttonText: 'Connect' },
        { name: 'Meera Patel', type: 'Pottery Artist • Ahmedabad, Gujarat', details: '12 years experience • 4.7★ rating', avatar: 'M', bgColor: 'bg-indigo-500', textColor: 'text-purple-600', buttonColor: 'bg-purple-600 hover:bg-purple-700', buttonText: 'Connect' },
      ],
    },
    historians: {
      title: 'Historians & Researchers',
      members: [
        { name: 'Dr. Arjun Sharma', type: 'Textile Heritage Researcher • Delhi University', details: 'PhD in Cultural Studies • 200+ publications', avatar: 'A', bgColor: 'bg-amber-500', textColor: 'text-amber-600', buttonColor: 'bg-amber-600 hover:bg-amber-700', buttonText: 'Collaborate' },
        { name: 'Prof. Kavita Singh', type: 'Folk Art Historian • JNU', details: 'Expert in Traditional Crafts • Author of 5 books', avatar: 'K', bgColor: 'bg-teal-500', textColor: 'text-teal-600', buttonColor: 'bg-teal-600 hover:bg-teal-700', buttonText: 'Connect' },
      ],
    },
    ngos: {
      title: 'NGOs & Organizations',
      members: [
        { name: 'Craft Heritage Foundation', type: 'NGO supporting traditional crafts • Mumbai', details: 'Funding available • Training programs', avatar: '🏢', bgColor: 'bg-blue-500', textColor: 'text-blue-600', buttonColor: 'bg-blue-600 hover:bg-blue-700', buttonText: 'Learn More' },
        { name: 'Artisan Welfare Society', type: 'Supporting rural artisans • Bangalore', details: 'Microfinance • Skill development', avatar: '🤝', bgColor: 'bg-emerald-500', textColor: 'text-emerald-600', buttonColor: 'bg-emerald-600 hover:bg-emerald-700', buttonText: 'Apply' },
      ],
    },
    influencers: {
      title: 'Local Influencers',
      members: [
        { name: 'Ananya Lifestyle', type: 'Lifestyle Blogger • 45K followers • Bangalore', details: 'Promotes handmade products • Local focus', avatar: 'A', bgColor: 'bg-pink-500', textColor: 'text-pink-600', buttonColor: 'bg-pink-600 hover:bg-pink-700', buttonText: 'Collaborate' },
        { name: 'CraftLove Mumbai', type: 'Instagram Influencer • 32K followers • Mumbai', details: 'Traditional crafts promoter • Weekly features', avatar: 'C', bgColor: 'bg-rose-500', textColor: 'text-rose-600', buttonColor: 'bg-rose-600 hover:bg-rose-700', buttonText: 'Connect' },
      ],
    },
    government: {
      title: 'Government Programs',
      members: [
        { name: 'PM Vishwakarma Scheme', type: 'Financial support for traditional artisans', details: 'Funding: Up to ₹3 Lakh • Skill development', avatar: '🏛️', bgColor: 'bg-green-500', textColor: 'text-green-600', buttonColor: 'bg-green-600 hover:bg-green-700', buttonText: 'Apply Now' },
        { name: 'Handicrafts Development Program', type: 'Marketing support and exhibitions', details: 'Next Exhibition: Dec 2024 • Registration open', avatar: '📋', bgColor: 'bg-blue-500', textColor: 'text-blue-600', buttonColor: 'bg-blue-600 hover:bg-blue-700', buttonText: 'Register' },
      ],
    },
    opportunities: {
      title: 'Upcoming Opportunities',
      members: [
        { name: 'Artisan Skill Workshop', type: 'Online skill enhancement workshop', details: 'Dec 15, 2024 • Free registration • Certificate provided', avatar: '🎯', bgColor: 'bg-purple-500', textColor: 'text-purple-600', buttonColor: 'bg-purple-600 hover:bg-purple-700', buttonText: 'Register' },
        { name: 'Craft Exhibition Delhi', type: 'National craft exhibition and fair', details: 'Jan 20-25, 2025 • Deadline: Jan 5', avatar: '🎪', bgColor: 'bg-green-500', textColor: 'text-green-600', buttonColor: 'bg-green-600 hover:bg-green-700', buttonText: 'Apply' },
        { name: 'Funding Workshop', type: 'Learn about available financial support', details: 'Feb 5, 2025 • Mumbai • For registered artisans', avatar: '💰', bgColor: 'bg-orange-500', textColor: 'text-orange-600', buttonColor: 'bg-orange-600 hover:bg-orange-700', buttonText: 'Join' },
      ],
    },
    default: {
      title: 'My Connections',
      members: [
        { name: 'Rajesh Kumar', type: 'Wood Carving Artist • Jaipur, Rajasthan', details: '25 years experience • 4.8★ rating', avatar: 'R', bgColor: 'bg-purple-500', textColor: 'text-purple-600', buttonColor: 'bg-purple-600 hover:bg-purple-700', buttonText: 'Connect' },
        { name: 'Sunita Devi', type: 'Textile Weaver • Varanasi, UP', details: '15 years experience • 4.9★ rating', avatar: 'S', bgColor: 'bg-green-500', textColor: 'text-purple-600', buttonColor: 'bg-purple-600 hover:bg-purple-700', buttonText: 'Connect' },
        { name: 'Craft Heritage Foundation', type: 'NGO supporting traditional crafts • Mumbai', details: 'Funding available • Training programs', avatar: '🏢', bgColor: 'bg-blue-500', textColor: 'text-blue-600', buttonColor: 'bg-blue-600 hover:bg-blue-700', buttonText: 'Learn More' },
        { name: 'Ananya Lifestyle', type: 'Lifestyle Blogger • 45K followers • Bangalore', details: 'Promotes handmade products • Local focus', avatar: 'A', bgColor: 'bg-pink-500', textColor: 'text-pink-600', buttonColor: 'bg-pink-600 hover:bg-pink-700', buttonText: 'Collaborate' },
      ],
    },
  }), [])

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src={logo} alt="CraftConnect" className="h-8 w-auto" />
            </div>
            <div className="hidden md:flex space-x-8">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`nav-btn px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === t.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                      : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">Welcome, Priya Sharma</div>
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">P</div>
            </div>
          </div>
        </div>
      </nav>

      {activeTab === 'home' && (
        <div className="tab-content active">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Empower Your Craft with AI</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Connect, Create, and Grow Your Artisan Business
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setActiveTab('ai-marketing')}
                  className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
                >
                  Get Started
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-600">12</div>
                <div className="text-gray-600">Products Listed</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-600">₹45,230</div>
                <div className="text-gray-600">Monthly Revenue</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">1,247</div>
                <div className="text-gray-600">Profile Views</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-orange-600">89%</div>
                <div className="text-gray-600">Customer Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Our comprehensive platform provides all the tools you need to market your craft, tell your story, and build a thriving business.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="w-12 h-12 rounded-lg text-purple-600 bg-purple-100 flex items-center justify-center mb-4"><div className="text-2xl">✨</div></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Marketing</h3>
                  <p className="text-gray-600 leading-relaxed">Generate compelling stories, images, and videos for your crafts with advanced AI technology.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="w-12 h-12 rounded-lg text-red-600 bg-red-100 flex items-center justify-center mb-4"><div className="text-2xl">❤️</div></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Tell Your Story</h3>
                  <p className="text-gray-600 leading-relaxed">Create personalized landing pages that showcase your journey and craft heritage.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="w-12 h-12 rounded-lg text-green-600 bg-green-100 flex items-center justify-center mb-4"><div className="text-2xl">📈</div></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Insights</h3>
                  <p className="text-gray-600 leading-relaxed">Simple, clear analytics to help you understand your business growth and opportunities.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="w-12 h-12 rounded-lg text-blue-600 bg-blue-100 flex items-center justify-center mb-4"><div className="text-2xl">👥</div></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Connect</h3>
                  <p className="text-gray-600 leading-relaxed">Network with fellow artisans, historians, researchers, and cultural enthusiasts.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="w-12 h-12 rounded-lg text-indigo-600 bg-indigo-100 flex items-center justify-center mb-4"><div className="text-2xl">🌍</div></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Digital Reach</h3>
                  <p className="text-gray-600 leading-relaxed">Expand beyond local markets and reach global audiences interested in authentic crafts.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="w-12 h-12 rounded-lg text-yellow-600 bg-yellow-100 flex items-center justify-center mb-4"><div className="text-2xl">⚡</div></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Marketing Agent</h3>
                  <p className="text-gray-600 leading-relaxed">Autonomous digital marketing with human oversight for SEO, social media, and more.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="py-20 bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Stories from Our Artisan Community</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Hear from craftspeople who have transformed their businesses with CraftConnect.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">M</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Meera Patel</h4>
                      <p className="text-sm text-gray-600">Traditional Pottery</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">"CraftConnect helped me share my grandmother's pottery techniques with the world. Sales increased 300% in 6 months!"</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">R</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Rajesh Kumar</h4>
                      <p className="text-sm text-gray-600">Handwoven Textiles</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">"The AI tools created beautiful stories about my weaving process. Now I connect with customers who truly value craftsmanship."</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">A</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Amara Singh</h4>
                      <p className="text-sm text-gray-600">Wood Carving</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">"The community feature connected me with other artisans. We now collaborate and learn from each other every day."</p>
                </div>
              </div>
            </div>
          </div>

          <div className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find answers to common questions about our platform.</p>
              </div>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-lg"><h3 className="text-lg font-semibold text-gray-900 mb-3">I'm an artisan. How can I join the platform?</h3><p className="text-gray-700 leading-relaxed">You can sign up using your mobile number or email. After verification, you can create your profile, upload product photos, and share details about your craft.</p></div>
                <div className="bg-white p-6 rounded-xl shadow-lg"><h3 className="text-lg font-semibold text-gray-900 mb-3">I am a traditional artisan with no digital skills. Can I really use this platform?</h3><p className="text-gray-700 leading-relaxed">Yes. Our platform is designed for artisans who are not tech-savvy. With just photos and a few details, the AI automatically creates your online shop, stories, and product descriptions.</p></div>
                <div className="bg-white p-6 rounded-xl shadow-lg"><h3 className="text-lg font-semibold text-gray-900 mb-3">Can I update my story or product details later?</h3><p className="text-gray-700 leading-relaxed">Absolutely. You can edit or regenerate your story anytime, and our AI will adapt it for you.</p></div>
                <div className="bg-white p-6 rounded-xl shadow-lg"><h3 className="text-lg font-semibold text-gray-900 mb-3">Can the AI replace the artisan's own words?</h3><p className="text-gray-700 leading-relaxed">No. The AI is just an assistant. Artisans have full control — they can edit or rewrite any generated content.</p></div>
                <div className="bg-white p-6 rounded-xl shadow-lg"><h3 className="text-lg font-semibold text-gray-900 mb-3">How do I know the products are authentic?</h3><p className="text-gray-700 leading-relaxed">Each artisan has a verified profile, and their stories are backed by AI-assisted storytelling to reflect their real craft journey.</p></div>
                <div className="bg-white p-6 rounded-xl shadow-lg"><h3 className="text-lg font-semibold text-gray-900 mb-3">How does the AI help artisans?</h3><p className="text-gray-700 leading-relaxed">The AI generates product stories, catalog descriptions, and even marketing content in multiple languages to help artisans connect with more customers.</p></div>
                <div className="bg-white p-6 rounded-xl shadow-lg"><h3 className="text-lg font-semibold text-gray-900 mb-3">How can I get help if I face issues?</h3><p className="text-gray-700 leading-relaxed">You can reach out through our "Help & Support" page, and our team will guide you.</p></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'product' && (
        <div className="tab-content active">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Product Catalouge</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-2xl mr-2">📝</span>
                  Create Your Story
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tell us about your craft
                    </label>
                    <textarea
                      value={craftDescription}
                      onChange={(e) => setCraftDescription(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={3}
                      placeholder="I create handwoven silk sarees using traditional techniques passed down through generations..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your background
                    </label>
                    <textarea
                      value={artisanBackground}
                      onChange={(e) => setArtisanBackground(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={2}
                      placeholder="I learned this art from my grandmother in our village in Karnataka..."
                    />
                  </div>
                  <button
                    onClick={handleGenerate}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
                  >
                    ✨ Generate AI Story
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-2xl mr-2">🎨</span>
                  Generated Content
                </h2>
                <div className="space-y-4">
                  {generated ? (
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h3 className="font-semibold text-purple-600 mb-2">Your Craft Story</h3>
                      <p className="text-gray-700 text-sm mb-3">{generated.story}</p>
                      <div className="flex space-x-2">
                        <button className="bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700">
                          Use This Story
                        </button>
                        <button
                          onClick={handleGenerate}
                          className="border border-purple-600 text-purple-600 px-3 py-1 rounded text-xs hover:bg-purple-50"
                        >
                          Generate Another
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-purple-600 mb-2">Your Craft Story</h3>
                      <p className="text-gray-700 text-sm">
                        Click "Generate AI Story" to create compelling content for your products!
                      </p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <div className="text-4xl mb-2">🖼️</div>
                      <p className="text-sm text-gray-600">AI Generated Image</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <div className="text-4xl mb-2">🎥</div>
                      <p className="text-sm text-gray-600">Video Content</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-2xl mr-2">🧵</span>
                  Generate Product Description 
                </h2>
                <div className="space-y-3">
                  {['name','materials','technique','artisanStory','audience','tone'].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field === 'artisanStory' ? 'Artisan Story' : field}</label>
                      <input
                        value={genForm[field]}
                        onChange={(e) => setGenForm({ ...genForm, [field]: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder={field === 'name' ? 'Handwoven Silk Scarf' : ''}
                      />
                    </div>
                  ))}
                  <button
                    disabled={genLoading}
                    onClick={async () => {
                      setGenError('')
                      if (!genForm.name || !genForm.materials || !genForm.technique) {
                        setGenError('Please fill name, materials, and technique')
                        return
                      }
                      try {
                        setGenLoading(true)
                        const res = await fetch(apiUrl('/api/generate-description'), {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(genForm),
                        })
                        const data = await res.json()
                        if (!res.ok) throw new Error(data?.error || 'Request failed')
                        setGenResult(data.description || '')
                      } catch (e) {
                        setGenError(e.message || 'Something went wrong')
                      } finally {
                        setGenLoading(false)
                      }
                    }}
                    className={`w-full ${genLoading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'} text-white py-3 rounded-lg font-semibold`}
                  >
                    {genLoading ? 'Generating…' : 'Generate Description'}
                  </button>
                  {genError && <p className="text-sm text-red-600">{genError}</p>}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-2xl mr-2">📝</span>
                  Generated Description
                </h2>
                <textarea
                  value={genResult}
                  onChange={(e) => setGenResult(e.target.value)}
                  className="w-full min-h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Generated description will appear here..."
                />
              </div>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Content Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer"
                  onClick={() => useTemplate('product')}
                >
                  <h3 className="font-semibold mb-2">Product Showcase</h3>
                  <p className="text-sm text-gray-600">
                    Highlight your craft's unique features and craftsmanship
                  </p>
                </div>
                <div
                  className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer"
                  onClick={() => useTemplate('heritage')}
                >
                  <h3 className="font-semibold mb-2">Heritage Story</h3>
                  <p className="text-sm text-gray-600">
                    Share the cultural significance and history behind your art
                  </p>
                </div>
                <div
                  className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer"
                  onClick={() => useTemplate('process')}
                >
                  <h3 className="font-semibold mb-2">Making Process</h3>
                  <p className="text-sm text-gray-600">
                    Show the step-by-step creation of your masterpiece
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="tab-content active">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Business Insights</h1>
            <div className="mb-6 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'overview', label: '📊 Overview' },
                  { id: 'sales', label: '💰 Sales' },
                  { id: 'products', label: '🏆 Products' },
                  { id: 'marketing', label: '📱 Marketing' },
                  { id: 'recommendations', label: '🎯 Recommendations' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setInsightsTab(t.id)}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                      insightsTab === t.id
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </nav>
            </div>

            {insightsTab === 'overview' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Monthly Revenue</p>
                        <p className="text-2xl font-bold text-green-600">₹1,23,450</p>
                        <p className="text-xs text-green-500 flex items-center mt-1">↗ +12% vs last month</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">💰</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Orders</p>
                        <p className="text-2xl font-bold text-blue-600">47</p>
                        <p className="text-xs text-blue-500 flex items-center mt-1">↗ +8 new this week</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">📦</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Active Customers</p>
                        <p className="text-2xl font-bold text-purple-600">234</p>
                        <p className="text-xs text-purple-500 flex items-center mt-1">↗ +15 new customers</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">👥</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Avg. Order Value</p>
                        <p className="text-2xl font-bold text-orange-600">₹2,625</p>
                        <p className="text-xs text-orange-500 flex items-center mt-1">↗ +5% increase</p>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-2xl">📈</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="text-2xl mr-3">🎨</span>
                    Craft Business Health
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center text-3xl mx-auto mb-3">⏱️</div>
                      <p className="text-sm text-gray-600 mb-2">Production Time</p>
                      <p className="text-xl font-bold text-indigo-600">5.2 days</p>
                      <p className="text-xs text-green-500">↘ -0.8 days</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-pink-100 rounded-xl flex items-center justify-center text-3xl mx-auto mb-3">📋</div>
                      <p className="text-sm text-gray-600 mb-2">Order Backlog</p>
                      <p className="text-xl font-bold text-pink-600">12</p>
                      <p className="text-xs text-orange-500">↗ +3 orders</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center text-3xl mx-auto mb-3">💎</div>
                      <p className="text-sm text-gray-600 mb-2">Inventory Value</p>
                      <p className="text-xl font-bold text-teal-600">₹45,200</p>
                      <p className="text-xs text-blue-500">↗ +8%</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center text-3xl mx-auto mb-3">⭐</div>
                      <p className="text-sm text-gray-600 mb-2">Avg. Rating</p>
                      <p className="text-xl font-bold text-yellow-600">4.8/5</p>
                      <p className="text-xs text-green-500">↗ +0.2</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center text-3xl mx-auto mb-3">🔄</div>
                      <p className="text-sm text-gray-600 mb-2">Return Rate</p>
                      <p className="text-xl font-bold text-red-600">2.1%</p>
                      <p className="text-xs text-green-500">↘ -0.5%</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center text-3xl mx-auto mb-3">💚</div>
                      <p className="text-sm text-gray-600 mb-2">Repeat Customers</p>
                      <p className="text-xl font-bold text-emerald-600">68%</p>
                      <p className="text-xs text-green-500">↗ +5%</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <span className="text-2xl mr-2">📈</span>
                      This Month's Highlights
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">✓</div>
                        <div>
                          <p className="font-semibold text-green-800 text-sm">Revenue Growth</p>
                          <p className="text-xs text-green-600">12% increase from last month</p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">👥</div>
                        <div>
                          <p className="font-semibold text-blue-800 text-sm">New Customers</p>
                          <p className="text-xs text-blue-600">15 customers joined this month</p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">⭐</div>
                        <div>
                          <p className="font-semibold text-purple-800 text-sm">Quality Improvement</p>
                          <p className="text-xs text-purple-600">Rating increased to 4.8/5</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <span className="text-2xl mr-2">⚡</span>
                      Next Actions
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">📦</div>
                        <div className="flex-1">
                          <p className="font-semibold text-orange-800 text-sm">Restock Popular Items</p>
                          <p className="text-xs text-orange-600">Silk scarves running low</p>
                        </div>
                        <button className="text-xs bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700">View</button>
                      </div>
                      <div className="flex items-center p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">📱</div>
                        <div className="flex-1">
                          <p className="font-semibold text-red-800 text-sm">Social Media Post</p>
                          <p className="text-xs text-red-600">Schedule today's content</p>
                        </div>
                        <button className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Post</button>
                      </div>
                      <div className="flex items-center p-3 bg-teal-50 rounded-lg border border-teal-200">
                        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">💡</div>
                        <div className="flex-1">
                          <p className="font-semibold text-teal-800 text-sm">Festival Collection</p>
                          <p className="text-xs text-teal-600">Plan for upcoming season</p>
                        </div>
                        <button className="text-xs bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700">Plan</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {insightsTab === 'sales' && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Monthly Sales Trend</h3>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                      <div className="text-center">
                        <div className="text-4xl mb-3 text-gray-400">📈</div>
                        <p className="text-gray-700 font-medium">Interactive Sales Chart</p>
                        <p className="text-sm text-gray-500 mt-2">6-month growth trajectory</p>
                        <div className="mt-4 flex justify-center space-x-4 text-xs">
                          <span className="flex items-center text-gray-600"><div className="w-3 h-3 bg-purple-500 rounded mr-1"></div>Revenue</span>
                          <span className="flex items-center text-gray-600"><div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>Orders</span>
                          <span className="flex items-center text-gray-600"><div className="w-3 h-3 bg-green-500 rounded mr-1"></div>Customers</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Customer Demographics</h3>
                    <div className="h-64 bg-gray-50 rounded-lg border border-gray-100 p-4">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">Age 25-35</span>
                            <span className="text-sm text-gray-600">42%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">Age 36-45</span>
                            <span className="text-sm text-gray-600">35%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">Age 46+</span>
                            <span className="text-sm text-gray-600">23%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                          </div>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <p className="text-lg font-bold text-gray-700">68%</p>
                            <p className="text-xs text-gray-500">Female Customers</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <p className="text-lg font-bold text-gray-700">32%</p>
                            <p className="text-xs text-gray-500">Male Customers</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-8">
                  <h3 className="text-lg font-semibold mb-6 text-gray-800">Sales Performance Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4">
                      <div className="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center text-2xl mx-auto mb-3 border border-green-100">💰</div>
                      <p className="text-sm text-gray-600 mb-2">Revenue Growth</p>
                      <p className="text-2xl font-bold text-gray-800">+12%</p>
                      <p className="text-xs text-green-600">vs last month</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center text-2xl mx-auto mb-3 border border-blue-100">📊</div>
                      <p className="text-sm text-gray-600 mb-2">Order Conversion</p>
                      <p className="text-2xl font-bold text-gray-800">8.4%</p>
                      <p className="text-xs text-blue-600">from website visits</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-16 h-16 bg-purple-50 rounded-lg flex items-center justify-center text-2xl mx-auto mb-3 border border-purple-100">🎯</div>
                      <p className="text-sm text-gray-600 mb-2">Customer Lifetime Value</p>
                      <p className="text-2xl font-bold text-gray-800">₹8,750</p>
                      <p className="text-xs text-purple-600">average per customer</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold mb-6 text-gray-800">Revenue Breakdown by Category</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100"><div className="flex items-center"><div className="w-3 h-3 bg-purple-500 rounded mr-3"></div><span className="font-medium text-gray-700">Textiles & Fabrics</span></div><div className="text-right"><span className="font-semibold text-gray-800">₹68,500</span><span className="text-sm text-gray-500 ml-2">(55%)</span></div></div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100"><div className="flex items-center"><div className="w-3 h-3 bg-blue-500 rounded mr-3"></div><span className="font-medium text-gray-700">Pottery & Ceramics</span></div><div className="text-right"><span className="font-semibold text-gray-800">₹32,400</span><span className="text-sm text-gray-500 ml-2">(26%)</span></div></div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100"><div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded mr-3"></div><span className="font-medium text-gray-700">Leather Goods</span></div><div className="text-right"><span className="font-semibold text-gray-800">₹22,550</span><span className="text-sm text-gray-500 ml-2">(19%)</span></div></div>
                  </div>
                </div>
              </>
            )}
            {insightsTab === 'products' && (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Performance</h2>
                  <p className="text-gray-600">Analyze your product performance, regional preferences, and seasonal trends.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center"><span className="text-xl mr-2">🏆</span>Top Performing Products</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"><div className="flex items-center"><div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">🧣</div><div><p className="font-medium text-sm text-gray-800">Handwoven Silk Scarf</p><p className="text-xs text-gray-600">23 sold • ₹73,600 revenue</p></div></div><div className="text-right"><p className="text-sm font-bold text-gray-700">#1</p><p className="text-xs text-green-600">↗ +15%</p></div></div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"><div className="flex items-center"><div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">🏺</div><div><p className="font-medium text-sm text-gray-800">Ceramic Vase Set</p><p className="text-xs text-gray-600">18 sold • ₹32,400 revenue</p></div></div><div className="text-right"><p className="text-sm font-bold text-gray-700">#2</p><p className="text-xs text-green-600">↗ +8%</p></div></div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"><div className="flex items-center"><div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">👜</div><div><p className="font-medium text-sm text-gray-800">Leather Handbag</p><p className="text-xs text-gray-600">12 sold • ₹54,000 revenue</p></div></div><div className="text-right"><p className="text-sm font-bold text-gray-700">#3</p><p className="text-xs text-red-600">↘ -3%</p></div></div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center"><span className="text-xl mr-2">🌍</span>Regional Preferences</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-100"><div className="flex justify-between items-center mb-2"><p className="font-medium text-sm text-gray-800">Mumbai & Delhi</p><span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">Hot Market</span></div><p className="text-xs text-gray-600">Traditional silk items • 45% of orders</p><div className="mt-2 bg-gray-200 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div></div></div>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-100"><div className="flex justify-between items-center mb-2"><p className="font-medium text-sm text-gray-800">Bangalore & Pune</p><span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">Growing</span></div><p className="text-xs text-gray-600">Modern craft items • 32% of orders</p><div className="mt-2 bg-gray-200 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: '32%' }}></div></div></div>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-100"><div className="flex justify-between items-center mb-2"><p className="font-medium text-sm text-gray-800">International</p><span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">Emerging</span></div><p className="text-xs text-gray-600">Heritage collection • 23% of orders</p><div className="mt-2 bg-gray-200 rounded-full h-2"><div className="bg-purple-500 h-2 rounded-full" style={{ width: '23%' }}></div></div></div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center"><span className="text-xl mr-2">🕰️</span>Seasonal Trends</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-100"><div className="flex justify-between items-center mb-1"><p className="font-medium text-sm text-gray-800">Festival Season</p><p className="text-xs font-semibold text-gray-600">Peak Time</p></div><p className="text-xs text-gray-600">Oct-Nov: +180% sales boost</p><div className="flex items-center mt-2"><span className="text-xs mr-1">🚀</span><p className="text-xs text-gray-600">Traditional & Ceremonial items</p></div></div>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-100"><div className="flex justify-between items-center mb-1"><p className="font-medium text-sm text-gray-800">Wedding Season</p><p className="text-xs font-semibold text-gray-600">High Demand</p></div><p className="text-xs text-gray-600">Dec-Feb: +120% increase</p><div className="flex items-center mt-2"><span className="text-xs mr-1">💍</span><p className="text-xs text-gray-600">Bridal accessories & gifts</p></div></div>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-100"><div className="flex justify-between items-center mb-1"><p className="font-medium text-sm text-gray-800">Summer Collection</p><p className="text-xs font-semibold text-gray-600">Stable</p></div><p className="text-xs text-gray-600">Mar-Jun: Consistent orders</p><div className="flex items-center mt-2"><span className="text-xs mr-1">☀️</span><p className="text-xs text-gray-600">Light fabrics & home decor</p></div></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold mb-6 text-gray-800">Product Insights Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100"><div className="text-2xl font-bold text-gray-800 mb-1">23</div><p className="text-sm text-gray-600">Best Seller Units</p><p className="text-xs text-gray-500">Silk Scarf</p></div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100"><div className="text-2xl font-bold text-gray-800 mb-1">₹3,200</div><p className="text-sm text-gray-600">Highest Price Point</p><p className="text-xs text-gray-500">Premium Products</p></div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100"><div className="text-2xl font-bold text-gray-800 mb-1">4.8/5</div><p className="text-sm text-gray-600">Customer Rating</p><p className="text-xs text-gray-500">Overall Average</p></div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100"><div className="text-2xl font-bold text-gray-800 mb-1">85%</div><p className="text-sm text-gray-600">Repurchase Rate</p><p className="text-xs text-gray-500">Customer Loyalty</p></div>
                  </div>
                </div>
              </>
            )}
            {insightsTab === 'marketing' && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center"><span className="text-xl mr-2">📊</span>Platform Performance</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100"><div className="flex items-center"><div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-3 border border-purple-200"><span className="text-purple-600 font-bold text-sm">IG</span></div><div><p className="font-medium text-gray-800">Instagram</p><p className="text-sm text-gray-600">8.2K reach • 450 engagements</p></div></div><div className="text-right"><p className="text-lg font-bold text-gray-700">5.5%</p><p className="text-xs text-green-600">↗ +12%</p></div></div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100"><div className="flex items-center"><div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3 border border-blue-200"><span className="text-blue-600 font-bold text-sm">FB</span></div><div><p className="font-medium text-gray-800">Facebook</p><p className="text-sm text-gray-600">5.8K reach • 280 engagements</p></div></div><div className="text-right"><p className="text-lg font-bold text-gray-700">4.8%</p><p className="text-xs text-green-600">↗ +8%</p></div></div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100"><div className="flex items-center"><div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-3 border border-red-200"><span className="text-red-600 font-bold text-sm">YT</span></div><div><p className="font-medium text-gray-800">YouTube</p><p className="text-sm text-gray-600">2.1K views • 145 subscribers</p></div></div><div className="text-right"><p className="text-lg font-bold text-gray-700">6.9%</p><p className="text-xs text-green-600">↗ +25%</p></div></div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100"><div className="flex items-center"><div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-3 border border-green-200"><span className="text-green-600 font-bold text-sm">WA</span></div><div><p className="font-medium text-gray-800">WhatsApp Business</p><p className="text-sm text-gray-600">89 chats • 67 conversions</p></div></div><div className="text-right"><p className="text-lg font-bold text-gray-700">75.3%</p><p className="text-xs text-green-600">↗ +18%</p></div></div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center"><span className="text-xl mr-2">🎯</span>Content Performance</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100"><div className="flex justify-between items-center mb-2"><p className="font-medium text-gray-800">Behind-the-Scenes Videos</p><span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">Top Content</span></div><div className="grid grid-cols-3 gap-4 text-center"><div><p className="text-lg font-bold text-gray-700">12.5K</p><p className="text-xs text-gray-600">Views</p></div><div><p className="text-lg font-bold text-gray-700">8.2%</p><p className="text-xs text-gray-600">Engagement</p></div><div><p className="text-lg font-bold text-gray-700">45</p><p className="text-xs text-gray-600">Leads</p></div></div></div>
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100"><div className="flex justify-between items-center mb-2"><p className="font-medium text-gray-800">Heritage Stories</p><span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">Viral Potential</span></div><div className="grid grid-cols-3 gap-4 text-center"><div><p className="text-lg font-bold text-gray-700">18.3K</p><p className="text-xs text-gray-600">Shares</p></div><div><p className="text-lg font-bold text-gray-700">12.1%</p><p className="text-xs text-gray-600">Save Rate</p></div><div><p className="text-lg font-bold text-gray-700">78</p><p className="text-xs text-gray-600">Comments</p></div></div></div>
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100"><div className="flex justify-between items-center mb-2"><p className="font-medium text-gray-800">Product Tutorials</p><span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">Educational</span></div><div className="grid grid-cols-3 gap-4 text-center"><div><p className="text-lg font-bold text-gray-700">9.8K</p><p className="text-xs text-gray-600">Views</p></div><div><p className="text-lg font-bold text-gray-700">15.4%</p><p className="text-xs text-gray-600">Completion</p></div><div><p className="text-lg font-bold text-gray-700">32</p><p className="text-xs text-gray-600">Inquiries</p></div></div></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold mb-6 text-gray-800">Marketing Insights & Recommendations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100"><div className="text-2xl mb-2 text-gray-600">📈</div><p className="font-medium text-gray-800 mb-1">Best Time to Post</p><p className="text-sm text-gray-600">7-9 PM weekdays</p></div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100"><div className="text-2xl mb-2 text-gray-600">🔥</div><p className="font-medium text-gray-800 mb-1">Top Hashtags</p><p className="text-sm text-gray-600">#HandmadeInIndia #TraditionalCraft</p></div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100"><div className="text-2xl mb-2 text-gray-600">🎥</div><p className="font-medium text-gray-800 mb-1">Content Type</p><p className="text-sm text-gray-600">Process videos perform best</p></div>
                  </div>
                </div>
              </>
            )}
            {insightsTab === 'recommendations' && (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">AI Recommendations</h2>
                  <p className="text-gray-600 mb-4">Get personalized business advice based on your data and market trends.</p>
                  <div className="flex items-center gap-3">
                    <button
                      disabled={recsLoading}
                      onClick={async () => {
                        try {
                          setRecsError('')
                          setRecsLoading(true)
                          setRecsData(null)
                          const res = await fetch(apiUrl('/api/get-recommendations'), {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              region: 'India',
                              season_hint: 'Festive/Wedding',
                            }),
                          })
                          const data = await res.json()
                          if (!res.ok) throw new Error(data?.error || 'Request failed')
                          setRecsData(data)
                        } catch (e) {
                          setRecsError(e.message || 'Something went wrong')
                        } finally {
                          setRecsLoading(false)
                        }
                      }}
                      className={`px-4 py-2 rounded-lg text-white font-semibold ${recsLoading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}`}
                    >
                      {recsLoading ? 'Fetching…' : 'Get Recommendations'}
                    </button>
                    {recsError && <span className="text-sm text-red-600">{recsError}</span>}
                </div>
                </div>

                {!recsData && !recsLoading && (
                  <div className="p-6 bg-white rounded-lg border border-gray-200 text-gray-600">Click "Get Recommendations" to load AI suggestions.</div>
                )}

                {recsData && (
                  <div className="space-y-8">
                    {[
                      { key: 'sales_demand', title: 'Sales & Demand', icon: '🛍️', color: 'purple' },
                      { key: 'marketing_promotion', title: 'Marketing & Promotion', icon: '📣', color: 'blue' },
                      { key: 'pricing', title: 'Pricing', icon: '💲', color: 'green' },
                      { key: 'inventory', title: 'Inventory', icon: '📦', color: 'orange' },
                    ].map((section) => (
                      <div key={section.key} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                          <span className="text-xl mr-2">{section.icon}</span>
                          {section.title}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {(recsData[section.key] || []).map((r, idx) => (
                            <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                              <div className="flex items-center justify-between mb-2">
                                <p className="font-semibold text-gray-800 text-sm">{r.recommendation}</p>
                                <span className={`text-xs px-2 py-1 rounded ${r.priority === 'High' ? 'bg-red-100 text-red-700' : r.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{r.priority}</span>
                      </div>
                              <p className="text-xs text-gray-600">{r.reason}</p>
                    </div>
                          ))}
                      </div>
                    </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {activeTab === 'community' && (
        <div className="tab-content active">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Community Network</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6 text-center"><div className="text-3xl font-bold text-purple-600">1,247</div><div className="text-gray-600">Fellow Artisans</div></div>
              <div className="bg-white rounded-lg shadow p-6 text-center"><div className="text-3xl font-bold text-blue-600">89</div><div className="text-gray-600">Local NGOs</div></div>
              <div className="bg-white rounded-lg shadow p-6 text-center"><div className="text-3xl font-bold text-green-600">156</div><div className="text-gray-600">Micro Influencers</div></div>
              <div className="bg-white rounded-lg shadow p-6 text-center"><div className="text-3xl font-bold text-orange-600">23</div><div className="text-gray-600">Govt Programs</div></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow p-6" style={{ height: 620 }}>
                  <h2 className="text-xl font-semibold mb-4">Connect With</h2>
                  <div className="space-y-3">
                    {[
                      { id: 'default', icon: '🏠', title: 'My Connections', subtitle: 'View all connections' },
                      { id: 'artisans', icon: '👨‍🎨', title: 'Fellow Artisans', subtitle: 'Learn and collaborate' },
                      { id: 'historians', icon: '📚', title: 'Historians', subtitle: 'Preserve traditions' },
                      { id: 'ngos', icon: '🤝', title: 'NGOs & Organizations', subtitle: 'Get support & funding' },
                      { id: 'influencers', icon: '📱', title: 'Local Influencers', subtitle: 'Expand your reach' },
                      { id: 'government', icon: '🏛️', title: 'Govt Programs', subtitle: 'Access schemes' },
                      { id: 'opportunities', icon: '🌟', title: 'Upcoming Opportunities', subtitle: 'Events & workshops' },
                    ].map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setCommunityCategory(c.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors flex items-center ${
                          communityCategory === c.id ? 'bg-purple-50' : 'hover:bg-purple-50'
                        }`}
                      >
                        <span className="text-2xl mr-3">{c.icon}</span>
                        <div>
                          <p className="font-semibold">{c.title}</p>
                          <p className="text-sm text-gray-600">{c.subtitle}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">{communityData[communityCategory].title}</h2>
                  </div>
                  <div className="space-y-4">
                    {communityData[communityCategory].members.map((m, idx) => (
                      <div key={idx} className="community-member p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-12 h-12 ${m.bgColor} rounded-full flex items-center justify-center text-white font-semibold mr-4`}>{m.avatar}</div>
                            <div>
                              <h3 className="font-semibold">{m.name}</h3>
                              <p className="text-sm text-gray-600">{m.type}</p>
                              <p className={`text-xs ${m.textColor}`}>{m.details}</p>
                            </div>
                          </div>
                          <button className={`${m.buttonColor} text-white px-4 py-2 rounded-lg text-sm transition-colors`}>{m.buttonText}</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'catalogue' && (
        <div className="tab-content active">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Product Catalogue</h1>
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700">+ Add New Product</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: '🧣', title: 'Handwoven Silk Scarf', desc: 'Traditional Banarasi silk scarf with intricate gold thread work. Perfect for special occasions.', price: '₹3,200', badge: { text: 'In Stock', color: 'text-green-600 bg-green-100' }, bg: 'from-purple-100 to-pink-100' },
                { icon: '🏺', title: 'Ceramic Vase Set', desc: 'Hand-painted ceramic vases with traditional motifs. Set of 3 different sizes.', price: '₹1,800', badge: { text: 'In Stock', color: 'text-green-600 bg-green-100' }, bg: 'from-blue-100 to-cyan-100' },
                { icon: '👜', title: 'Leather Handbag', desc: 'Genuine leather handbag with traditional embossed patterns. Handcrafted with care.', price: '₹4,500', badge: { text: 'Low Stock', color: 'text-orange-600 bg-orange-100' }, bg: 'from-orange-100 to-red-100' },
              ].map((p, i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
                  <div className={`h-48 bg-gradient-to-br ${p.bg} flex items-center justify-center`}>
                    <div className="text-6xl">{p.icon}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{p.desc}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-purple-600">{p.price}</span>
                      <span className={`text-sm px-2 py-1 rounded ${p.badge.color}`}>{p.badge.text}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-purple-600 text-white py-2 rounded-lg text-sm hover:bg-purple-700">Edit</button>
                      <button className="flex-1 border border-purple-600 text-purple-600 py-2 rounded-lg text-sm hover:bg-purple-50">View</button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center h-96 card-hover cursor-pointer">
                <div className="text-center">
                  <div className="text-6xl text-gray-400 mb-4">➕</div>
                  <p className="text-gray-600 font-semibold">Add New Product</p>
                  <p className="text-sm text-gray-500">Showcase your latest creation</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center"><span className="text-2xl mr-2">📦</span>Inventory Status</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center"><div className="text-2xl mr-3">⚠️</div><div><p className="font-semibold text-red-800">Low Stock Alert</p><p className="text-sm text-red-600">2 products need restocking</p></div></div>
                    <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">View</button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center"><div className="text-2xl mr-3">✅</div><div><p className="font-semibold text-green-800">Well Stocked</p><p className="text-sm text-green-600">8 products available</p></div></div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center"><div className="text-2xl mr-3">🔄</div><div><p className="font-semibold text-blue-800">Production Queue</p><p className="text-sm text-blue-600">3 custom orders in progress</p></div></div>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">Manage</button>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center"><span className="text-2xl mr-2">📝</span>Recent Orders</h2>
                <div className="space-y-3">
                  {[
                    { icon: '🧣', name: 'Silk Scarf', order: '#1234 • Anita Kumar', price: '₹3,200', status: { text: 'Shipped', color: 'text-blue-600 bg-blue-100' } },
                    { icon: '🏺', name: 'Ceramic Set', order: '#1235 • Rahul Sharma', price: '₹1,800', status: { text: 'Processing', color: 'text-orange-600 bg-orange-100' } },
                    { icon: '👜', name: 'Leather Bag', order: '#1236 • Priya Mehta', price: '₹4,500', status: { text: 'Delivered', color: 'text-green-600 bg-green-100' } },
                  ].map((o, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center"><div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">{o.icon}</div><div><p className="font-semibold text-sm">{o.name}</p><p className="text-xs text-gray-600">Order {o.order}</p></div></div>
                      <div className="text-right"><p className="text-sm font-semibold text-green-600">{o.price}</p><span className={`text-xs px-2 py-1 rounded ${o.status.color}`}>{o.status.text}</span></div>
                    </div>
                  ))}
                </div>
                <div className="mt-4"><button className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm hover:bg-purple-700">View All Orders</button></div>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center"><span className="text-2xl mr-2">⭐</span>Recent Customer Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4"><div className="flex items-center mb-3"><div className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div><span className="ml-2 text-sm text-gray-600">5.0</span></div><p className="text-sm text-gray-700 mb-2">"Beautiful handwoven scarf! The quality is exceptional and the colors are exactly as shown."</p><p className="text-xs text-gray-500">- Kavita Patel • Silk Scarf</p></div>
                <div className="border border-gray-200 rounded-lg p-4"><div className="flex items-center mb-3"><div className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div><span className="ml-2 text-sm text-gray-600">4.8</span></div><p className="text-sm text-gray-700 mb-2">"Amazing craftsmanship! The ceramic vases are perfect for my home décor. Will order again."</p><p className="text-xs text-gray-500">- Arjun Singh • Ceramic Vase Set</p></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ai-agent' && (
        <div className="tab-content active">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">AI Marketing Agent</h1>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl mr-4">🤖</div>
                  <div>
                    <h2 className="text-xl font-semibold">Your AI Marketing Assistant</h2>
                    <p className="text-gray-600">Actively managing your digital presence</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="ai-agent-status w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-semibold">Active</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center"><span className="text-2xl mr-2">⚡</span>Current Activities</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2"><h3 className="font-semibold text-blue-800">Social Media Posts</h3><span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">In Progress</span></div>
                    <p className="text-sm text-blue-700">Creating Instagram posts for your new silk scarf collection</p>
                    <div className="mt-2 bg-blue-200 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div></div>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2"><h3 className="font-semibold text-green-800">SEO Optimization</h3><span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Completed</span></div>
                    <p className="text-sm text-green-700">Updated product descriptions with trending keywords</p>
                  </div>
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2"><h3 className="font-semibold text-orange-800">Email Campaign</h3><span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">Scheduled</span></div>
                    <p className="text-sm text-orange-700">Newsletter about traditional weaving techniques - sends tomorrow</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center"><span className="text-2xl mr-2">📊</span>AI Performance</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"><div><p className="font-semibold">Social Media Reach</p><p className="text-sm text-gray-600">This week</p></div><div className="text-right"><p className="text-xl font-bold text-purple-600">12.4K</p><p className="text-xs text-green-500">↗ +23%</p></div></div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"><div><p className="font-semibold">Website Traffic</p><p className="text-sm text-gray-600">From AI campaigns</p></div><div className="text-right"><p className="text-xl font-bold text-blue-600">3.2K</p><p className="text-xs text-green-500">↗ +18%</p></div></div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"><div><p className="font-semibold">Conversion Rate</p><p className="text-sm text-gray-600">AI-driven leads</p></div><div className="text-right"><p className="text-xl font-bold text-green-600">8.7%</p><p className="text-xs text-green-500">↗ +12%</p></div></div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center"><span className="text-2xl mr-2">⚙️</span>AI Agent Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-3">Marketing Channels</h3>
                  <div className="space-y-3">
                    <label className="flex items-center"><input type="checkbox" defaultChecked className="mr-3" /><span>Instagram Marketing</span></label>
                    <label className="flex items-center"><input type="checkbox" defaultChecked className="mr-3" /><span>Facebook Campaigns</span></label>
                    <label className="flex items-center"><input type="checkbox" className="mr-3" /><span>Google Ads</span></label>
                    <label className="flex items-center"><input type="checkbox" defaultChecked className="mr-3" /><span>Email Marketing</span></label>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Automation Level</h3>
                  <div className="space-y-3">
                    <label className="flex items-center"><input type="radio" name="automation" defaultChecked className="mr-3" /><span>Semi-Autonomous (Recommended)</span></label>
                    <label className="flex items-center"><input type="radio" name="automation" className="mr-3" /><span>Full Automation</span></label>
                    <label className="flex items-center"><input type="radio" name="automation" className="mr-3" /><span>Manual Approval Required</span></label>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Monthly Budget</h3>
                    <p className="text-sm text-gray-600">AI will optimize spending within this limit</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input type="range" min="1000" max="10000" defaultValue="3000" className="w-32" />
                    <span className="font-semibold text-purple-600">₹3,000</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex space-x-4">
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">Save Settings</button>
                <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50">Reset to Default</button>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center"><span className="text-2xl mr-2">📝</span>Recent AI Actions</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div className="flex items-center"><div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-3">📱</div><div><p className="font-semibold text-sm">Posted on Instagram</p><p className="text-xs text-gray-600">2 hours ago</p></div></div><span className="text-xs text-blue-600">+47 likes, +12 comments</span></div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div className="flex items-center"><div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mr-3">🔍</div><div><p className="font-semibold text-sm">Updated SEO keywords</p><p className="text-xs text-gray-600">5 hours ago</p></div></div><span className="text-xs text-green-600">Search ranking improved</span></div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div className="flex items-center"><div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm mr-3">📧</div><div><p className="font-semibold text-sm">Sent newsletter</p><p className="text-xs text-gray-600">1 day ago</p></div></div><span className="text-xs text-purple-600">23% open rate</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
