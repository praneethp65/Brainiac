import { Mail } from "../icons/Mail";
import { Github } from "../icons/Github";

function Footer() {
  const socialLinks = [
    {
      icon: <Github />,
      href: "https://github.com/praneethp65/Brainiac",
      label: "Github",
    },
    {
      icon: <Mail />,
      href: "mailto:praneethp65@gmail.com",
      label: "Email",
    },
  ];

  return (
    <footer className="bg-primary-bg text-white relative bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-between">
          <div className="space-y-4">
            <h3 className="text-xl text-gray-100 font-medium">
              <span className="text-gray-100 font-semibold"></span>
              <span className="text-purple-800 font-semibold">Brainiac</span>
            </h3>
            <p className="text-gray-100">
              Start storing and retrieving your information more effectively
              today.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl text-gray-100 font-semibold">Contact -</h3>
            <div className="flex gap-4 items-center">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-100 transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-black-700/40 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-100">
            © {new Date().getFullYear()} Brainiac.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
