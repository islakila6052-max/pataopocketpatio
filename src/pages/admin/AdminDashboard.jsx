import { useState, useEffect, useCallback } from 'react';
import {
  Calendar,
  Mail,
  MessageSquare,
  Users,
  LogOut,
  RefreshCw,
  Loader2,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Phone,
  User,
  CalendarDays,
  MessageCircle,
  Inbox,
  Copy,
  Check,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const TABS = [
  { key: 'bookings', label: 'Bookings', icon: Calendar },
  { key: 'messages', label: 'Messages', icon: MessageSquare },
  { key: 'newsletter', label: 'Subscribers', icon: Mail },
];

const STATUS = {
  pending: { icon: Clock, label: 'Pending', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
  confirmed: { icon: CheckCircle, label: 'Confirmed', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  cancelled: { icon: XCircle, label: 'Cancelled', bg: 'bg-red-50 text-red-700 border-red-200' },
  completed: { icon: CheckCircle, label: 'Completed', bg: 'bg-blue-50 text-blue-700 border-blue-200' },
};

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

const formatShort = (d) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(null);

  const copyEmail = (email) => {
    navigator.clipboard.writeText(email);
    setCopied(email);
    setTimeout(() => setCopied(null), 2000);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'bookings') {
        const { data } = await supabase.from('booking_inquiries').select('*').order('created_at', { ascending: false });
        setBookings(data || []);
      } else if (activeTab === 'messages') {
        const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
        setMessages(data || []);
      } else if (activeTab === 'newsletter') {
        const { data } = await supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false });
        setSubscribers(data || []);
      }
    } catch (_) {}
    setLoading(false);
    setSearch('');
  }, [activeTab]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const updateBookingStatus = async (id, status) => {
    await supabase.from('booking_inquiries').update({ status }).eq('id', id);
    fetchData();
  };

  const counts = { bookings: bookings.length, messages: messages.length, newsletter: subscribers.length };
  const currentCount = counts[activeTab] || 0;

  const filteredBookings = search ? bookings.filter((b) => (b.full_name || '').toLowerCase().includes(search.toLowerCase()) || (b.email || '').toLowerCase().includes(search.toLowerCase())) : bookings;
  const filteredMessages = search ? messages.filter((m) => (m.name || '').toLowerCase().includes(search.toLowerCase()) || (m.message || '').toLowerCase().includes(search.toLowerCase())) : messages;
  const filteredSubscribers = search ? subscribers.filter((s) => (s.email || '').toLowerCase().includes(search.toLowerCase())) : subscribers;

  return (
    <div className="min-h-screen bg-[#f6f9f6]">
      <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <h1 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary-100 flex items-center justify-center">
            <Calendar size={18} strokeWidth={1.8} className="text-primary-700" />
          </div>
          <span className="hidden sm:inline">Admin</span> Dashboard
        </h1>
        <div className="flex items-center gap-2">
          <button onClick={fetchData} className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 active:scale-95 transition-all cursor-pointer border-none">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button onClick={onLogout} className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-600 active:scale-95 transition-all cursor-pointer border-none">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <div className="px-4 sm:px-6 pt-4 pb-2 grid grid-cols-3 gap-2 sm:gap-3">
        {TABS.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex flex-col items-center gap-1 py-3 px-2 rounded-2xl border transition-all active:scale-95 cursor-pointer text-center ${activeTab === tab.key ? 'bg-white border-primary-200 shadow-sm' : 'bg-transparent border-transparent hover:bg-white/50'}`}>
            <tab.icon size={20} strokeWidth={1.8} className={activeTab === tab.key ? 'text-primary-700' : 'text-gray-400'} />
            <span className={`text-xs font-medium ${activeTab === tab.key ? 'text-gray-900' : 'text-gray-500'}`}>{tab.label}</span>
            <span className={`text-lg font-bold ${activeTab === tab.key ? 'text-primary-700' : 'text-gray-400'}`}>{counts[tab.key]}</span>
          </button>
        ))}
      </div>

      <main className="px-4 sm:px-6 pb-10 max-w-3xl mx-auto">
        {currentCount > 3 && (
          <div className="relative mb-4 mt-2">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder={`Search ${activeTab}...`} value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition" />
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 size={28} className="animate-spin text-primary-400" /></div>
        ) : (
          <>
            {activeTab === 'bookings' && (
              <div className="space-y-3">
                {filteredBookings.length === 0 ? (
                  <EmptyState icon={Calendar} text="No bookings yet" sub="When visitors book a visit, they'll appear here." />
                ) : (
                  filteredBookings.map((b) => {
                    const s = STATUS[b.status] || STATUS.pending;
                    const Icon = s.icon;
                    return (
                      <div key={b.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${s.bg}`}><Icon size={12} />{s.label}</span>
                          <span className="text-xs text-gray-400">{formatDate(b.created_at)}</span>
                        </div>
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0"><User size={18} className="text-primary-600" strokeWidth={1.8} /></div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{b.full_name}</h3>
                            <button onClick={() => copyEmail(b.email)} className="text-xs text-gray-500 mt-0.5 flex items-center gap-1 hover:text-primary-600 transition-colors cursor-pointer bg-transparent border-none">
                              {b.email}
                              {copied === b.email ? <Check size={12} className="text-emerald-500" /> : <Copy size={11} className="opacity-40" />}
                            </button>
                            {b.phone && <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1"><Phone size={10} />{b.phone}</p>}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {b.preferred_date && <span className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2.5 py-1 rounded-lg"><CalendarDays size={12} />{b.preferred_date}</span>}
                          <span className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2.5 py-1 rounded-lg"><Users size={12} />{b.guests || 1} guest{b.guests !== 1 ? 's' : ''}</span>
                        </div>
                        {b.notes && <p className="text-xs text-gray-600 bg-gray-50 rounded-xl p-3 mb-3 italic leading-relaxed">"{b.notes}"</p>}
                        <div className="flex gap-2 pt-1 border-t border-gray-50">
                          {b.status === 'pending' && (
                            <>
                              <button onClick={() => updateBookingStatus(b.id, 'confirmed')} className="flex-1 py-2 text-xs font-semibold bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 active:scale-95 transition-all cursor-pointer border-none">✓ Confirm</button>
                              <button onClick={() => updateBookingStatus(b.id, 'cancelled')} className="flex-1 py-2 text-xs font-semibold bg-red-50 text-red-600 rounded-xl hover:bg-red-100 active:scale-95 transition-all cursor-pointer border-none">✕ Cancel</button>
                            </>
                          )}
                          {b.status === 'confirmed' && (
                            <button onClick={() => updateBookingStatus(b.id, 'completed')} className="w-full py-2 text-xs font-semibold bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 active:scale-95 transition-all cursor-pointer border-none">✓ Mark Completed</button>
                          )}
                          {(b.status === 'completed' || b.status === 'cancelled') && (
                            <span className="w-full py-2 text-xs text-center text-gray-400 italic">{b.status === 'completed' ? 'Visit completed' : 'Booking cancelled'}</span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="space-y-3">
                {filteredMessages.length === 0 ? (
                  <EmptyState icon={MessageCircle} text="No messages yet" sub="Contact form submissions will appear here." />
                ) : (
                  filteredMessages.map((m) => (
                    <div key={m.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                          <User size={18} className="text-primary-600" strokeWidth={1.8} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{m.name}</h3>
                            <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{formatShort(m.created_at)}</span>
                          </div>
                          <button onClick={() => copyEmail(m.email)} className="text-xs text-gray-500 flex items-center gap-1 hover:text-primary-600 transition-colors cursor-pointer bg-transparent border-none">
                            {m.email}
                            {copied === m.email ? <Check size={12} className="text-emerald-500" /> : <Copy size={11} className="opacity-40" />}
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3 leading-relaxed">
                        {m.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'newsletter' && (
              <div>
                {filteredSubscribers.length === 0 ? (
                  <EmptyState icon={Inbox} text="No subscribers yet" sub="Newsletter signups will appear here." />
                ) : (
                  <>
                    <p className="text-xs text-gray-400 mb-3 flex items-center gap-1.5"><Users size={13} />{filteredSubscribers.length} subscriber{filteredSubscribers.length !== 1 ? 's' : ''}</p>
                    <div className="grid gap-2">
                      {filteredSubscribers.map((s) => (
                        <div key={s.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 flex items-center justify-between">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center text-primary-700 font-semibold text-xs flex-shrink-0">{s.email.charAt(0).toUpperCase()}</div>
                            <span className="text-sm text-gray-900 font-medium truncate">{s.email}</span>
                          </div>
                          <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{formatShort(s.created_at)}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function EmptyState({ icon: Icon, text, sub }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        <Icon size={28} className="text-gray-300" strokeWidth={1.5} />
      </div>
      <p className="text-gray-500 font-medium text-sm">{text}</p>
      <p className="text-gray-400 text-xs mt-1 max-w-[240px]">{sub}</p>
    </div>
  );
}
