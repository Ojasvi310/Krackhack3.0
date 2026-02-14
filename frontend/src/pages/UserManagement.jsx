import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8000/api";   

export default function UserManagement(){

const [users,setUsers]=useState([]);
const [search,setSearch]=useState("");
const [role,setRole]=useState("");
const [status,setStatus]=useState("");
const [loading,setLoading]=useState(false);


// ---------------- LOAD USERS ----------------
async function loadUsers(){

setLoading(true);

try{

let res;

if(search.trim()){
res = await axios.get(`${API}/admin/users/search/${search}`);
}else{
res = await axios.get(`${API}/admin/users`);
}

let data = res.data;

// local filters
if(role) data = data.filter(u=>u.role===role);
if(status==="active") data=data.filter(u=>u.is_active);
if(status==="disabled") data=data.filter(u=>!u.is_active);

setUsers(data);

}catch(e){
console.error(e);
alert("Failed to load users");
}

setLoading(false);
}

useEffect(()=>{ loadUsers() },[search,role,status]);


// ---------------- CHANGE ROLE ----------------
async function changeRole(id,newRole){
await axios.patch(`${API}/admin/users/${id}/role?role=${newRole}`);
loadUsers();
}

// ---------------- DISABLE ----------------
async function disableUser(id){

if(!window.confirm("Disable this user?")) return;

await axios.patch(`${API}/admin/users/${id}/disable`);
loadUsers();
}



// ================= UI =================
return(

<div style={{
display:"flex",
background:"#f3f4f6",
minHeight:"100vh",
fontFamily:"system-ui"
}}>

{/* -------- SIDEBAR -------- */}
<div style={{
width:240,
background:"#111827",
color:"white",
padding:25
}}>
<h2 style={{marginBottom:30}}>AEGIS Admin</h2>

<div style={{marginBottom:12,opacity:.7}}>Dashboard</div>

<div style={{
background:"#1f2937",
padding:10,
borderRadius:6
}}>
User Management
</div>

</div>



{/* -------- MAIN -------- */}
<div style={{flex:1}}>

{/* HEADER */}
<div style={{
background:"white",
padding:"18px 30px",
borderBottom:"1px solid #e5e7eb",
fontWeight:600,
fontSize:18
}}>
User Management
</div>


{/* CONTENT */}
<div style={{padding:30}}>

{/* FILTER BAR */}
<div style={{
display:"flex",
gap:15,
marginBottom:25,
flexWrap:"wrap"
}}>

<input
placeholder="Search name/email..."
value={search}
onChange={e=>setSearch(e.target.value)}
style={{
padding:10,
width:260,
border:"1px solid #ddd",
borderRadius:6
}}
/>

<select value={role} onChange={e=>setRole(e.target.value)}
style={{padding:10,borderRadius:6}}>
<option value="">All Roles</option>
<option value="student">Student</option>
<option value="faculty">Faculty</option>
<option value="admin">Admin</option>
</select>

<select value={status} onChange={e=>setStatus(e.target.value)}
style={{padding:10,borderRadius:6}}>
<option value="">All Status</option>
<option value="active">Active</option>
<option value="disabled">Disabled</option>
</select>

<button
onClick={loadUsers}
style={{
background:"#2563eb",
color:"white",
border:"none",
padding:"10px 18px",
borderRadius:6,
cursor:"pointer"
}}
>
Refresh
</button>

</div>



{/* TABLE */}
<div style={{
background:"white",
borderRadius:10,
overflow:"hidden",
boxShadow:"0 3px 10px rgba(0,0,0,0.05)"
}}>

<table style={{width:"100%",borderCollapse:"collapse"}}>

<thead style={{background:"#f9fafb"}}>
<tr>
<th style={th}>Name</th>
<th style={th}>Email</th>
<th style={th}>Role</th>
<th style={th}>Status</th>
<th style={th}>Action</th>
</tr>
</thead>

<tbody>

{loading ? (
<tr><td colSpan="5" style={{padding:30}}>Loading...</td></tr>
) :

users.length===0 ? (
<tr><td colSpan="5" style={{padding:30}}>No users found</td></tr>
) :

users.map(u=>(

<tr key={u.id} style={{borderTop:"1px solid #eee"}}>

<td style={td}>{u.full_name}</td>

<td style={td}>{u.email}</td>

<td style={td}>
<select
defaultValue={u.role}
onChange={e=>changeRole(u.id,e.target.value)}
style={{padding:6}}
>
<option>student</option>
<option>faculty</option>
<option>admin</option>
</select>
</td>

<td style={td}>
<span style={{
color:u.is_active?"green":"red",
fontWeight:600
}}>
{u.is_active?"Active":"Disabled"}
</span>
</td>

<td style={td}>
<button
onClick={()=>disableUser(u.id)}
style={{
background:"#ef4444",
color:"white",
border:"none",
padding:"6px 12px",
borderRadius:5,
cursor:"pointer"
}}
>
Disable
</button>
</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>
</div>
</div>
);
}

const th={
textAlign:"left",
padding:"14px 16px",
fontWeight:600,
fontSize:14
}

const td={
padding:"14px 16px",
fontSize:14
}