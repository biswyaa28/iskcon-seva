import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  User, 
  ArrowRight, 
  Filter, 
  Sparkles, 
  Share2, 
  Tag, 
  Search,
  ChevronRight,
  Flame,
  Heart
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';

interface BlogPageProps {
  onSelectPost?: (slug: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onSelectPost }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const featuredPost = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];

  const categories = ['All', 'Scriptures', 'Wellness', 'Community'];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handlePostClick = (slug: string) => {
    if (onSelectPost) {
      onSelectPost(slug);
    } else {
      window.location.href = `/blog/${slug}`;
    }
  };

  return (
    <div className="w-full bg-[#0D0C0A] text-[#E4E3E0] min-h-screen pt-6 pb-20">
      
      {/* HEADER HERO */}
      <section className="px-6 sm:px-12 lg:px-16 py-12 max-w-7xl mx-auto text-center border-b border-[#C69214]/20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1A1815] border border-[#C69214]/40 text-[#C69214] text-xs font-bold uppercase tracking-[0.2em] mb-6">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Vedic Epistemology & Scientific Blog</span>
        </div>

        <h1 className="serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E4E3E0] leading-tight mb-4">
          Wisdom & <span className="serif italic text-[#C69214]">Research Articles</span>
        </h1>

        <p className="text-base sm:text-lg text-[#A39E93] max-w-3xl mx-auto leading-relaxed border-l-2 sm:border-l-0 sm:border-t-2 border-[#C69214] pl-4 sm:pl-0 sm:pt-4">
          Exploring quantum consciousness, sattvic neuroscience, Bhagavad Gita philosophy, and community food seva initiatives.
        </p>
      </section>

      {/* FEATURED ARTICLE SHOWCASE */}
      {featuredPost && (
        <section className="px-6 sm:px-12 lg:px-16 py-10 max-w-7xl mx-auto">
          <div className="bg-[#1A1815] gold-border border border-[#C69214]/30 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0 group">
            
            {/* Image Column */}
            <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden">
              <img 
                src={featuredPost.coverImage} 
                alt={featuredPost.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute top-4 left-4 bg-[#0D0C0A]/90 border border-[#C69214] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C69214] flex items-center gap-1.5 backdrop-blur-md">
                <Flame className="w-3 h-3 text-[#C69214]" />
                Featured Publication
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-gradient-to-b lg:bg-gradient-to-r from-[#1A1815] to-[#14120F]">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] bg-[#28241F] text-[#C69214] border border-[#C69214]/30">
                    {featuredPost.category}
                  </span>
                  <span className="text-xs text-[#A39E93] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C69214]" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 
                  onClick={() => handlePostClick(featuredPost.slug)}
                  className="serif italic text-2xl sm:text-3xl font-bold text-[#E4E3E0] hover:text-[#C69214] transition-colors cursor-pointer leading-snug"
                >
                  {featuredPost.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed line-clamp-3">
                  {featuredPost.subtitle}
                </p>

                <p className="text-xs text-[#E4E3E0]/70 leading-relaxed border-l-2 border-[#C69214]/60 pl-3 italic">
                  "{featuredPost.excerpt}"
                </p>
              </div>

              <div className="pt-8 border-t border-[#28241F] mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#C69214]/20 border border-[#C69214] text-[#C69214] font-bold text-xs flex items-center justify-center rounded-full">
                    {featuredPost.author.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#E4E3E0]">{featuredPost.author.name}</p>
                    <p className="text-[10px] text-[#A39E93]">{featuredPost.publishDate}</p>
                  </div>
                </div>

                <button
                  onClick={() => handlePostClick(featuredPost.slug)}
                  className="px-5 py-2.5 bg-[#C69214] text-[#0D0C0A] text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2 gold-glow"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* FILTER & SEARCH BAR */}
      <section className="px-6 sm:px-12 lg:px-16 py-6 max-w-7xl mx-auto">
        <div className="bg-[#1A1815] border border-[#C69214]/30 p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C69214] flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5" />
              <span>Category:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all border ${
                  selectedCategory === cat
                    ? 'bg-[#C69214] text-[#0D0C0A] border-[#C69214] shadow-md'
                    : 'bg-[#0D0C0A] text-[#A39E93] border-[#28241F] hover:text-[#E4E3E0] hover:border-[#C69214]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#C69214] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles & tags..."
              className="w-full bg-[#0D0C0A] border border-[#C69214]/30 pl-9 pr-4 py-2 text-xs text-[#E4E3E0] placeholder-[#A39E93]/60 focus:border-[#C69214] focus:outline-none"
            />
          </div>

        </div>
      </section>

      {/* ARTICLE GRID */}
      <section className="px-6 sm:px-12 lg:px-16 py-8 max-w-7xl mx-auto">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center bg-[#1A1815] border border-[#28241F]">
            <p className="text-sm text-[#A39E93]">No articles found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article 
                key={post.slug}
                className="bg-[#1A1815] gold-border border border-[#C69214]/20 flex flex-col justify-between overflow-hidden shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div>
                  {/* Cover Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.coverImage} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-[#0D0C0A]/90 border border-[#C69214]/50 text-[10px] font-bold uppercase tracking-wider text-[#C69214]">
                      {post.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-[11px] text-[#A39E93]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#C69214]" />
                        {post.readTime}
                      </span>
                      <span>•</span>
                      <span>{post.publishDate}</span>
                    </div>

                    <h3 
                      onClick={() => handlePostClick(post.slug)}
                      className="serif italic text-xl font-bold text-[#E4E3E0] group-hover:text-[#C69214] transition-colors cursor-pointer line-clamp-2 leading-tight"
                    >
                      {post.title}
                    </h3>

                    <p className="text-xs text-[#A39E93] line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {post.tags.map(tag => (
                        <span 
                          key={tag}
                          className="text-[10px] bg-[#0D0C0A] text-[#A39E93] border border-[#28241F] px-2 py-0.5 rounded-none"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0 border-t border-[#28241F] mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-[#C69214]/20 text-[#C69214] text-[10px] font-bold rounded-full flex items-center justify-center border border-[#C69214]/50">
                      {post.author.avatar}
                    </div>
                    <span className="text-[11px] text-[#E4E3E0] font-medium truncate max-w-[120px]">
                      {post.author.name}
                    </span>
                  </div>

                  <button
                    onClick={() => handlePostClick(post.slug)}
                    className="text-xs font-bold text-[#C69214] hover:text-white uppercase tracking-wider flex items-center gap-1 transition-colors"
                  >
                    <span>Read</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </article>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
