import React, { ReactNode, useEffect } from "react";
import { Helmet } from "react-helmet"; // import link and head tag
import "/src/assets/admin/css/vertical-layout-light/style.css";
import "/src/assets/admin/vendors/css/vendor.bundle.base.css";
import "/src/assets/admin/vendors/datatables.net-bs4/dataTables.bootstrap4.css";
import Content from "../../components/admin/Content";

// Define the type for props
/*interface AdminProps {
  children: ReactNode;
}*/

const Admin: React.FC = () => {
  useEffect(() => {
    // Load scripts dynamically
    const scripts = [
      "/src/assets/admin/vendors/js/vendor.bundle.base.js",
      "/src/assets/admin/vendors/bootstrap-datepicker/bootstrap-datepicker.min.js",
      "/src/assets/admin/vendors/chart.js/Chart.min.js",
      "/src/assets/admin/vendors/progressbar.js/progressbar.min.js",
      "/src/assets/admin/js/off-canvas.js",
      "/src/assets/admin/js/hoverable-collapse.js",
      "/src/assets/admin/js/template.js",
      "/src/assets/admin/js/settings.js",
      "/src/assets/admin/js/todolist.js",
      "/src/assets/admin/js/jquery.cookie.js",
      "/src/assets/admin/js/dashboard.js",
      "/src/assets/admin/js/proBanner.js",
    ];

    const scriptElements = scripts.map((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
      return script;
    });

    return () => {
      // Cleanup scripts when component unmounts
      scriptElements.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin</title>
        <link rel="shortcut icon" href="/src/assets/admin/images/favicon.png" />
      </Helmet>
      <div className="container-scroller">
        <Content />
      </div>
    </>
  );
};

export default Admin;
