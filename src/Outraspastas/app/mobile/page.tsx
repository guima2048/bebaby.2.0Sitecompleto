import Header from '../components/Header';
import Hero from '../components/Hero';
import Card from '../components/Card';
import Footer from '../components/Footer';

export default function MobilePage() {
  return (
    <main className="max-w-md mx-auto">
      <Header />
      
      <Hero />

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">
            Our Features
          </h2>
          <div className="space-y-4">
            <Card
              title="Feature 1"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
            <Card
              title="Feature 2"
              description="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <Card
              title="Feature 3"
              description="Ut enim ad minim veniam, quis nostrud exercitation ullamco."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">
            Pricing Plans
          </h2>
          <div className="space-y-4">
            <Card
              title="Basic"
              description="Perfect for getting started"
              price="$9/month"
              features={[
                'Feature 1',
                'Feature 2',
                'Feature 3'
              ]}
            >
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </Card>
            <Card
              title="Pro"
              description="Best for professionals"
              price="$29/month"
              features={[
                'All Basic features',
                'Pro Feature 1',
                'Pro Feature 2'
              ]}
              className="border-blue-600"
            >
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </Card>
            <Card
              title="Enterprise"
              description="For large organizations"
              price="$99/month"
              features={[
                'All Pro features',
                'Enterprise Feature 1',
                'Enterprise Feature 2'
              ]}
            >
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 