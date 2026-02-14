import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";

export default function StudentResources(){

return(

<AppLayout>

<h1 className="text-3xl mb-6">
Resource Repository
</h1>

<GlassCard>

<button className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
Upload Resource
</button>

<table className="w-full">

<tr>
<td>DBMS PYQ 2023</td>
<td>Download</td>
</tr>

</table>

</GlassCard>

</AppLayout>

);

}
