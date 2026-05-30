'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronDown,
  UserCircle2,
  BookOpen,
  Heart,
  Bookmark,
  FileText,
  Eye,
  MoreHorizontal,
  Quote,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Profile {
  id: string;
  anon_id: string;
  bio: string | null;
  tagline: string | null;
  created_at: string;
}

interface StoryItem {
  id: string;
  content: string;
  title?: string | null;
  created_at: string;
  views: number;
}

type TabType = 'stories' | 'liked' | 'bookmarks' | 'drafts';

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [soulsCount, setSoulsCount] = useState(134);
  const [stats, setStats] = useState({ stories: 0, likesReceived: 0, bookmarks: 0 });
  const [activeTab, setActiveTab] = useState<TabType>('stories');
  const [myStories, setMyStories] = useState<StoryItem[]>([]);
  const [likedStories, setLikedStories] = useState<StoryItem[]>([]);
  const [bookmarkedStories, setBookmarkedStories] = useState<StoryItem[]>([]);
  const [drafts, setDrafts] = useState<StoryItem[]>([]);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState('');
  const [isEditingTagline, setIsEditingTagline] = useState(false);
  const [taglineInput, setTaglineInput] = useState('');

  const bioRef = useRef<HTMLTextAreaElement>(null);
  const taglineRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSoulsCount(Math.floor(Math.random() * 50) + 100);
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) { router.push('/'); return; }

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id, anon_id, bio, tagline, created_at')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('Profile error:', profileError.message);
          // Agar profile nahi mili to bana do
          if (profileError.code === 'PGRST116') {
            const newAnonId = 'VOID-' + Math.floor(Math.random() * 900 + 100) + 'XK'
            const { data: newProfile } = await supabase
              .from('profiles')
              .insert([{ id: user.id, anon_id: newAnonId }])
              .select('id, anon_id, bio, tagline, created_at')
              .single()
            if (newProfile) {
              setProfile(newProfile as Profile)
              setBioInput('')
              setTaglineInput('')
            }
          }
          setLoading(false)
          return
        }

        if (!profileData) { setLoading(false); return; }

        setProfile(profileData as Profile);
        setBioInput(profileData.bio || '');
        setTaglineInput(profileData.tagline || '');

        await Promise.all([
          fetchStats(user.id, profileData.anon_id),
          fetchMyStories(profileData.anon_id),
          fetchBookmarks(user.id),
        ]);

      } catch (err) {
        console.error('Init error:', err);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [router]);

  const fetchStats = async (uid: string, anonId: string) => {
    try {
      const { count: storiesCount } = await supabase
        .from('posts').select('*', { count: 'exact', head: true }).eq('anon_id', anonId);

      const { data: userPosts } = await supabase
        .from('posts').select('id').eq('anon_id', anonId);

      const postIds = userPosts?.map((p: { id: string }) => p.id) || [];
      let likesCount = 0;
      if (postIds.length > 0) {
        const { count } = await supabase
          .from('reactions').select('*', { count: 'exact', head: true }).in('post_id', postIds);
        likesCount = count || 0;
      }

      const { count: bookmarksCount } = await supabase
        .from('bookmarks').select('*', { count: 'exact', head: true }).eq('user_id', uid);

      setStats({ stories: storiesCount || 0, likesReceived: likesCount, bookmarks: bookmarksCount || 0 });
    } catch (err) { console.error('Stats error:', err); }
  };

  const fetchMyStories = async (anonId: string) => {
    const { data } = await supabase
      .from('posts').select('id, content, title, created_at, views')
      .eq('anon_id', anonId).order('created_at', { ascending: false });
    setMyStories((data as StoryItem[]) || []);
  };

  const fetchBookmarks = async (uid: string) => {
    const { data } = await supabase
      .from('bookmarks').select('post_id').eq('user_id', uid).order('created_at', { ascending: false });
    if (!data || data.length === 0) { setBookmarkedStories([]); return; }
    const postIds = data.map((b: { post_id: string }) => b.post_id);
    const { data: posts } = await supabase
      .from('posts').select('id, content, title, created_at, views').in('id', postIds);
    setBookmarkedStories((posts as StoryItem[]) || []);
  };

  const saveBio = useCallback(async () => {
    if (!profile) return;
    const wordCount = bioInput.trim().split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount > 60) { alert('Bio must be 60 words or less'); return; }
    const { error } = await supabase.from('profiles').update({ bio: bioInput.trim() || null }).eq('id', profile.id);
    if (!error) setProfile(prev => prev ? { ...prev, bio: bioInput.trim() || null } : null);
    setIsEditingBio(false);
  }, [bioInput, profile]);

  const saveTagline = useCallback(async () => {
    if (!profile) return;
    if (taglineInput.length > 100) { alert('Tagline must be 100 characters or less'); return; }
    const { error } = await supabase.from('profiles').update({ tagline: taglineInput.trim() || null }).eq('id', profile.id);
    if (!error) setProfile(prev => prev ? { ...prev, tagline: taglineInput.trim() || null } : null);
    setIsEditingTagline(false);
  }, [taglineInput, profile]);

  const formatRelativeDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDay = Math.floor((now.getTime() - date.getTime()) / 86400000);
    const diffWeek = Math.floor(diffDay / 7);
    if (diffDay < 1) return 'Today';
    if (diffDay === 1) return '1 day ago';
    if (diffDay < 7) return `${diffDay} days ago`;
    if (diffWeek === 1) return '1 week ago';
    if (diffWeek < 4) return `${diffWeek} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatMemberSince = (dateString: string): string =>
    `Member since ${new Date(dateString).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;

  useEffect(() => { if (isEditingBio && bioRef.current) bioRef.current.focus(); }, [isEditingBio]);
  useEffect(() => { if (isEditingTagline && taglineRef.current) taglineRef.current.focus(); }, [isEditingTagline]);

  const getStoryDisplay = (story: StoryItem, isDraftTab: boolean): string => {
    if (story.title) return story.title;
    if (isDraftTab) return 'Untitled Draft';
    return story.content.slice(0, 60) + (story.content.length > 60 ? '...' : '');
  };

  const formatViews = (views: number): string => {
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return String(views || 0);
  };

  const renderEmptyState = (icon: React.ReactNode, title: string, subtitle: string) => (
    <div className="py-16 flex flex-col items-center justify-center gap-3">
      {icon}
      <p className="text-[#94A3B8] text-sm">{title}</p>
      <p className="text-[#475569] text-xs">{subtitle}</p>
    </div>
  );

  const renderStoryList = (stories: StoryItem[], emptyTitle: string, emptySubtitle: string, emptyIcon: React.ReactNode, isDraftTab = false) => {
    if (stories.length === 0) return renderEmptyState(emptyIcon, emptyTitle, emptySubtitle);
    return (
      <div className="flex flex-col">
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => router.push(`/post/${story.id}`)}
            className="flex items-center justify-between py-4 border-b border-[#2D2D42] transition-colors hover:bg-[rgba(124,58,237,0.04)] px-2 -mx-2 rounded-lg cursor-pointer"
          >
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-[rgba(124,58,237,0.1)] flex items-center justify-center flex-shrink-0">
                <FileText size={20} color="#7C3AED" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white text-[15px] font-medium truncate">{getStoryDisplay(story, isDraftTab)}</span>
                <span className="text-[#475569] text-xs mt-0.5">{formatRelativeDate(story.created_at)}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0 ml-4">
              <div className="flex items-center gap-1.5">
                <Eye size={16} color="#7C3AED" />
                <span className="text-white text-sm font-medium">{formatViews(story.views)}</span>
                <span className="text-[#94A3B8] text-xs">people</span>
              </div>
              <button
                onClick={e => e.stopPropagation()}
                className="p-1 hover:bg-[rgba(255,255,255,0.05)] rounded transition-colors"
              >
                <MoreHorizontal size={18} color="#94A3B8" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D14] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0D0D14] flex flex-col items-center justify-center gap-4">
        <p className="text-[#94A3B8] text-sm">Could not load your profile.</p>
        <button
          onClick={() => router.push('/')}
          className="text-[#7C3AED] text-sm hover:underline"
        >
          Go back home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D14] relative">

      {/* Background — FIXED path */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/backgrounds/background.jpeg)', opacity: 0.15 }}
      />
      <div className="fixed inset-0" style={{ background: 'rgba(13,13,20,0.92)' }} />

      {/* Top Bar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-end px-6 py-4"
        style={{ background: 'rgba(13,13,20,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(45,45,66,0.5)' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs text-[#94A3B8]">{soulsCount} souls active</span>
          </div>
          <div className="h-4 w-px bg-[#2D2D42]" />
          <div className="flex items-center gap-2 cursor-default">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#1a1a2e] flex items-center justify-center">
              <UserCircle2 size={16} color="#C4B5FD" />
            </div>
            <span className="font-mono text-sm text-[#C4B5FD]">{profile.anon_id}</span>
            <ChevronDown size={14} color="#C4B5FD" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-20 pb-12 px-4">
        <div
          className="max-w-[1100px] mx-auto rounded-2xl overflow-hidden"
          style={{ background: '#0f0f1a', border: '1px solid #2D2D42' }}
        >
          <div className="p-8">

            {/* USER HEADER */}
            <div className="flex flex-col lg:flex-row gap-8 mb-10">

              {/* Left: Avatar + Info */}
              <div className="flex items-start gap-6 flex-1">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #2D2D42 0%, #1a1a2e 100%)', border: '2px solid rgba(124,58,237,0.3)' }}
                >
                  <UserCircle2 size={48} color="#475569" />
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <h1 className="text-white text-2xl font-bold">{profile.anon_id}</h1>
                  <p className="text-[#7C3AED] text-[13px]">{formatMemberSince(profile.created_at)}</p>

                  {/* Bio — editable */}
                  <div className="mt-1">
                    {isEditingBio ? (
                      <>
                        <textarea
                          ref={bioRef}
                          value={bioInput}
                          onChange={e => setBioInput(e.target.value)}
                          onBlur={saveBio}
                          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveBio(); } }}
                          className="w-full bg-[#1a1a2e] border border-[#2D2D42] rounded-lg px-3 py-2 text-[#E2E8F0] text-sm resize-none focus:outline-none focus:border-[#7C3AED] transition-colors"
                          rows={2}
                          placeholder="Write something about yourself..."
                        />
                        <p className="text-[#475569] text-xs mt-1">
                          {bioInput.trim().split(/\s+/).filter(w => w.length > 0).length}/60 words
                        </p>
                      </>
                    ) : (
                      <p
                        onClick={() => setIsEditingBio(true)}
                        className="text-[#E2E8F0] text-sm cursor-text hover:text-white transition-colors"
                        title="Click to edit bio"
                      >
                        {profile.bio || (
                          <span className="text-[#475569] italic">Click to add a bio...</span>
                        )}
                      </p>
                    )}
                  </div>

                  {/* Tagline — editable */}
                  <div className="flex items-start gap-2 mt-1">
                    <Quote size={14} color="#7C3AED" className="mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      {isEditingTagline ? (
                        <>
                          <input
                            ref={taglineRef}
                            type="text"
                            value={taglineInput}
                            onChange={e => setTaglineInput(e.target.value)}
                            onBlur={saveTagline}
                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); saveTagline(); } }}
                            className="w-full bg-[#1a1a2e] border border-[#2D2D42] rounded-lg px-3 py-1.5 text-[#94A3B8] text-[13px] italic focus:outline-none focus:border-[#7C3AED] transition-colors"
                            maxLength={100}
                            placeholder="Add a tagline..."
                          />
                          <p className="text-[#475569] text-xs mt-1">{taglineInput.length}/100</p>
                        </>
                      ) : (
                        <p
                          onClick={() => setIsEditingTagline(true)}
                          className="text-[#94A3B8] text-[13px] italic cursor-text hover:text-[#C4B5FD] transition-colors"
                          title="Click to edit tagline"
                        >
                          {profile.tagline || (
                            <span className="text-[#475569]">Click to add a tagline...</span>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Stats */}
              <div className="flex gap-4 flex-shrink-0">
                {[
                  { icon: BookOpen, count: stats.stories, label: 'Stories' },
                  { icon: Heart, count: stats.likesReceived, label: 'Likes Received' },
                  { icon: Bookmark, count: stats.bookmarks, label: 'Bookmarks' },
                ].map(({ icon: Icon, count, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center px-5 py-4 rounded-xl min-w-[100px]"
                    style={{ background: '#13131E', border: '1px solid #2D2D42' }}
                  >
                    <Icon size={24} color="#7C3AED" strokeWidth={1.5} />
                    <span className="text-white text-[28px] font-bold mt-2 leading-none">{count}</span>
                    <span className="text-[#94A3B8] text-[11px] mt-1.5 text-center">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TABS */}
            <div className="flex items-center gap-8 border-b border-[#2D2D42] mb-6">
              {([
                { key: 'stories' as TabType, label: 'My Stories' },
                { key: 'liked' as TabType, label: 'Liked' },
                { key: 'bookmarks' as TabType, label: 'Bookmarks' },
                { key: 'drafts' as TabType, label: 'Drafts' },
              ]).map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)} className="pb-3 relative transition-colors">
                  <span className={activeTab === tab.key ? 'text-white font-semibold' : 'text-[#94A3B8]'}>
                    {tab.label}
                  </span>
                  {activeTab === tab.key && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7C3AED]" />}
                </button>
              ))}
            </div>

            {/* TAB CONTENT */}
            <div className="min-h-[300px]">
              {activeTab === 'stories' && renderStoryList(
                myStories, 'No whispers yet.', 'Your thoughts are waiting to be written.',
                <FileText size={32} color="#2D2D42" />
              )}
              {activeTab === 'liked' && renderStoryList(
                likedStories, 'Nothing resonated yet.', 'Read the feed and react to stories.',
                <Heart size={32} color="#2D2D42" />
              )}
              {activeTab === 'bookmarks' && renderStoryList(
                bookmarkedStories, 'Nothing saved yet.', 'Bookmark stories that move you.',
                <Bookmark size={32} color="#2D2D42" />
              )}
              {activeTab === 'drafts' && renderStoryList(
                drafts, 'No drafts yet.', 'Start writing and save as draft.',
                <FileText size={32} color="#2D2D42" />, true
              )}
            </div>

            {/* FOOTER */}
            <div className="mt-10 pt-6 border-t border-[#2D2D42] flex items-center justify-between">
              <div className="flex items-start gap-2">
                <Quote size={16} color="#7C3AED" className="mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[#94A3B8] text-sm italic">This is your space.</span>
                  <span className="text-[#94A3B8] text-sm italic">No identity.</span>
                  <span className="text-[#94A3B8] text-sm italic">Only honesty.</span>
                </div>
              </div>
              <p className="text-[#94A3B8] text-sm text-center hidden md:block">
                Some feelings don&apos;t need answers, they just need a page.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}