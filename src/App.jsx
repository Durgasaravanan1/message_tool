

// import { lazy, Suspense } from "react";
// import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
// import { AuthProvider } from "../src/components/contexts/AuthContext";
// import { Toaster } from "sonner";

// // Layouts (keep these eager as they're needed immediately)
// import Root from "../src/components/layouts/Root";
// import SuperAdminLayout from "../src/components/layouts/SuperAdminLayout";

// // Route Wrappers (keep eager)
// import ProtectedRoute from "./components/ProtectedRoute";
// import PublicRoute from "./components/PublicRoute";

// import Checkoutpage from "./components/pages/settings/checkoutpage";

// // Loading Component
// const PageLoader = () => (
//   <div className="flex items-center justify-center min-h-screen">
//     <div className="flex flex-col items-center gap-3">
//       <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
//       <p className="text-sm text-gray-500">Loading...</p>
//     </div>
//   </div>
// );

// // Lazy load Auth Pages
// const Login = lazy(() => import("./components/pages/auth/Login"));
// const Signup = lazy(() => import("./components/pages/auth/Signup"));
// const Onboarding = lazy(() => import("./components/pages/auth/Onboarding"));

// // Lazy load Main Pages
// const Dashboard = lazy(() => import("./components/pages/Dashboard"));

// // Lazy load Super Admin
// const SuperAdminDashboard = lazy(() => import("./components/pages/superadmin/SuperAdminDashboard"));

// // Lazy load Contacts
// const Contacts = lazy(() => import("./components/pages/contacts/Contacts"));
// const AddContact = lazy(() => import("./components/pages/contacts/AddContact"));
// const UploadContacts = lazy(() => import("./components/pages/contacts/UploadContacts"));
// const Tags = lazy(() => import("./components/pages/contacts/Tags"));

// // Lazy load Campaigns
// const Campaigns = lazy(() => import("./components/pages/campaigns/Campaigns"));
// const CreateCampaign = lazy(() => import("./components/pages/campaigns/CreateCampaign"));
// const CampaignDetails = lazy(() => import("./components/pages/campaigns/CampaignDetails"));

// // Lazy load WhatsApp
// const WhatsApp = lazy(() => import("./components/pages/whatsapp/Whatsapp"));
// const Templates = lazy(() => import("./components/pages/whatsapp/Templates"));
// const MessageLogs = lazy(() => import("./components/pages/whatsapp/MessageLogs"));
// const Flows = lazy(() => import("./components/pages/whatsapp/Flows"));
// const CreateFlow = lazy(() => import("./components/pages/whatsapp/CreateFlow"));
// const WhatsAppSettings = lazy(() => import("./components/pages/whatsapp/WhatsappSettings"));

// // Lazy load Email
// const Email = lazy(() => import("./components/pages/email/Email"));
// const EmailTemplates = lazy(() => import("./components/pages/email/EmailTemplates"));
// const EmailLogs = lazy(() => import("./components/pages/email/EmailLogs"));
// const EmailSettings = lazy(() => import("./components/pages/email/EmailSettings"));

// // Lazy load Others
// const Chatbot = lazy(() => import("./components/pages/chatbot/Chatbot"));
// const Automation = lazy(() => import("./components/pages/automation/Automation"));
// const Inbox = lazy(() => import("./components/pages/inbox/Inbox"));
// const Reports = lazy(() => import("./components/pages/reports/Reports"));
// const Integrations = lazy(() => import("./components/pages/integrations/Integrations"));
// const Settings = lazy(() => import("./components/pages/settings/Settings"));
// const NotFound = lazy(() => import("./components/pages/NotFound"));

// // Wrapper component for lazy loaded routes
// const LazyRoute = ({ children }) => (
//   <Suspense fallback={<PageLoader />}>
//     {children}
//   </Suspense>
// );

// // 🔥 Router
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <ProtectedRoute>
//         <Root />
//       </ProtectedRoute>
//     ),
//     children: [
//       { 
//         index: true, 
//         element: (
//           <LazyRoute>
//             <Dashboard />
//           </LazyRoute>
//         ) 
//       },

//       // Contacts
//       { 
//         path: "contacts", 
//         element: (
//           <LazyRoute>
//             <Contacts />
//           </LazyRoute>
//         ) 
//       },
//       { 
//         path: "contacts/add", 
//         element: (
//           <LazyRoute>
//             <AddContact />
//           </LazyRoute>
//         ) 
//       },
//       { 
//         path: "contacts/upload", 
//         element: (
//           <LazyRoute>
//             <UploadContacts />
//           </LazyRoute>
//         ) 
//       },
//       { 
//         path: "contacts/tags", 
//         element: (
//           <LazyRoute>
//             <Tags />
//           </LazyRoute>
//         ) 
//       },

