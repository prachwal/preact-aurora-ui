import { useState } from "preact/hooks";

import { Layout, Header, Sidebar, Content, Footer } from "./components";

export function App() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout direction="horizontal" fullHeight>
      <Sidebar
        className={collapsed ? "collapsed" : ""}
        nav={
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              margin: 0,
              padding: 0,
              listStyle: "none",
            }}
          >
            <li>
              <a href="#" title="Dashboard" className="sidebar-link">
                <span role="img" aria-label="dashboard">
                  🏠
                </span>
                <span
                  className={`sidebar-label${collapsed ? " sidebar-label--hidden" : ""}`}
                >
                  Dashboard
                </span>
              </a>
            </li>
            <li>
              <a href="#" title="Users" className="sidebar-link">
                <span role="img" aria-label="users">
                  👥
                </span>
                <span
                  className={`sidebar-label${collapsed ? " sidebar-label--hidden" : ""}`}
                >
                  Users
                </span>
              </a>
            </li>
            <li>
              <a href="#" title="Settings" className="sidebar-link">
                <span role="img" aria-label="settings">
                  ⚙️
                </span>
                <span
                  className={`sidebar-label${collapsed ? " sidebar-label--hidden" : ""}`}
                >
                  Settings
                </span>
              </a>
            </li>
          </ul>
        }
        actions={
          <button
            aria-label={collapsed ? "Rozwiń menu" : "Zwiń menu"}
            onClick={() => setCollapsed((c) => !c)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 24,
            }}
          >
            <span role="img" aria-label="menu">
              {collapsed ? "☰" : "≡"}
            </span>
          </button>
        }
        aria-label="Sidebar"
      />
      <Layout direction="vertical" style={{ flex: 1, minWidth: 0 }}>
        <Header
          logo={
            <span style={{ fontWeight: 700, fontSize: 20 }}>Aurora UI</span>
          }
          nav={
            <ul
              style={{
                display: "flex",
                gap: 16,
                margin: 0,
                padding: 0,
                listStyle: "none",
              }}
            >
              <li>
                <a href="#">Strona główna</a>
              </li>
              <li>
                <a href="#">Użytkownicy</a>
              </li>
              <li>
                <a href="#">Ustawienia</a>
              </li>
            </ul>
          }
          actions={<button style={{ fontSize: 16 }}>Wyloguj</button>}
        />
        <div className="scrollable-area">
          <Content>
            <h1>Hello, Preact!</h1>
            <p>
              To jest przykładowy dashboard z Layout, Header, Sidebar, Content,
              Footer.
            </p>
          </Content>
          <Footer>
            <span style={{ opacity: 0.7 }}>
              Aurora UI © {new Date().getFullYear()}
            </span>
          </Footer>
        </div>
      </Layout>
    </Layout>
  );
}
