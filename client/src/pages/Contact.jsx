import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const contactInfo = [
    {
      icon: <FaEnvelope size={40} />,
      title: 'Email',
      details: ['support@example.com', 'sales@example.com'],
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: <FaPhoneAlt size={40} />,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 765-4321'],
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: <FaMapMarkerAlt size={40} />,
      title: 'Address',
      details: ['123 Commerce Street', 'Silicon Valley, CA 94025'],
      color: 'text-red-600 bg-red-100'
    }
  ];

  return (
    <div className="py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Contact Form Section */}
          <div className="md:col-span-7">
            <h1 className="text-3xl font-bold mb-6">Get in Touch</h1>
            <div className="bg-white shadow-lg rounded-xl p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="border rounded-md px-4 py-2 w-full" />
                <input type="text" placeholder="Last Name" className="border rounded-md px-4 py-2 w-full" />
              </div>
              <div className="mt-4">
                <input type="email" placeholder="Email" className="border rounded-md px-4 py-2 w-full" />
              </div>
              <div className="mt-4">
                <input type="text" placeholder="Subject" className="border rounded-md px-4 py-2 w-full" />
              </div>
              <div className="mt-4">
                <textarea rows="4" placeholder="Message" className="border rounded-md px-4 py-2 w-full"></textarea>
              </div>
              <div className="mt-6">
                <button className="bg-blue-600 text-white flex items-center gap-2 px-6 py-3 rounded-md hover:bg-blue-700 transition-all">
                  Send Message <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="md:col-span-5">
            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>

            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className="flex items-start gap-4 p-4 bg-white shadow-md rounded-lg transform transition-transform hover:-translate-y-1 group"
                >
                  <div
                    className={`p-3 rounded-xl transition-all group-hover:scale-110 ${info.color}`}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{info.title}</h3>
                    {info.details.map((detail, index) => (
                      <p key={index} className="text-gray-600">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="bg-white shadow-md rounded-lg mt-6 p-4">
              <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
              <div className="grid grid-cols-2 gap-y-2 text-gray-700">
                <p>Monday - Friday:</p>
                <p>9:00 AM - 6:00 PM</p>
                <p>Saturday:</p>
                <p>10:00 AM - 4:00 PM</p>
                <p>Sunday:</p>
                <p>Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
