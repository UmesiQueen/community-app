import Sidebar from "./_components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen text-white">
      <Sidebar />

      <main className="lg:ml-64 px-5 py-8 md:px-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;
