import React from "react";

function Footer() {
  return (
    <footer className="w-full py-4 border-t border-gray-200 dark:border-gray-700 text-center mt-10">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} News AI. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
