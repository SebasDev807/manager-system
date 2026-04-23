import { envs } from "./envs.config";
import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Manager System API",
            version: "1.0.0",
            description: "Manager System API documentation"
        },
        servers: [
            {
                url: `http://localhost:${envs.PORT}/api/v1`,
                description: "Development server"
            }
        ]
    },
    apis: ["./src/**/**/*.routes.ts"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const scalarOptions: any = {
    theme: "none",          
    spec: {
        content: swaggerDocs
    },
    showSidebar: true,
    hideDocumentation: false,
    layout: "classic",
    defaultOpenAllTags: true,
    metaData: {
        title: "Manager System API",
        description: "API Documentation",
        ogDescription: "Manager System API",
    },
    customCss: `
        /* ===== TOKYO NIGHT — BASE ===== */
        :root {
            /* Fondos */
            --scalar-background-1: #1a1b2e;
            --scalar-background-2: #16213e;
            --scalar-background-3: #0f3460;
            --scalar-background-accent: #1a1b2e;

            /* Texto */
            --scalar-color-1: #c0caf5;
            --scalar-color-2: #a9b1d6;
            --scalar-color-3: #565f89;
            --scalar-color-accent: #7aa2f7;

            /* Sidebar */
            --scalar-sidebar-background-1: #16213e;
            --scalar-sidebar-color-1: #c0caf5;
            --scalar-sidebar-color-2: #a9b1d6;
            --scalar-sidebar-border-color: #1e2030;
            --scalar-sidebar-item-hover-background: #0f3460;
            --scalar-sidebar-item-active-background: #0f3460;

            /* Bordes */
            --scalar-border-color: #1e2030;
            --scalar-border-radius: 8px;

            /* Colores semánticos */
            --scalar-color-green: #9ece6a;
            --scalar-color-red: #f7768e;
            --scalar-color-yellow: #e0af68;
            --scalar-color-blue: #7aa2f7;
            --scalar-color-orange: #ff9e64;
            --scalar-color-purple: #bb9af7;
            --scalar-color-cyan: #7dcfff;

            /* Métodos HTTP */
            --scalar-color-http-get: #9ece6a;
            --scalar-color-http-post: #7aa2f7;
            --scalar-color-http-put: #e0af68;
            --scalar-color-http-delete: #f7768e;
            --scalar-color-http-patch: #bb9af7;

            /* Tipografía */
            --scalar-font: 'JetBrains Mono', 'Fira Code', monospace;
            --scalar-font-code: 'JetBrains Mono', monospace;
            --scalar-font-size-1: 14px;
            --scalar-font-size-2: 13px;
            --scalar-font-size-3: 12px;

            /* Scrollbar */
            scrollbar-color: #565f89 #16213e;
            scrollbar-width: thin;
        }

        /* ===== SCROLLBAR WEBKIT ===== */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #16213e;
        }
        ::-webkit-scrollbar-thumb {
            background: #565f89;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #7aa2f7;
        }

        /* ===== HEADER / NAVBAR ===== */
        .scalar-app-header {
            background: #16213e !important;
            border-bottom: 1px solid #1e2030 !important;
        }

        /* ===== SIDEBAR ===== */
        .sidebar {
            background: #16213e !important;
            border-right: 1px solid #1e2030 !important;
        }
        .sidebar-item:hover {
            background: #0f3460 !important;
            color: #7aa2f7 !important;
        }
        .sidebar-item.active {
            background: #0f3460 !important;
            color: #7aa2f7 !important;
            border-left: 2px solid #7aa2f7;
        }

        /* ===== BLOQUES DE CÓDIGO ===== */
        .code-block, pre, code {
            background: #16213e !important;
            border: 1px solid #1e2030 !important;
            border-radius: 8px !important;
            font-family: 'JetBrains Mono', monospace !important;
            font-size: 13px !important;
        }

        /* ===== BOTÓN "TRY IT" / SEND ===== */
        .scalar-button-primary,
        button[data-test="send-request-button"] {
            background: #7aa2f7 !important;
            color: #1a1b2e !important;
            border-radius: 6px !important;
            font-weight: 600 !important;
            transition: background 0.2s ease;
        }
        .scalar-button-primary:hover {
            background: #bb9af7 !important;
        }

        /* ===== BADGES DE MÉTODOS HTTP ===== */
        .get .method-badge    { background: #9ece6a22; color: #9ece6a; border: 1px solid #9ece6a55; }
        .post .method-badge   { background: #7aa2f722; color: #7aa2f7; border: 1px solid #7aa2f755; }
        .put .method-badge    { background: #e0af6822; color: #e0af68; border: 1px solid #e0af6855; }
        .delete .method-badge { background: #f7768e22; color: #f7768e; border: 1px solid #f7768e55; }
        .patch .method-badge  { background: #bb9af722; color: #bb9af7; border: 1px solid #bb9af755; }

        /* ===== INPUTS (parámetros / body) ===== */
        input, textarea, select {
            background: #16213e !important;
            border: 1px solid #1e2030 !important;
            color: #c0caf5 !important;
            border-radius: 6px !important;
            transition: border-color 0.2s ease;
        }
        input:focus, textarea:focus {
            border-color: #7aa2f7 !important;
            outline: none !important;
        }

        /* ===== RESPONSE STATUS ===== */
        .response-status-2xx { color: #9ece6a !important; }
        .response-status-4xx { color: #f7768e !important; }
        .response-status-5xx { color: #e0af68 !important; }

        /* ===== SECCIÓN PRINCIPAL ===== */
        .scalar-content {
            background: #1a1b2e !important;
        }

        /* ===== TAGS / GRUPOS ===== */
        .section-header {
            border-bottom: 1px solid #1e2030 !important;
            color: #bb9af7 !important;
            font-weight: 600 !important;
            letter-spacing: 0.05em;
        }
    `,
};