//       // Campaigns
//       { 
//         path: "campaigns", 
//         element: (
//           <LazyRoute>
//             <Campaigns />
//           </LazyRoute>
//         ) 
//       },
//       { 
//         path: "campaigns/create", 
//         element: (
//           <LazyRoute>
//             <CreateCampaign />
//           </LazyRoute>
//         ) 
//       },
//       { 
//         path: "campaigns/:id", 
//         element: (
//           <LazyRoute>
//             <CampaignDetails />
//           </LazyRoute>
//         ) 
//       },

//       // WhatsApp
//       { 
//         path: "whatsapp", 
//         element: (
//           <LazyRoute>
//             <WhatsApp />
//           </LazyRoute>
//         ) 
//       },
//       { 
//         path: "whatsapp/templates", 
//         element: (
//           <LazyRoute>
//             <Templates />
//           </LazyRoute>
//         ) 
//       },
//       { 
//         path: "whatsapp/logs", 
//         element: (
//           <LazyRoute>
//             <MessageLogs />
//           </LazyRoute>
//         ) 
//       },
//       { 
//         path: "whatsapp/flows", 
//         element: (
//           <LazyRoute>
//             <Flows />
//           </LazyRoute>
//         ) 
//       },
//       { 
//         path: "whatsapp/flows/create", 
//         element: (
//           <LazyRoute>
//             <CreateFlow />
//           </LazyRoute>
//         ) 
//       },
//       { 
//         path: "whatsapp/settings", 
//         element: (
//           <LazyRoute>
//             <WhatsAppSettings />
//           </LazyRoute>
//         ) 
//       },

//       // Email
//       { 
//         path: "email", 
//         element: (
//           <LazyRoute>
//             <Email />
//           </LazyRoute>
//         ) 
//       },
//       { 
//         path: "email/templates", 
//         element: (
//           <LazyRoute>
//             <EmailTemplates />
//           </LazyRoute>
//         ) 
//       },
//       { 
//         path: "email/logs", 
//         element: (
//           <LazyRoute>
//             <EmailLogs />
//           </LazyRoute>
//         ) 
//       },
//       { 
//         path: "email/settings", 
//         element: (
//           <LazyRoute>
//             <EmailSettings />
//           </LazyRoute>
//         ) 
//       },

//       // Others
//       { 
//         path: "chatbot", 
//         element: (
//           <LazyRoute>
//             <Chatbot />
//           </LazyRoute>
//         ) 
//       },
//       { 
//         path: "automation", 
//         element: (
//           <LazyRoute>
//             <Automation />
//           </LazyRoute>
//         ) 
//       },
//       { 
//         path: "inbox", 
//         element: (
//           <LazyRoute>
//             <Inbox />
//           </LazyRoute>
//         ) 
//       },
//       { 
//         path: "reports", 
//         element: (
//           <LazyRoute>
//             <Reports />
//           </LazyRoute>
//         ) 
//       },
//       { 
//         path: "integrations", 
//         element: (
//           <LazyRoute>
//             <Integrations />
//           </LazyRoute>
//         ) 
//       },
//       { 
//         path: "settings", 
//         element: (
//           <LazyRoute>
//             <Settings />
//           </LazyRoute>
//         ) 
//       },
//         { 
//         path: "checkout", 
//         element: (
//           <LazyRoute>
//             <Checkoutpage/>
//           </LazyRoute>
//         ) 
//       },


//       { 
//         path: "*", 
//         element: (
//           <LazyRoute>
//             <NotFound />
//           </LazyRoute>
//         ) 
//       },


//     ],
//   },
//   {
//     path: "/superadmin",
//     element: (
//       <ProtectedRoute requireSuperAdmin>
//         <SuperAdminLayout />
//       </ProtectedRoute>
//     ),
//     children: [
//       { 
//         index: true, 
//         element: (
//           <LazyRoute>
//             <SuperAdminDashboard />
//           </LazyRoute>
//         ) 
//       },
//       { 
//         path: "clients", 
//         element: (
//           <LazyRoute>
//             <SuperAdminDashboard />
//           </LazyRoute>
//         ) 
//       },
//       { 
//         path: "users", 
//         element: (
//           <LazyRoute>
//             <SuperAdminDashboard />
//           </LazyRoute>
//         ) 
//       },
//       { 
//         path: "settings", 
//         element: (
//           <LazyRoute>
//             <SuperAdminDashboard />
//           </LazyRoute>
//         ) 
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: (
//       <PublicRoute>
//         <LazyRoute>
//           <Login />
//         </LazyRoute>
//       </PublicRoute>
//     ),
//   },
//   {
//     path: "/signup",
//     element: (
//       <PublicRoute>
//         <LazyRoute>
//           <Signup />
//         </LazyRoute>
//       </PublicRoute>
//     ),
//   },
//   {
//     path: "/onboarding",
//     element: (
//       <PublicRoute>
//         <LazyRoute>
//           <Onboarding />
//         </LazyRoute>
//       </PublicRoute>
//     ),
//   },
// ]);

// // 🔥 App Component
// export default function App() {
//   return (
//     <AuthProvider>
//       <RouterProvider router={router} />
//       <Toaster position="top-right" richColors />
//     </AuthProvider>
//   );
// }


import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "../src/components/contexts/AuthContext";
import { Toaster } from "sonner";

// Layouts (keep these eager as they're needed immediately)
import Root from "../src/components/layouts/Root";
import SuperAdminLayout from "../src/components/layouts/SuperAdminLayout";

// Route Wrappers (keep eager)
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import WalletCheckout from "./components/pages/WalletCheckout";
import Billing from "./components/pages/Billing";

// Loading Component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      <p className="text-sm text-gray-500">Loading...</p>
    </div>
  </div>
);

