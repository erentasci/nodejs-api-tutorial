export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          created_at: string | null
          description: string
          id: number
          title: string
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: number
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: number
          title?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
