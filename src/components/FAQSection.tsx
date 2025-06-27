
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does SheetDrop access my emails?",
    answer: "SheetDrop uses Google's secure OAuth authentication system to connect to your Gmail account. We only access emails that match your filter criteria and never store your email content on our servers."
  },
  {
    question: "What parts of an email can SheetDrop filter and extract?",
    answer: "SheetDrop can filter based on sender email, subject keywords, body content, and attachment presence. You can create powerful combinations of these filters to extract exactly the data you need from your emails."
  },
  {
    question: "How do I set up a filter to extract data from email bodies?",
    answer: "When creating a filter, you can specify keywords to look for in the email body. For example, you can extract order IDs, payment details, or delivery information by providing the relevant keywords in the body filter section."
  },
  {
    question: "What integrations does SheetDrop support?",
    answer: "Currently, SheetDrop integrates with Google Sheets. We're actively developing integrations with Notion and Airtable, which will be available soon. These integrations will allow you to send your email data directly to your preferred productivity tool."
  },
  {
    question: "How often does SheetDrop sync my emails?",
    answer: "SheetDrop offers real-time syncing for immediate updates, ensuring your data is always current."
  },
  {
    question: "What happens if I exceed my monthly email limit?",
    answer: "We'll notify you when you're approaching your limit. Any emails beyond your plan limit won't be synced until the next billing cycle or until you upgrade your plan."
  },
  {
    question: "Can I use SheetDrop with multiple email accounts?",
    answer: "Multiple Gmail account support is coming soon! We're working on this feature and it will be available in an upcoming update. Currently, SheetDrop works with one Gmail account per user."
  },
  {
    question: "Is my data secure with SheetDrop?",
    answer: "Absolutely. We use industry-standard security practices and never store your email passwords. We only process the specific emails that match your filters and transfer that data securely to your Google Sheets."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="section-padding">
      <div className="page-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">
            Got questions? We've got answers. If you can't find what you're looking for,
            feel free to contact our support team.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
