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
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const TABS = [
  { key: 'bookings', label: 'Bookings', icon: Calendar },
  { key: 'messages', label: 'Messages', icon: MessageSquare },
  { key: 'newsletter', label: 'Newsletter', icon: Mail },
];

const STATUS_ICONS = {
  pending: { icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
  confirmed: { icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  cancelled: { icon: XCircle, color: 'text-red-600 bg-red-50' },
  completed: { icon: CheckCircle, color: 'text-blue-600 bg-blue-50' },
};

/**
 * Admin dashboard — displays bookings, contact messages, and newsletter subscribers
 * from Supabase. Refreshes data on tab switch.
 */
export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'bookings') {
        const { data } = await supabase
          .from('booking_inquiries')
          .select('*')
          .order('created_at', { ascending: false });
        setBookings(data || []);
      } else if (activeTab === 'messages') {
        const { data } = await supabase
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false });
        setMessages(data || []);
      } else if (activeTab === 'newsletter') {
        const { data } = await supabase
          .from('newsletter_subscribers')
          .select('*')
          .order('created_at', { ascending: false });
        setSubscribers(data || []);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
    setLoading(false);
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateBookingStatus = async (id, status) => {
    await supabase.from('booking_inquiries').update({ status }).eq('id', id);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-primary-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <h1 className="text-lg font-semibold text-primary-900 flex items-center gap-2">
          <Calendar size={22} strokeWidth={1.8} className="text-primary-600" />
          Admin Dashboard
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 hover:bg-primary-100 transition-colors cursor-pointer border-none"
            title="Refresh"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-sm text-primary-600 hover:text-red-600 transition-colors cursor-pointer bg-transparent border-none font-medium"
          >
            <LogOut size={16} />
            Exit
          </button>
        </div>
      </header>

      {/* Tabs */}
      <nav className="bg-white border-b border-primary-100 px-6 flex gap-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer bg-transparent ${
              activeTab === tab.key
                ? 'border-primary-700 text-primary-900'
                : 'border-transparent text-primary-500 hover:text-primary-700'
            }`}
          >
            <tab.icon size={16} strokeWidth={1.8} />
            {tab.label}
            {tab.key === 'bookings' && bookings.length > 0 && (
              <span className="ml-1 bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded-full">
                {bookings.length}
              </span>
            )}
            {tab.key === 'messages' && messages.length > 0 && (
              <span className="ml-1 bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded-full">
                {messages.length}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="p-6 max-w-5xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-primary-500" />
          </div>
        ) : (
          <>
            {/* === BOOKINGS === */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <p className="text-center text-primary-500 py-12">No booking inquiries yet.</p>
                ) : (
                  bookings.map((b) => {
                    const StatusIcon = STATUS_ICONS[b.status]?.icon || Clock;
                    const statusColor = STATUS_ICONS[b.status]?.color || 'text-gray-600 bg-gray-50';
                    return (
                      <div key={b.id} className="bg-white rounded-3xl p-5 shadow-sm border border-primary-100">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                                <StatusIcon size={12} />
                                {b.status}
                              </span>
                              <span className="text-xs text-primary-400">
                                {new Date(b.created_at).toLocaleDateString('en-US', {
                                  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                                })}
                              </span>
                            </div>
                            <h3 className="font-semibold text-primary-900">{b.full_name}</h3>
                            <p className="text-sm text-primary-600 mt-1">
                              {b.email} {b.phone && `· ${b.phone}`}
                            </p>
                            <div className="flex gap-4 mt-2 text-xs text-primary-500">
                              {b.preferred_date && <span>📅 {b.preferred_date}</span>}
                              {b.guests > 1 && <span>👥 {b.guests} guests</span>}
                            </div>
                            {b.notes && (
                              <p className="mt-2 text-sm text-primary-700 bg-primary-50 rounded-2xl p-3 italic">
                                "{b.notes}"
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            {b.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => updateBookingStatus(b.id, 'confirmed')}
                                  className="px-3 py-1.5 text-xs font-medium bg-green-50 text-green-700 rounded-full hover:bg-green-100 transition-colors cursor-pointer border-none"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => updateBookingStatus(b.id, 'cancelled')}
                                  className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-700 rounded-full hover:bg-red-100 transition-colors cursor-pointer border-none"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            {b.status === 'confirmed' && (
                              <button
                                onClick={() => updateBookingStatus(b.id, 'completed')}
                                className="px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors cursor-pointer border-none"
                              >
                                Complete
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* === MESSAGES === */}
            {activeTab === 'messages' && (
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <p className="text-center text-primary-500 py-12">No messages yet.</p>
                ) : (
                  messages.map((m) => (
                    <div key={m.id} className="bg-white rounded-3xl p-5 shadow-sm border border-primary-100">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-primary-900">{m.name}</h3>
                          <p className="text-sm text-primary-500">{m.email}</p>
                        </div>
                        <span className="text-xs text-primary-400">
                          {new Date(m.created_at).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-primary-700 bg-primary-50 rounded-2xl p-4 mt-2 leading-relaxed">
                        {m.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* === NEWSLETTER === */}
            {activeTab === 'newsletter' && (
              <div>
                {subscribers.length === 0 ? (
                  <p className="text-center text-primary-500 py-12">No subscribers yet.</p>
                ) : (
                  <>
                    <p className="text-sm text-primary-500 mb-4">
                      <Users size={14} className="inline mr-1" />
                      {subscribers.length} subscriber{subscribers.length !== 1 ? 's' : ''}
                    </p>
                    <div className="grid gap-3">
                      {subscribers.map((s) => (
                        <div key={s.id} className="bg-white rounded-3xl p-4 shadow-sm border border-primary-100 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-xs">
                              {s.email.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm text-primary-900 font-medium">{s.email}</span>
                          </div>
                          <span className="text-xs text-primary-400">
                            {new Date(s.created_at).toLocaleDateString('en-US', {
                              month: 'short', day: 'numeric',
                            })}
                          </span>
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
