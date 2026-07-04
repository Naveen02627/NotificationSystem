import EmailForm from "./components/EmailForm";
import Selector from "./components/Selector";
import Architecture from "./components/Architecture";
import { usePageStore } from "./stores/PageSelectorStore";
import { BoltIcon } from "./components/ui/Icons";

function App() {
  const { page } = usePageStore();

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex md:flex-col md:w-60 md:shrink-0"
        style={{ background: "var(--ink)", padding: "1.5rem 1rem" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0 0.5rem 1.5rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 30,
              height: 30,
              borderRadius: 8,
              background: "var(--accent)",
              color: "#fff",
            }}
          >
            <BoltIcon width={17} height={17} />
          </span>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "1.05rem" }}>Dispatch</span>
        </div>
        <Selector variant="sidebar" />
      </aside>

      {/* Mobile top bar */}
      <header
        className="flex md:hidden items-center justify-between"
        style={{ background: "var(--ink)", padding: "0.9rem 1rem" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 26,
              height: 26,
              borderRadius: 7,
              background: "var(--accent)",
              color: "#fff",
            }}
          >
            <BoltIcon width={15} height={15} />
          </span>
          <span style={{ color: "#fff", fontWeight: 700 }}>Dispatch</span>
        </div>
      </header>
      <div className="flex md:hidden justify-center" style={{ padding: "1rem 1rem 0" }}>
        <Selector variant="tabs" />
      </div>

      {/* Main content */}
      <main className="flex-1 flex justify-center items-start" style={{ padding: "2rem 1rem 3rem" }}>
        {page == "architecture" ? <Architecture /> : <EmailForm />}
      </main>
    </div>
  );
}

export default App;
