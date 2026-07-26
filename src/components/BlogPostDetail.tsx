import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  Bookmark, 
  CheckCircle2, 
  Mail, 
  Sparkles, 
  Quote, 
  BookOpen, 
  User, 
  ChevronRight 
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';

interface BlogPostDetailProps {
  slug: string;
  onBack?: () => void;
  onSelectPost?: (slug: string) => void;
}

export const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ slug, onBack, onSelectPost }) => {
  const post = BLOG_POSTS.find(p => p.slug === slug) || BLOG_POSTS[0];

  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setEmailSubmitted(true);
    }
  };

  const relatedPosts = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="w-full bg-[#0D0C0A] text-[#E4E3E0] min-h-screen pt-6 pb-20">
      
      {/* TOP NAVIGATION / BACK BUTTON */}
      <div className="max-w-4xl mx-auto px-6 pt-4 pb-6">
        <button
          onClick={onBack || (() => window.history.back())}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C69214] hover:text-white transition-colors bg-[#1A1815] border border-[#C69214]/30 px-4 py-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </button>
      </div>

      {/* ARTICLE HEADER & EDITORIAL CONTAINER */}
      <article className="max-w-3xl mx-auto px-6">
        
        {/* Category & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#28241F] pb-6 mb-8">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#28241F] text-[#C69214] border border-[#C69214]/40">
              {post.category}
            </span>
            <span className="text-xs text-[#A39E93] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C69214]" />
              {post.readTime}
            </span>
            <span className="text-xs text-[#A39E93] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C69214]" />
              {post.publishDate}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="text-xs font-bold uppercase tracking-wider text-[#A39E93] hover:text-[#C69214] flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>

        {/* Title & Subtitle */}
        <h1 className="serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E4E3E0] leading-tight mb-4">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-[#A39E93] leading-relaxed mb-8 border-l-2 border-[#C69214] pl-4 italic">
          {post.subtitle}
        </p>

        {/* Cover Image */}
        <div className="my-8 gold-border border border-[#C69214]/30 overflow-hidden shadow-2xl">
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-80 sm:h-96 object-cover object-center"
          />
          <div className="p-3 bg-[#1A1815] text-[11px] text-[#A39E93] text-center border-t border-[#28241F] italic">
            Visual commentary: Exploring physical parameters through Vedic non-locality and consciousness theory.
          </div>
        </div>

        {/* Article Content Paragraphs */}
        <div className="prose prose-invert max-w-none space-y-8 text-base text-[#E4E3E0]/90 leading-relaxed sm:text-lg">
          {post.content.map((sec, idx) => (
            <div key={idx} className="space-y-4">
              {sec.sectionHeading && (
                <h2 className="serif italic text-2xl font-bold text-[#C69214] pt-4 border-b border-[#28241F] pb-2">
                  {sec.sectionHeading}
                </h2>
              )}

              {sec.paragraphs.map((pText, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {pText}
                </p>
              ))}

              {sec.quote && (
                <blockquote className="my-6 p-6 bg-[#1A1815] border-l-4 border-[#C69214] text-[#E4E3E0] italic font-serif text-lg leading-relaxed shadow-lg">
                  <Quote className="w-6 h-6 text-[#C69214] mb-2 opacity-80" />
                  {sec.quote}
                </blockquote>
              )}
            </div>
          ))}
        </div>

        {/* Tags Row */}
        <div className="flex flex-wrap items-center gap-2 my-10 pt-6 border-t border-[#28241F]">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C69214] mr-2">Topic Tags:</span>
          {post.tags.map(t => (
            <span key={t} className="px-3 py-1 bg-[#1A1815] border border-[#C69214]/30 text-xs text-[#E4E3E0]">
              #{t}
            </span>
          ))}
        </div>

        {/* AUTHOR BIO CARD */}
        <div className="my-12 bg-[#1A1815] gold-border border border-[#C69214]/30 p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6 shadow-xl">
          <div className="w-16 h-16 bg-[#C69214]/20 border-2 border-[#C69214] rounded-full flex items-center justify-center text-[#C69214] font-bold text-2xl shrink-0">
            {post.author.avatar}
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="serif text-xl font-bold text-[#E4E3E0]">{post.author.name}</h3>
              <span className="text-xs text-[#C69214] bg-[#0D0C0A] px-2.5 py-0.5 border border-[#C69214]/30 font-medium">
                {post.author.role}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed">
              {post.author.bio}
            </p>
          </div>
        </div>

      </article>

      {/* NEWSLETTER SUBSCRIPTION BANNER AT BOTTOM */}
      <section className="max-w-4xl mx-auto px-6 my-16">
        <div className="bg-[#1A1815] gold-border border-2 border-[#C69214] p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#0D0C0A] border border-[#C69214]/40 text-[#C69214] text-[10px] font-bold uppercase tracking-[0.2em]">
              <Mail className="w-3.5 h-3.5" />
              <span>Subscribe to Journal</span>
            </div>

            <h3 className="serif italic text-3xl sm:text-4xl font-bold text-[#E4E3E0]">
              Science of Krishna Digest
            </h3>

            <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed">
              Receive weekly research articles on Vedic metaphysics, quantum consciousness, Sattvic nutrition guides, and upcoming Seva drives.
            </p>

            {emailSubmitted ? (
              <div className="p-4 bg-[#0D0C0A] border border-[#C69214] text-[#C69214] text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 mt-6">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Subscribed! Check your inbox for the welcome edition.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 pt-4">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your professional email address..."
                  className="flex-grow bg-[#0D0C0A] border border-[#C69214]/40 px-4 py-3 text-xs text-[#E4E3E0] placeholder-[#A39E93]/60 focus:border-[#C69214] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#C69214] text-[#0D0C0A] font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-md gold-glow shrink-0"
                >
                  Join Research Digest
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* RELATED ARTICLES */}
      {relatedPosts.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 border-t border-[#28241F] pt-12">
          <h4 className="serif italic text-2xl font-bold text-[#C69214] mb-6">
            Recommended Further Reading
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((rPost) => (
              <div 
                key={rPost.slug}
                onClick={() => onSelectPost ? onSelectPost(rPost.slug) : window.location.href = `/blog/${rPost.slug}`}
                className="bg-[#1A1815] border border-[#C69214]/20 p-5 hover:border-[#C69214] cursor-pointer transition-all group"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C69214] block mb-1">
                  {rPost.category}
                </span>
                <h5 className="serif italic text-lg font-bold text-[#E4E3E0] group-hover:text-[#C69214] transition-colors leading-tight mb-2">
                  {rPost.title}
                </h5>
                <p className="text-xs text-[#A39E93] line-clamp-2 leading-relaxed">
                  {rPost.excerpt}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
