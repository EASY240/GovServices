/*
  # Community Forum Schema

  1. New Tables
    - `forum_categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `discussion_count` (int, default 0)
      - `created_at` (timestamp)
    
    - `forum_discussions`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `category_id` (uuid, foreign key)
      - `author_id` (uuid, foreign key)
      - `reply_count` (int, default 0)
      - `view_count` (int, default 0)
      - `solved` (boolean, default false)
      - `created_at` (timestamp)
    
    - `forum_comments`
      - `id` (uuid, primary key)
      - `discussion_id` (uuid, foreign key)
      - `author_id` (uuid, foreign key)
      - `content` (text)
      - `created_at` (timestamp)
    
    - `forum_likes`
      - `id` (uuid, primary key)
      - `discussion_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for public read access

  3. Indexes
    - Add indexes for foreign keys
    - Add indexes for frequently queried columns
*/

-- Create forum_categories table
CREATE TABLE IF NOT EXISTS forum_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  discussion_count int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create forum_discussions table
CREATE TABLE IF NOT EXISTS forum_discussions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category_id uuid REFERENCES forum_categories(id) ON DELETE CASCADE,
  author_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  reply_count int DEFAULT 0,
  view_count int DEFAULT 0,
  solved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create forum_comments table
CREATE TABLE IF NOT EXISTS forum_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id uuid REFERENCES forum_discussions(id) ON DELETE CASCADE,
  author_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create forum_likes table
CREATE TABLE IF NOT EXISTS forum_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id uuid REFERENCES forum_discussions(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(discussion_id, user_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_discussions_category ON forum_discussions(category_id);
CREATE INDEX IF NOT EXISTS idx_discussions_author ON forum_discussions(author_id);
CREATE INDEX IF NOT EXISTS idx_comments_discussion ON forum_comments(discussion_id);
CREATE INDEX IF NOT EXISTS idx_comments_author ON forum_comments(author_id);
CREATE INDEX IF NOT EXISTS idx_likes_discussion ON forum_likes(discussion_id);
CREATE INDEX IF NOT EXISTS idx_likes_user ON forum_likes(user_id);

-- Enable RLS
ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_likes ENABLE ROW LEVEL SECURITY;

-- Create policies for forum_categories
CREATE POLICY "Categories are viewable by everyone" 
  ON forum_categories FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Categories can be created by authenticated users" 
  ON forum_categories FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Create policies for forum_discussions
CREATE POLICY "Discussions are viewable by everyone" 
  ON forum_discussions FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Discussions can be created by authenticated users" 
  ON forum_discussions FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Discussions can be updated by authors" 
  ON forum_discussions FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = author_id);

-- Create policies for forum_comments
CREATE POLICY "Comments are viewable by everyone" 
  ON forum_comments FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Comments can be created by authenticated users" 
  ON forum_comments FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Comments can be updated by authors" 
  ON forum_comments FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = author_id);

-- Create policies for forum_likes
CREATE POLICY "Likes are viewable by everyone" 
  ON forum_likes FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Likes can be created by authenticated users" 
  ON forum_likes FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Likes can be deleted by users" 
  ON forum_likes FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Create function to update discussion counts
CREATE OR REPLACE FUNCTION update_category_discussion_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE forum_categories
    SET discussion_count = discussion_count + 1
    WHERE id = NEW.category_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE forum_categories
    SET discussion_count = discussion_count - 1
    WHERE id = OLD.category_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create function to update reply counts
CREATE OR REPLACE FUNCTION update_discussion_reply_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE forum_discussions
    SET reply_count = reply_count + 1
    WHERE id = NEW.discussion_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE forum_discussions
    SET reply_count = reply_count - 1
    WHERE id = OLD.discussion_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_category_count
AFTER INSERT OR DELETE ON forum_discussions
FOR EACH ROW
EXECUTE FUNCTION update_category_discussion_count();

CREATE TRIGGER update_reply_count
AFTER INSERT OR DELETE ON forum_comments
FOR EACH ROW
EXECUTE FUNCTION update_discussion_reply_count();

-- Insert initial categories
INSERT INTO forum_categories (name, description)
VALUES 
  ('General Discussion', 'General topics about government services'),
  ('Service Help', 'Questions about specific services'),
  ('Technical Support', 'Technical issues and troubleshooting');