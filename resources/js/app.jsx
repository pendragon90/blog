import "./bootstrap";
import "../css/app.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "dayjs/locale/id";

import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { DatesProvider } from "@mantine/dates";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx"),
        ),

    setup({ el, App, props }) {
        createRoot(el).render(
            <MantineProvider>
                <Notifications />
                <ModalsProvider>
                    <DatesProvider
                        settings={{
                            locale: "id",
                            firstDayOfWeek: 0,
                            weekendDays: [0],
                            timezone: "utc",
                        }}
                    >
                        <App {...props} />
                    </DatesProvider>
                </ModalsProvider>
            </MantineProvider>,
        );
    },
});
