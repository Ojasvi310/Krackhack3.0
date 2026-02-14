import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";

export default function StudentCalendar(){

return(

<AppLayout>

<h1 className="text-3xl mb-6">Academic Calendar</h1>

<GlassCard>

<table className="w-full">

<thead>
<tr>
<th>Event</th>
<th>Course</th>
<th>Date</th>
</tr>
</thead>

<tbody>

<tr>
<td>Mid Exam</td>
<td>DBMS</td>
<td>Mar 15</td>
</tr>

<tr>
<td>Assignment</td>
<td>OS</td>
<td>Mar 18</td>
</tr>

</tbody>

</table>

</GlassCard>

</AppLayout>

);

}
