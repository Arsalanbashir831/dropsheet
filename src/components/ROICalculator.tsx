
import { useState, useEffect } from "react";
import { Clock, Coins, ShoppingBag } from "lucide-react";

const ROICalculator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [orders, setOrders] = useState(0);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("roi-calculator");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Animate the numbers
      const minutesInterval = setInterval(() => {
        setMinutes(prev => (prev < 15 ? prev + 1 : prev));
      }, 100);

      const ordersInterval = setInterval(() => {
        setOrders(prev => (prev < 50 ? prev + 1 : prev));
      }, 60);

      const savingsInterval = setInterval(() => {
        setSavings(prev => (prev < 16250 ? prev + 250 : prev));
      }, 30);

      return () => {
        clearInterval(minutesInterval);
        clearInterval(ordersInterval);
        clearInterval(savingsInterval);
      };
    }
  }, [isVisible]);

  return (
    <section className="section-padding bg-gradient-to-br from-red-50 to-orange-50">
      <div className="page-container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Hidden Costs Calculator</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See exactly what manual work is costing your business
          </p>
        </div>

        <div id="roi-calculator" className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-orange-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">{minutes} minutes</div>
              <p className="text-gray-600">
                per order to manually copy email data into spreadsheets
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{orders} orders</div>
              <p className="text-gray-600">
                per week for typical small business
              </p>
              <p className="text-blue-600 mt-2 font-medium">
                = 12.5 hours of manual work weekly
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-green-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Coins className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">${savings.toLocaleString()}</div>
              <p className="text-gray-600">
                lost per year at $25/hour value
              </p>
              <p className="text-red-500 mt-2 font-medium">
                That's pure profit bleeding away!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
