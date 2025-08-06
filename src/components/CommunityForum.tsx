import React, { useState, useEffect } from 'react';
import { MessageSquare, Users, Search, ThumbsUp, Share2, Reply, X, Filter, ArrowLeft } from 'lucide-react';

interface Discussion {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  date: string;
  replies: number;
  views: number;
  solved: boolean;
  likes: number;
  liked: boolean;
  comments?: Comment[];
}

interface Comment {
  id: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  liked: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  count: number;
}

function CommunityForum() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [searchResults, setSearchResults] = useState<Discussion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [newComment, setNewComment] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  // Form State
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    content: '',
    category: '',
  });

  // Categories Data
  const categories: Category[] = [
    {
      id: 'general',
      name: 'General Discussion',
      description: 'General topics about government services',
      count: 156
    },
    {
      id: 'service',
      name: 'Service Help',
      description: 'Questions about specific services',
      count: 89
    },
    {
      id: 'technical',
      name: 'Technical Support',
      description: 'Technical issues and troubleshooting',
      count: 67
    }
  ];

  // Sample Discussions Data with Comments
  const sampleDiscussions: Discussion[] = [
    {
      id: '1',
      title: 'Tips for faster passport renewal',
      content: 'Here are some tips that helped me get my passport renewed quickly:\n\n1. Gather all required documents beforehand\n2. Use the online appointment system\n3. Arrive 15 minutes early\n4. Bring exact payment amount\n5. Double-check all forms before submission',
      category: 'service',
      author: 'John Doe',
      date: '2025-03-15',
      replies: 23,
      views: 156,
      solved: true,
      likes: 45,
      liked: false,
      comments: [
        {
          id: 'c1',
          content: 'Great tips! The online appointment system saved me hours of waiting.',
          author: 'Sarah Wilson',
          date: '2025-03-15',
          likes: 12,
          liked: false
        },
        {
          id: 'c2',
          content: 'How long did the entire process take for you?',
          author: 'Mike Brown',
          date: '2025-03-16',
          likes: 5,
          liked: false
        }
      ]
    },
    {
      id: '2',
      title: 'Business registration process guide',
      content: 'A step-by-step guide for registering your business:\n\n1. Choose your business structure\n2. Register your business name\n3. Get an EIN\n4. Apply for necessary licenses\n5. Set up business banking',
      category: 'general',
      author: 'Jane Smith',
      date: '2025-03-14',
      replies: 15,
      views: 89,
      solved: false,
      likes: 32,
      liked: false,
      comments: []
    },
    {
      id: '3',
      title: 'Tax filing deadline questions',
      content: 'Important information about this year\'s tax filing deadlines and extensions available.',
      category: 'technical',
      author: 'Mike Johnson',
      date: '2025-03-13',
      replies: 34,
      views: 245,
      solved: true,
      likes: 67,
      liked: false,
      comments: []
    }
  ];

  // Initialize discussions
  useEffect(() => {
    setDiscussions(sampleDiscussions);
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      const results = discussions.filter(discussion =>
        discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discussion.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  }, [searchQuery, discussions]);

  // Handle like/unlike discussion
  const handleLike = (discussionId: string) => {
    setDiscussions(prevDiscussions =>
      prevDiscussions.map(discussion =>
        discussion.id === discussionId
          ? {
              ...discussion,
              likes: discussion.liked ? discussion.likes - 1 : discussion.likes + 1,
              liked: !discussion.liked
            }
          : discussion
      )
    );
  };

  // Handle like/unlike comment
  const handleCommentLike = (discussionId: string, commentId: string) => {
    setDiscussions(prevDiscussions =>
      prevDiscussions.map(discussion =>
        discussion.id === discussionId
          ? {
              ...discussion,
              comments: discussion.comments?.map(comment =>
                comment.id === commentId
                  ? {
                      ...comment,
                      likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
                      liked: !comment.liked
                    }
                  : comment
              )
            }
          : discussion
      )
    );
  };

  // Handle new discussion submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscussion.title.trim() || !newDiscussion.content.trim() || !newDiscussion.category) {
      return;
    }

    const newPost: Discussion = {
      id: Date.now().toString(),
      title: newDiscussion.title,
      content: newDiscussion.content,
      category: newDiscussion.category,
      author: 'Current User',
      date: new Date().toISOString().split('T')[0],
      replies: 0,
      views: 0,
      solved: false,
      likes: 0,
      liked: false,
      comments: []
    };

    setDiscussions(prev => [newPost, ...prev]);
    setNewDiscussion({ title: '', content: '', category: '' });
    setShowNewDiscussion(false);
  };

  // Handle new comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !selectedDiscussion) return;

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      content: newComment,
      author: 'Current User',
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      liked: false
    };

    setDiscussions(prevDiscussions =>
      prevDiscussions.map(discussion =>
        discussion.id === selectedDiscussion.id
          ? {
              ...discussion,
              comments: [...(discussion.comments || []), newCommentObj],
              replies: (discussion.replies || 0) + 1
            }
          : discussion
      )
    );

    setNewComment('');
  };

  // Handle share
  const handleShare = (discussion: Discussion) => {
    const url = `${window.location.origin}/forum/discussion/${discussion.id}`;
    setShareUrl(url);
    setShowShareModal(true);
  };

  // Handle copy share link
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
      setShowShareModal(false);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  // Render discussion detail view
  if (selectedDiscussion) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <button
              onClick={() => setSelectedDiscussion(null)}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Discussions
            </button>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{selectedDiscussion.title}</h1>
                {selectedDiscussion.solved && (
                  <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    Solved
                  </span>
                )}
              </div>

              <div className="prose max-w-none mb-6">
                <p className="text-gray-600 whitespace-pre-wrap">{selectedDiscussion.content}</p>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <span>Posted by {selectedDiscussion.author}</span>
                  <span>on {selectedDiscussion.date}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(selectedDiscussion.id)}
                    className={`flex items-center space-x-1 ${
                      selectedDiscussion.liked ? 'text-blue-600' : 'text-gray-600'
                    }`}
                  >
                    <ThumbsUp size={16} />
                    <span>{selectedDiscussion.likes}</span>
                  </button>
                  <button
                    onClick={() => handleShare(selectedDiscussion)}
                    className="flex items-center space-x-1"
                  >
                    <Share2 size={16} />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold mb-6">Comments ({selectedDiscussion.comments?.length || 0})</h2>
              
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  required
                />
                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                  >
                    Post Comment
                  </button>
                </div>
              </form>

              <div className="space-y-6">
                {selectedDiscussion.comments?.map((comment) => (
                  <div key={comment.id} className="border-b pb-6 last:border-b-0">
                    <p className="text-gray-600 mb-2">{comment.content}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-500">
                        {comment.author} • {comment.date}
                      </div>
                      <button
                        onClick={() => handleCommentLike(selectedDiscussion.id, comment.id)}
                        className={`flex items-center space-x-1 ${
                          comment.liked ? 'text-blue-600' : 'text-gray-600'
                        }`}
                      >
                        <ThumbsUp size={16} />
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
            <button
              onClick={() => setShowNewDiscussion(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors flex items-center space-x-2"
            >
              <MessageSquare size={20} />
              <span>Start New Discussion</span>
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search discussions..."
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <Filter size={20} />
            </button>

            {/* Search Results Dropdown */}
            {isSearching && searchQuery && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <div
                      key={result.id}
                      onClick={() => setSelectedDiscussion(result)}
                      className="p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                    >
                      <h4 className="font-medium text-gray-900">{result.title}</h4>
                      <p className="text-sm text-gray-600 truncate">{result.content}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-gray-600">No results found</div>
                )}
              </div>
            )}
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg border transition-colors ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                }`}
              >
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                <span className="text-sm text-blue-600 mt-2 block">{category.count} discussions</span>
              </button>
            ))}
          </div>

          {/* Discussions List */}
          <div className="space-y-4">
            {(isSearching ? searchResults : discussions)
              .filter(discussion => !selectedCategory || discussion.category === selectedCategory)
              .map((discussion) => (
                <div
                  key={discussion.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-200 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => setSelectedDiscussion(discussion)}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {discussion.title}
                        </h3>
                        {discussion.solved && (
                          <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            Solved
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{discussion.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <MessageSquare size={16} className="mr-1" />
                          {discussion.replies} replies
                        </span>
                        <span className="flex items-center">
                          <Users size={16} className="mr-1" />
                          {discussion.views} views
                        </span>
                        <span className="text-gray-400">
                          Posted by {discussion.author} on {discussion.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleLike(discussion.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          discussion.liked
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        <ThumbsUp size={20} />
                      </button>
                      <button
                        onClick={() => setSelectedDiscussion(discussion)}
                        className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                      >
                        <Reply size={20} />
                      </button>
                      <button
                        onClick={() => handleShare(discussion)}
                        className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                      >
                        <Share2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* New Discussion Modal */}
      {showNewDiscussion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl m-4">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-semibold text-gray-900">Start New Discussion</h2>
              <button
                onClick={() => setShowNewDiscussion(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newDiscussion.title}
                    onChange={(e) => setNewDiscussion(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    value={newDiscussion.category}
                    onChange={(e) => setNewDiscussion(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    id="content"
                    value={newDiscussion.content}
                    onChange={(e) => setNewDiscussion(prev => ({ ...prev, content: e.target.value }))}
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewDiscussion(false)}
                  className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
                >
                  Create Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md m-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Share Discussion</h2>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 bg-gray-50"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommunityForum;