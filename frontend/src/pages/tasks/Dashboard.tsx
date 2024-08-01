import ProfileComponent from "@/components/dashboard/ProfileComponent";
import { CardChartStatus } from "@/components/dashboard/CardChartStatus";
import { CardChartPriority } from "@/components/dashboard/CardChartPriority";
import { CardNewTaks } from "@/components/dashboard/CardNewTaks";
import { ViewTaskTable } from "@/components/dashboard/ViewTaksTable";

function Dashboard() {
  return (
    <main className="grid grid-cols-4 px-4 gap-2 pb-5">
      <aside>
        <ProfileComponent />
      </aside>
      <section className="col-span-3 flex flex-col gap-y-2">
        <article className="grid grid-cols-3 gap-2 h-[340px]">
          <div>
            <CardNewTaks />
          </div>
          <div>
            <CardChartStatus />
          </div>
          <div>
            <CardChartPriority />
          </div>
        </article>
        <article>
          <ViewTaskTable />
        </article>
      </section>
    </main>
  );
}

export default Dashboard;
