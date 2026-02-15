from app.services.supabase_client import supabase

response = supabase.table("courses").select("*").execute()

print(response.data)
print(response)
