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
    <div className="w-full bg-transparent text-[#EDE8E1] min-h-screen pt-6 pb-20">
      
      {/* HEADER HERO */}
      <section className="px-6 sm:px-12 lg:px-16 py-12 max-w-7xl mx-auto text-center border-b border-[#DDA038]/20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#181512] border border-[#DDA038]/30 text-[#DDA038] font-ui text-xs font-bold uppercase tracking-[0.2em] mb-6 rounded-sm shadow-xs">
          <BookOpen className="w-3.5 h-3.5 text-[#DDA038]" />
          <span>Vedic Epistemology & Scientific Blog</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-[#EDE8E1]">
          Wisdom & <span className="font-heading italic font-bold text-[#DDA038]">Research Articles</span>
        </h1>

        <p className="font-body text-base sm:text-lg text-[#A39B90] max-w-3xl mx-auto leading-relaxed border-l-2 sm:border-l-0 sm:border-t-2 border-[#DDA038] pl-4 sm:pl-0 sm:pt-4">
          Exploring quantum consciousness, sattvic neuroscience, Bhagavad Gita philosophy, and community food seva initiatives.
        </p>
      </section>

      {/* FEATURED ARTICLE SHOWCASE */}
      {featuredPost && (
        <section className="px-6 sm:px-12 lg:px-16 py-10 max-w-7xl mx-auto">
          <div className="bg-[#161412] border border-[#DDA038]/25 overflow-hidden shadow-md rounded-sm grid grid-cols-1 lg:grid-cols-12 gap-0 group">
            
            {/* Image Column */}
            <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden">
              <img 
                src={featuredPost.coverImage} 
                alt={featuredPost.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#0F0D0C]/90 border border-[#DDA038]/40 px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-[#DDA038] flex items-center gap-1.5 backdrop-blur-md rounded-xs">
                <Flame className="w-3 h-3 text-[#DDA038]" />
                Featured Publication
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-[#161412]">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-wider bg-[#1F1C18] text-[#DDA038] border border-[#DDA038]/30 rounded-xs">
                    {featuredPost.category}
                  </span>
                  <span className="font-body text-xs text-[#A39B90] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#DDA038]" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 
                  onClick={() => handlePostClick(featuredPost.slug)}
                  className="font-heading italic text-2xl sm:text-3xl font-bold text-[#EDE8E1] hover:text-[#DDA038] transition-colors cursor-pointer leading-snug"
                >
                  {featuredPost.title}
                </h2>

                <p className="font-body text-xs sm:text-sm text-[#A39B90] leading-relaxed line-clamp-3">
                  {featuredPost.subtitle}
                </p>

                <p className="font-body text-xs text-[#A39B90] leading-relaxed border-l-2 border-[#DDA038]/40 pl-3 italic">
                  "{featuredPost.excerpt}"
                </p>
              </div>

              <div className="pt-8 border-t border-[#DDA038]/20 mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#1F1C18] border border-[#DDA038]/40 text-[#DDA038] font-ui font-bold text-xs flex items-center justify-center rounded-full">
                    {featuredPost.author.avatar}
                  </div>
                  <div>
                    <p className="font-ui text-xs font-bold text-[#EDE8E1]">{featuredPost.author.name}</p>
                    <p className="font-body text-[10px] text-[#A39B90]">{featuredPost.publishDate}</p>
                  </div>
                </div>

                <button
                  onClick={() => handlePostClick(featuredPost.slug)}
                  className="px-5 py-2.5 bg-[#9B2C3B] text-[#EDE8E1] font-ui font-bold text-xs uppercase tracking-wider hover:bg-[#B33A4A] transition-all flex items-center gap-2 rounded-sm border border-[#DDA038]/30 shadow-xs"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#DDA038]" />
                </button>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* FILTER & SEARCH BAR */}
      <section className="px-6 sm:px-12 lg:px-16 py-6 max-w-7xl mx-auto">
        <div className="bg-[#161412] border border-[#DDA038]/20 p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs rounded-sm">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
            <span className="font-ui text-xs font-bold uppercase tracking-wider text-[#DDA038] flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5 text-[#DDA038]" />
              <span>Category:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 font-ui text-xs font-bold uppercase tracking-wider transition-all border rounded-sm ${
                  selectedCategory === cat
                    ? 'bg-[#9B2C3B] text-[#EDE8E1] border-[#DDA038]/40 shadow-xs'
                    : 'bg-[#181512] text-[#A39B90] border-[#DDA038]/20 hover:text-[#EDE8E1] hover:border-[#DDA038]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#DDA038] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles & tags..."
              className="w-full bg-[#0F0D0C] border border-[#DDA038]/30 rounded-sm pl-9 pr-4 py-2 font-body text-xs text-[#EDE8E1] placeholder-[#A39B90]/60 focus:border-[#DDA038] focus:outline-none"
            />
          </div>

        </div>
      </section>

      {/* ARTICLE GRID */}
      <section className="px-6 sm:px-12 lg:px-16 py-8 max-w-7xl mx-auto">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center bg-[#161412] border border-[#DDA038]/20 rounded-sm">
            <p className="font-body text-sm text-[#A39B90]">No articles found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article 
                key={post.slug}
                className="bg-[#161412] border border-[#DDA038]/20 border-b-2 border-b-[#DDA038]/35 flex flex-col justify-between overflow-hidden shadow-xs hover:-translate-y-1 transition-all rounded-sm group"
              >
                <div>
                  {/* Cover Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.coverImage} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-[#0F0D0C]/90 border border-[#DDA038]/30 font-ui text-[10px] font-bold uppercase tracking-wider text-[#DDA038] rounded-xs">
                      {post.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 font-body text-[11px] text-[#A39B90]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#DDA038]" />
                        {post.readTime}
                      </span>
                      <span>•</span>
                      <span>{post.publishDate}</span>
                    </div>

                    <h3 
                      onClick={() => handlePostClick(post.slug)}
                      className="font-heading italic text-xl font-bold text-[#EDE8E1] group-hover:text-[#DDA038] transition-colors cursor-pointer line-clamp-2 leading-tight"
                    >
                      {post.title}
                    </h3>

                    <p className="font-body text-xs text-[#A39B90] line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {post.tags.map(tag => (
                        <span 
                          key={tag}
                          className="font-ui text-[10px] bg-[#1F1C18] text-[#A39B90] border border-[#DDA038]/20 px-2 py-0.5 rounded-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0 border-t border-[#DDA038]/20 mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-[#1F1C18] text-[#DDA038] font-ui text-[10px] font-bold rounded-full flex items-center justify-center border border-[#DDA038]/30">
                      {post.author.avatar}
                    </div>
                    <span className="font-ui text-[11px] text-[#EDE8E1] font-bold truncate max-w-[120px]">
                      {post.author.name}
                    </span>
                  </div>

                  <button
                    onClick={() => handlePostClick(post.slug)}
                    className="font-ui text-xs font-bold text-[#DDA038] hover:text-[#EDE8E1] uppercase tracking-wider flex items-center gap-1 transition-colors"
                  >
                    <span>Read</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#DDA038]" />
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
