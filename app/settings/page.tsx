import { Shield, Bell, Eye, Trash2, ChevronRight } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#080810] text-white">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-light tracking-wide mb-2">Settings</h1>
        <p className="text-zinc-600 text-sm mb-10">Manage your anonymous space.</p>

        {/* Account */}
        <div className="mb-8">
          <p className="text-zinc-600 text-xs tracking-widest uppercase mb-4">Account</p>
          <div className="bg-[#0e0e1a] border border-[#1a1a2e] rounded-2xl overflow-hidden">
            {[
              { label: 'Change username', sub: 'Update your anonymous ID' },
              { label: 'Change password', sub: 'Keep your space secure' },
            ].map((item, i) => (
              <button key={i} className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#121220] transition-colors border-b border-[#1a1a2e] last:border-0">
                <div className="text-left">
                  <p className="text-zinc-300 text-sm">{item.label}</p>
                  <p className="text-zinc-600 text-xs mt-0.5">{item.sub}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-600" />
              </button>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="mb-8">
          <p className="text-zinc-600 text-xs tracking-widest uppercase mb-4">Preferences</p>
          <div className="bg-[#0e0e1a] border border-[#1a1a2e] rounded-2xl overflow-hidden">
            {[
              { icon: Eye, label: 'Dark mode', sub: 'Always on', toggle: true, value: true },
              { icon: Bell, label: 'Email notifications', sub: 'When someone reacts', toggle: true, value: false },
              { icon: Eye, label: 'Show read count on my stories', sub: 'Others can see views', toggle: true, value: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-4 border-b border-[#1a1a2e] last:border-0">
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-zinc-600" />
                  <div>
                    <p className="text-zinc-300 text-sm">{item.label}</p>
                    <p className="text-zinc-600 text-xs mt-0.5">{item.sub}</p>
                  </div>
                </div>
                <div className={`w-9 h-5 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${item.value ? 'bg-purple-600 justify-end' : 'bg-zinc-800 justify-start'}`}>
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="mb-8">
          <p className="text-zinc-600 text-xs tracking-widest uppercase mb-4">Privacy</p>
          <div className="bg-[#0e0e1a] border border-[#1a1a2e] rounded-2xl overflow-hidden">
            {[
              { icon: Shield, label: 'Anonymous by default', sub: 'All posts are anonymous', value: true },
              { icon: Eye, label: 'Hide activity status', sub: 'Others cannot see when you are active', value: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-4 border-b border-[#1a1a2e] last:border-0">
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-zinc-600" />
                  <div>
                    <p className="text-zinc-300 text-sm">{item.label}</p>
                    <p className="text-zinc-600 text-xs mt-0.5">{item.sub}</p>
                  </div>
                </div>
                <div className={`w-9 h-5 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${item.value ? 'bg-purple-600 justify-end' : 'bg-zinc-800 justify-start'}`}>
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div>
          <p className="text-red-900 text-xs tracking-widest uppercase mb-4">Danger Zone</p>
          <div className="bg-[#0e0e1a] border border-red-950/40 rounded-2xl overflow-hidden">
            <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-red-950/20 transition-colors">
              <div className="flex items-center gap-3">
                <Trash2 className="w-4 h-4 text-red-700" />
                <div className="text-left">
                  <p className="text-red-400 text-sm">Delete account</p>
                  <p className="text-zinc-600 text-xs mt-0.5">Permanently remove your space and all posts</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-600" />
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}