// Lazy load Auth Pages
const Login = lazy(() => import("./components/pages/auth/Login"));
const Signup = lazy(() => import("./components/pages/auth/Signup"));
const Onboarding = lazy(() => import("./components/pages/auth/Onboarding"));

// Lazy load Main Pages
const Dashboard = lazy(() => import("./components/pages/Dashboard"));

// Lazy load Super Admin
const SuperAdminDashboard = lazy(() => import("./components/pages/superadmin/SuperAdminDashboard"));

// Lazy load Contacts
const Contacts = lazy(() => import("./components/pages/contacts/Contacts"));
const AddContact = lazy(() => import("./components/pages/contacts/AddContact"));
const UploadContacts = lazy(() => import("./components/pages/contacts/UploadContacts"));
const Tags = lazy(() => import("./components/pages/contacts/Tags"));

// Lazy load Campaigns
const Campaigns = lazy(() => import("./components/pages/campaigns/Campaigns"));
const CreateCampaign = lazy(() => import("./components/pages/campaigns/CreateCampaign"));
const CampaignDetails = lazy(() => import("./components/pages/campaigns/CampaignDetails"));

// Lazy load WhatsApp
const WhatsApp = lazy(() => import("./components/pages/whatsapp/Whatsapp"));
const Templates = lazy(() => import("./components/pages/whatsapp/Templates"));
const MessageLogs = lazy(() => import("./components/pages/whatsapp/MessageLogs"));
const Flows = lazy(() => import("./components/pages/whatsapp/Flows"));
const CreateFlow = lazy(() => import("./components/pages/whatsapp/CreateFlow"));
const WhatsAppSettings = lazy(() => import("./components/pages/whatsapp/WhatsappSettings"));

// Lazy load Email
const Email = lazy(() => import("./components/pages/email/Email"));
const EmailTemplates = lazy(() => import("./components/pages/email/EmailTemplates"));
const EmailLogs = lazy(() => import("./components/pages/email/EmailLogs"));
const EmailSettings = lazy(() => import("./components/pages/email/EmailSettings"));

// Lazy load Others
const Chatbot = lazy(() => import("./components/pages/chatbot/Chatbot"));
const Automation = lazy(() => import("./components/pages/automation/Automation"));
const Inbox = lazy(() => import("./components/pages/inbox/Inbox"));
const Reports = lazy(() => import("./components/pages/reports/Reports"));
const Integrations = lazy(() => import("./components/pages/integrations/Integrations"));
const Settings = lazy(() => import("./components/pages/settings/Settings"));
const NotFound = lazy(() => import("./components/pages/NotFound"));

// Lazy load Checkout Page
const MechBootcampCheckoutPage = lazy(() => import("./components/pages/settings/checkoutpage"));

// Wrapper component for lazy loaded routes
const LazyRoute = ({ children }) => (
  <Suspense fallback={<PageLoader />}>
    {children}
  </Suspense>
);

