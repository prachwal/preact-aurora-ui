import { render } from "preact";

import { App } from "./app";
import "./styles/global.scss";
import "./components/ThemeProvider/theme.scss";

render(<App />, document.getElementById("app")!);
