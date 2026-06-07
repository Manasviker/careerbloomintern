/* import React from 'react'*/


/* Footer Section Component */

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">

        {/* Top Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">

          <FooterSection
            title="Internship by places"
            items={[
              "Pune",
              "Mumbai",
              "Thane",
              "Bengluru",
              "Goa",
              "Kolhapur",
            ]}
          />

          <FooterSection
            title="Internship by stream"
            items={[
              "About us",
              "Careers",
              "Press",
              "News",
              "Media kit",
              "Contact",
            ]}
          />

          <FooterSection
            title="Job Places"
            items={[
              "Blog",
              "Newsletter",
              "Events",
              "Help center",
              "Tutorials",
              "Supports",
            ]}
          />

          <FooterSection
            title="Jobs by streams"
            items={[
              "Startups",
              "Enterprise",
              "Government",
              "SaaS",
              "Marketplaces",
              "Ecommerce",
            ]}
          />
        </div>

        {/* Divider */}
        <hr className="my-10 border-gray-600" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center">

          {/* Button */}
          <p className="flex items-center gap-2 border border-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700">
            Get Android App
          </p>

          {/* Social Links */}
          <div className="flex gap-6 mt-4 sm:mt-0 text-sm">

            <a
              href="https://facebook.com/careerbloom"
              target="_blank"
              className="hover:text-blue-400"
            >
              Facebook
            </a>

            <a
              href="https://twitter.com/careerbloom"
              target="_blank"
              className="hover:text-blue-400"
            >
              Twitter
            </a>

            <a
              href="https://instagram.com/careerbloom"
              target="_blank"
              className="hover:text-pink-400"
            >
              Instagram
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              className="hover:text-red-400"
            >
              YouTube
            </a>

          </div>

          {/* Copyright */}
          <p className="mt-4 sm:mt-0 text-sm text-gray-800">
            © Copyright 2026. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* Footer Section Component */

function FooterSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <h2 className="font-semibold mb-3">{title}</h2>

      <ul className="space-y-2 text-gray-800">
        {items.map((item, index) => (
          <li
            key={index}
            className="hover:text-white cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
/* const Fotter = () => {
  return (
    <div>
      
    </div>
  )
}

export default Fotter*/