// 🔥 Router
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    children: [
      { 
        index: true, 
        element: (
          <LazyRoute>
            <Dashboard />
          </LazyRoute>
        ) 
      },
      // Contacts
      { 
        path: "contacts", 
        element: (
          <LazyRoute>
            <Contacts />
          </LazyRoute>
        ) 
      },
      { 
        path: "contacts/add", 
        element: (
          <LazyRoute>
            <AddContact />
          </LazyRoute>
        ) 
      },
      { 
        path: "contacts/upload", 
        element: (
          <LazyRoute>
            <UploadContacts />
          </LazyRoute>
        ) 
      },
      { 
        path: "contacts/tags", 
        element: (
          <LazyRoute>
            <Tags />
          </LazyRoute>
        ) 
      },
      // Campaigns
      { 
        path: "campaigns", 
        element: (
          <LazyRoute>
            <Campaigns />
          </LazyRoute>
        ) 
      },
      { 
        path: "campaigns/create", 
        element: (
          <LazyRoute>
            <CreateCampaign />
          </LazyRoute>
        ) 
      },
      { 
        path: "campaigns/:id", 
        element: (
          <LazyRoute>
            <CampaignDetails />
          </LazyRoute>
        ) 
      },
      // WhatsApp
      { 
        path: "whatsapp", 
        element: (
          <LazyRoute>
            <WhatsApp />
          </LazyRoute>
        ) 
      },
      { 
        path: "whatsapp/templates", 
        element: (
          <LazyRoute>
            <Templates />
          </LazyRoute>
        ) 
      },
      { 
        path: "whatsapp/logs", 
        element: (
          <LazyRoute>
            <MessageLogs />
          </LazyRoute>
        ) 
      },
      { 
        path: "whatsapp/flows", 
        element: (
          <LazyRoute>
            <Flows />
          </LazyRoute>
        ) 
      },
      { 
        path: "whatsapp/flows/create", 
        element: (
          <LazyRoute>
            <CreateFlow />
          </LazyRoute>
        ) 
      },
      { 
        path: "whatsapp/settings", 
        element: (
          <LazyRoute>
            <WhatsAppSettings />
          </LazyRoute>
        ) 
      },
      // Email
      { 
        path: "email", 
        element: (
          <LazyRoute>
            <Email />
          </LazyRoute>
        ) 
      },
      { 
        path: "email/templates", 
        element: (
          <LazyRoute>
            <EmailTemplates />
          </LazyRoute>
        ) 
      },
      { 
        path: "email/logs", 
        element: (
          <LazyRoute>
            <EmailLogs />
          </LazyRoute>
        ) 
      },
      { 
        path: "email/settings", 
        element: (
          <LazyRoute>
            <EmailSettings />
          </LazyRoute>
        ) 
      },
      // Others
      { 
        path: "chatbot", 
        element: (
          <LazyRoute>
            <Chatbot />
          </LazyRoute>
        ) 
      },
      { 
        path: "automation", 
        element: (
          <LazyRoute>
            <Automation />
          </LazyRoute>
        ) 
      },
      { 
        path: "inbox", 
        element: (
          <LazyRoute>
            <Inbox />
          </LazyRoute>
        ) 
      },
      { 
        path: "reports", 
        element: (
          <LazyRoute>
            <Reports />
          </LazyRoute>
        ) 
      },
      { 
        path: "integrations", 
        element: (
          <LazyRoute>
            <Integrations />
          </LazyRoute>
        ) 
      },
      { 
        path: "settings", 
        element: (
          <LazyRoute>
            <Settings />
          </LazyRoute>
        ) 
      },
      { 
        path: "*", 
        element: (
          <LazyRoute>
            <NotFound />
          </LazyRoute>
        ) 
      },
    ],
  },
  {
    path: "/superadmin",
    element: (
      <ProtectedRoute requireSuperAdmin>
        <SuperAdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { 
        index: true, 
        element: (
          <LazyRoute>
            <SuperAdminDashboard />
          </LazyRoute>
        ) 
      },
      { 
        path: "clients", 
        element: (
          <LazyRoute>
            <SuperAdminDashboard />
          </LazyRoute>
        ) 
      },
      { 
        path: "users", 
        element: (
          <LazyRoute>
            <SuperAdminDashboard />
          </LazyRoute>
        ) 
      },
      { 
        path: "settings", 
        element: (
          <LazyRoute>
            <SuperAdminDashboard />
          </LazyRoute>
        ) 
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LazyRoute>
          <Login />
        </LazyRoute>
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <LazyRoute>
          <Signup />
        </LazyRoute>
      </PublicRoute>
    ),
  },
  {
    path: "/onboarding",
    element: (
      <PublicRoute>
        <LazyRoute>
          <Onboarding />
        </LazyRoute>
      </PublicRoute>
    ),
  },
  {
    path: "/checkout",
    element: (
      <LazyRoute>
        <MechBootcampCheckoutPage />
      </LazyRoute>
    ),
  },
  {
   path:"/wallet/checkout" ,
    element: (
      <LazyRoute>
        <WalletCheckout/>
      </LazyRoute>
    ),
  },
   {
   path:"/billing" ,
    element: (
      <LazyRoute>
        <Billing/>
      </LazyRoute>
    ),
  },

  {
    path: "/mech-bootcamp-checkout",
    element: (
      <LazyRoute>
        <MechBootcampCheckoutPage />
      </LazyRoute>
    ),
  },
]);

// 🔥 App Component
export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}