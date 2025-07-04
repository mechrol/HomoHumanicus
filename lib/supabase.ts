import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabase = createClientComponentClient()

export type Database = {
  public: {
    Tables: {
      communities: {
        Row: {
          id: string
          name: string
          description: string
          category: string
          image_url: string
          owner_id: string
          member_count: number
          course_count: number
          group_count: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string
          category?: string
          image_url?: string
          owner_id: string
          member_count?: number
          course_count?: number
          group_count?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          category?: string
          image_url?: string
          owner_id?: string
          member_count?: number
          course_count?: number
          group_count?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          short_description: string
          description: string
          image_url: string
          community_id: string
          author_id: string
          category: string
          status: 'draft' | 'published'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          short_description?: string
          description?: string
          image_url?: string
          community_id: string
          author_id: string
          category?: string
          status?: 'draft' | 'published'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          short_description?: string
          description?: string
          image_url?: string
          community_id?: string
          author_id?: string
          category?: string
          status?: 'draft' | 'published'
          created_at?: string
          updated_at?: string
        }
      }
      community_members: {
        Row: {
          id: string
          community_id: string
          user_id: string
          role: 'member' | 'admin' | 'owner'
          joined_at: string
        }
        Insert: {
          id?: string
          community_id: string
          user_id: string
          role?: 'member' | 'admin' | 'owner'
          joined_at?: string
        }
        Update: {
          id?: string
          community_id?: string
          user_id?: string
          role?: 'member' | 'admin' | 'owner'
          joined_at?: string
        }
      }
    }
  }
}
