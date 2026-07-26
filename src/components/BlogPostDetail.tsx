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
    <div className="w-full bg-transparent text-[#EDE8E1] min-h-screen pt-6 pb-20">
      
      {/* TOP NAVIGATION / BACK BUTTON */}
      <div className="max-w-4xl mx-auto px-6 pt-4 pb-6">
        <button
          onClick={onBack || (() => window.history.back())}
          className="inline-flex items-center gap-2 font-ui text-xs font-bold uppercase tracking-wider text-[#DDA038] hover:bg-[#9B2C3B] hover:text-[#EDE8E1] transition-colors bg-[#181512] border border-[#DDA038]/30 px-4 py-2 rounded-sm shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#DDA038]" />
          <span>Back to Articles</span>
        </button>
      </div>

      {/* ARTICLE HEADER & EDITORIAL CONTAINER */}
      <article className="max-w-3xl mx-auto px-6">
        
        {/* Category & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DDA038]/20 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 font-ui text-[11px] font-bold uppercase tracking-wider bg-[#181512] text-[#DDA038] border border-[#DDA038]/30 rounded-xs">
              {post.category}
            </span>
            <span className="font-body text-xs text-[#A39B90] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#DDA038]" />
              {post.readTime}
            </span>
            <span className="font-body text-xs text-[#A39B90] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#DDA038]" />
              {post.publishDate}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="font-ui text-xs font-bold uppercase tracking-wider text-[#A39B90] hover:text-[#DDA038] flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-[#DDA038]" />
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>

        {/* Title & Subtitle */}
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-[#EDE8E1]">
          {post.title}
        </h1>

        <p className="font-body text-base sm:text-lg text-[#A39B90] leading-relaxed mb-8 border-l-2 border-[#DDA038] pl-4 italic">
          {post.subtitle}
        </p>

        {/* Cover Image */}
        <div className="my-8 border border-[#DDA038]/25 shadow-xs rounded-sm overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-80 sm:h-96 object-cover object-center"
          />
          <div className="p-3 bg-[#161412] font-body text-xs text-[#A39B90] text-center border-t border-[#DDA038]/20 italic">
            Visual commentary: Exploring physical parameters through Vedic non-locality and consciousness theory.
          </div>
        </div>

        {/* Article Content Paragraphs */}
        <div className="prose max-w-none space-y-8 font-body text-base text-[#EDE8E1]/90 leading-relaxed sm:text-lg">
          {post.content.map((sec, idx) => (
            <div key={idx} className="space-y-4">
              {sec.sectionHeading && (
                <h2 className="font-heading italic text-2xl font-bold text-[#DDA038] pt-4 border-b border-[#DDA038]/20 pb-2">
                  {sec.sectionHeading}
                </h2>
              )}

              {sec.paragraphs.map((pText, pIdx) => (
                <p key={pIdx} className="leading-relaxed text-[#EDE8E1]">
                  {pText}
                </p>
              ))}

              {sec.quote && (
                <blockquote className="my-6 p-6 bg-[#161412] border-l-4 border-[#DDA038] text-[#EDE8E1] font-body italic text-lg leading-relaxed shadow-xs rounded-r-sm">
                  <Quote className="w-6 h-6 text-[#DDA038] mb-2 opacity-80" />
                  {sec.quote}
                </blockquote>
              )}
            </div>
          ))}
        </div>

        {/* Tags Row */}
        <div className="flex flex-wrap items-center gap-2 my-10 pt-6 border-t border-[#DDA038]/20">
          <span className="font-ui text-xs font-bold uppercase tracking-wider text-[#DDA038] mr-2">Topic Tags:</span>
          {post.tags.map(t => (
            <span key={t} className="px-3 py-1 bg-[#181512] border border-[#DDA038]/25 font-ui text-xs text-[#A39B90] rounded-xs">
              #{t}
            </span>
          ))}
        </div>

        {/* AUTHOR BIO CARD */}
        <div className="my-12 bg-[#161412] border border-[#DDA038]/25 border-b-2 border-b-[#DDA038]/35 p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6 shadow-xs rounded-sm">
          <div className="w-16 h-16 bg-[#1F1C18] border-2 border-[#DDA038] text-[#DDA038] font-ui font-bold text-2xl flex items-center justify-center rounded-full shrink-0">
            {post.author.avatar}
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-heading text-xl font-bold text-[#EDE8E1]">{post.author.name}</h3>
              <span className="font-ui text-xs text-[#DDA038] bg-[#1F1C18] px-2.5 py-0.5 border border-[#DDA038]/30 rounded-xs">
                {post.author.role}
              </span>
            </div>
            <p className="font-body text-xs sm:text-sm text-[#A39B90] leading-relaxed">
              {post.author.bio}
            </p>
          </div>
        </div>

      </article>

      {/* NEWSLETTER SUBSCRIPTION BANNER AT BOTTOM */}
      <section className="max-w-4xl mx-auto px-6 my-16">
        <div className="bg-[#161412] border-2 border-[#DDA038]/40 p-8 sm:p-12 text-center relative overflow-hidden shadow-xs rounded-sm">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#1F1C18] border border-[#DDA038]/30 text-[#DDA038] font-ui text-[10px] font-bold uppercase tracking-wider rounded-xs">
              <Mail className="w-3.5 h-3.5 text-[#DDA038]" />
              <span>Subscribe to Journal</span>
            </div>

            <h3 className="font-heading italic text-3xl sm:text-4xl font-bold text-[#EDE8E1]">
              Science of Krishna Digest
            </h3>

            <p className="font-body text-xs sm:text-sm text-[#A39B90] leading-relaxed">
              Receive weekly research articles on Vedic metaphysics, quantum consciousness, Sattvic nutrition guides, and upcoming Seva drives.
            </p>

            {emailSubmitted ? (
              <div className="p-4 bg-[#181512] border border-[#DDA038]/40 text-emerald-400 font-ui text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 mt-6 rounded-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
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
                  className="flex-grow bg-[#0F0D0C] border border-[#DDA038]/30 px-4 py-3 font-body text-xs text-[#EDE8E1] placeholder-[#A39B90]/60 focus:border-[#DDA038] focus:outline-none rounded-sm"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#9B2C3B] text-[#EDE8E1] font-ui font-bold text-xs uppercase tracking-wider hover:bg-[#B33A4A] transition-all border border-[#DDA038]/30 shadow-xs rounded-sm shrink-0"
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
        <section className="max-w-4xl mx-auto px-6 border-t border-[#DDA038]/20 pt-12">
          <h4 className="font-heading italic text-2xl font-bold text-[#DDA038] mb-6">
            Recommended Further Reading
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((rPost) => (
              <div 
                key={rPost.slug}
                onClick={() => onSelectPost ? onSelectPost(rPost.slug) : window.location.href = `/blog/${rPost.slug}`}
                className="bg-[#161412] border border-[#DDA038]/20 p-5 hover:border-[#DDA038] cursor-pointer transition-all group rounded-sm"
              >
                <span className="font-ui text-[10px] font-bold uppercase tracking-wider text-[#DDA038] block mb-1">
                  {rPost.category}
                </span>
                <h5 className="font-heading italic text-lg font-bold text-[#EDE8E1] group-hover:text-[#DDA038] transition-colors leading-tight mb-2">
                  {rPost.title}
                </h5>
                <p className="font-body text-xs text-[#A39B90] line-clamp-2 leading-relaxed">
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
