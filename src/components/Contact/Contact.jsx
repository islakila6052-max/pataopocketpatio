import { MapPin, Phone, Mail } from 'lucide-react';
import { PHONE, EMAIL, ADDRESS } from '../../constants/navigation';
import SectionTitle from '../ui/SectionTitle';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';

/**
 * Contact section — two-column layout with info + form.
 */
export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // placeholder — backend integration later
  };

  return (
    <section id="contact" className="bg-primary-50 section-padding">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14">
        {/* Contact Info */}
        <div>
          <SectionTitle>Get in Touch</SectionTitle>

          <div className="space-y-5 mt-6">
            <div className="flex items-center gap-4 text-primary-800">
              <div className="w-11 h-11 rounded-2xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-primary-700" strokeWidth={1.8} />
              </div>
              <span className="text-base font-medium">{ADDRESS}</span>
            </div>

            <div className="flex items-center gap-4 text-primary-800">
              <div className="w-11 h-11 rounded-2xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-primary-700" strokeWidth={1.8} />
              </div>
              <span className="text-base font-medium">{PHONE}</span>
            </div>

            <div className="flex items-center gap-4 text-primary-800">
              <div className="w-11 h-11 rounded-2xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-primary-700" strokeWidth={1.8} />
              </div>
              <span className="text-base font-medium">{EMAIL}</span>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-8 bg-primary-200/60 rounded-4xl h-52 flex items-center justify-center text-primary-800 font-medium border border-primary-200">
            <div className="text-center">
              <MapPin size={32} className="mx-auto mb-2 text-primary-600" strokeWidth={1.5} />
              <span className="text-sm">Google Maps — Find us here</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="text-2xl font-semibold text-primary-900 mb-6">
            Send a Message
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="text" placeholder="Your Name" required />
            <Input type="email" placeholder="Your Email" required />
            <Textarea rows={4} placeholder="Your Message" required />
            <Button type="submit" className="w-full sm:w-auto">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
