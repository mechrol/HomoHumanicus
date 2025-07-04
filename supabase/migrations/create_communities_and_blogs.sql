/*
  # AI Tribes Database Schema

  1. New Tables
    - `communities`
      - `id` (uuid, primary key)
      - `name` (text, community name)
      - `description` (text, community description)
      - `category` (text, community category)
      - `image_url` (text, community image)
      - `owner_id` (uuid, references auth.users)
      - `member_count` (integer, default 0)
      - `course_count` (integer, default 0)
      - `group_count` (integer, default 0)
      - `is_active` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text, blog title)
      - `short_description` (text, blog excerpt)
      - `description` (text, full blog content)
      - `image_url` (text, blog image)
      - `community_id` (uuid, references communities)
      - `author_id` (uuid, references auth.users)
      - `category` (text, blog category)
      - `status` (text, published/draft)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `community_members`
      - `id` (uuid, primary key)
      - `community_id` (uuid, references communities)
      - `user_id` (uuid, references auth.users)
      - `role` (text, member/admin)
      - `joined_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Community owners can manage their communities
    - Members can view community content
*/

-- Communities table
CREATE TABLE IF NOT EXISTS communities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  category text DEFAULT 'General',
  image_url text DEFAULT '',
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  member_count integer DEFAULT 0,
  course_count integer DEFAULT 0,
  group_count integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  short_description text DEFAULT '',
  description text DEFAULT '',
  image_url text DEFAULT '',
  community_id uuid REFERENCES communities(id) ON DELETE CASCADE,
  author_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  category text DEFAULT 'General',
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Community members table
CREATE TABLE IF NOT EXISTS community_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id uuid REFERENCES communities(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text DEFAULT 'member' CHECK (role IN ('member', 'admin', 'owner')),
  joined_at timestamptz DEFAULT now(),
  UNIQUE(community_id, user_id)
);

-- Enable RLS
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_members ENABLE ROW LEVEL SECURITY;

-- Communities policies
CREATE POLICY "Communities are viewable by everyone"
  ON communities
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create communities"
  ON communities
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Community owners can update their communities"
  ON communities
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id);

-- Blog posts policies
CREATE POLICY "Blog posts are viewable by community members"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM community_members
      WHERE community_id = blog_posts.community_id
      AND user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM communities
      WHERE id = blog_posts.community_id
      AND owner_id = auth.uid()
    )
  );

CREATE POLICY "Community owners can create blog posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM communities
      WHERE id = community_id
      AND owner_id = auth.uid()
    )
  );

CREATE POLICY "Community owners can update their blog posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM communities
      WHERE id = blog_posts.community_id
      AND owner_id = auth.uid()
    )
  );

-- Community members policies
CREATE POLICY "Community members are viewable by community members"
  ON community_members
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR
    EXISTS (
      SELECT 1 FROM communities
      WHERE id = community_id
      AND owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can join communities"
  ON community_members
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Function to update member count
CREATE OR REPLACE FUNCTION update_community_member_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE communities
    SET member_count = member_count + 1
    WHERE id = NEW.community_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE communities
    SET member_count = member_count - 1
    WHERE id = OLD.community_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for member count
CREATE TRIGGER update_member_count_trigger
  AFTER INSERT OR DELETE ON community_members
  FOR EACH ROW
  EXECUTE FUNCTION update_community_member_count();