// In-memory store (replace with Supabase later)
export const store = {
  links: [] as { id: string; slug: string; original_url: string; user: string }[],
  clicks: [] as { link_id: string; source_tag: string | null }[],
}
