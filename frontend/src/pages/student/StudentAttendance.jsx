import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";

export default function StudentAttendance(){

return(

<AppLayout>

<h1 className="text-3xl mb-6">
Attendance
</h1>

<GlassCard>

<table className="w-full">

<thead>
<tr>
<th>Course</th>
<th>Attended</th>
<th>Total</th>
<th>Percentage</th>
</tr>
</thead>

<tbody>

<tr>
<td>DBMS</td>
<td>34</td>
<td>40</td>
<td>85%</td>
</tr>

</tbody>

</table>

</GlassCard>

</AppLayout>

);

}

