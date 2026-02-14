import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";

export default function StudentNotifications(){

return(

<AppLayout>

<h1 className="text-3xl mb-6">
Notifications
</h1>

<GlassCard>

<p>Assignment deadline approaching</p>

<p>New resource uploaded</p>

</GlassCard>

</AppLayout>

);

}
