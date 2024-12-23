import "./sentry.ts";

import app from "./app/app.ts";
import config from "./app/config/config.ts";

const { PORT } = config;

app.listen(PORT, () => console.log(`Server is running on ${PORT}...`));
