import ProfileComponent from "@/components/dashboard/ProfileComponent";
import { CardChartStatus } from "@/components/dashboard/CardChartStatus";
import { CardChartPriority } from "@/components/dashboard/CardChartPriority";
import { CardNewTaks } from "@/components/dashboard/CardNewTaks";
import { ViewTaskTable } from "@/components/dashboard/ViewTaksTable";

function Dashboard() {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-4 px-4 gap-2 pb-5 xl:px-10 2xl:px-20">

      <aside className="lg:row-span-2">
        <ProfileComponent />
      </aside>

      <article>
        <CardNewTaks />
      </article>

        <article className="grid grid-cols-1 sm:grid-cols-2 lg:col-span-2 gap-2">
          <div>
            <CardChartStatus />
          </div>
          <div>
            <CardChartPriority />
          </div>
        </article>

        <article className="lg:col-span-3">
          <ViewTaskTable />
        </article>
    </main>
  );
}

export default Dashboard;
