-- Insert pricing plans
INSERT INTO pricing_plans (name, price_ghs, price_usd, billing_period, features, is_popular) VALUES
('Starter', 1188.00, 99.00, 'monthly', ARRAY['Basic Website Design', 'Mobile Responsive', '5 Pages', 'Contact Form', 'Basic SEO', '1 Month Support'], false),
('Pro', 2988.00, 249.00, 'monthly', ARRAY['Advanced Website Design', 'Mobile Responsive', '10 Pages', 'Contact Form', 'Advanced SEO', 'AI Chatbot Integration', 'Analytics Dashboard', '3 Months Support', 'Content Management'], true),
('Enterprise', 0.00, 0.00, 'custom', ARRAY['Custom Solution', 'Unlimited Pages', 'Advanced AI Features', 'Custom Integrations', 'Priority Support', 'Dedicated Account Manager', '12 Months Support', 'Training & Consultation'], false);

-- Insert add-ons
INSERT INTO add_ons (name, description, price_ghs, price_usd) VALUES
('Extra Page', 'Additional custom page design', 588.00, 49.00),
('AI Chatbot', 'Intelligent customer support bot', 1188.00, 99.00),
('Admin Dashboard', 'Content management system', 2388.00, 199.00),
('Copywriting', 'Professional content writing', 1068.00, 89.00),
('Maintenance', 'Monthly website maintenance', 1188.00, 99.00),
('Deployment + Domain', 'Hosting setup and domain', 708.00, 59.00);

-- Insert testimonials
INSERT INTO testimonials (name, company, role, content, rating, is_featured) VALUES
('Sarah Johnson', 'TechStart Ghana', 'CEO', 'Ai Nest transformed our digital presence completely. Their AI integration saved us countless hours and the website design is absolutely stunning.', 5, true),
('Michael Asante', 'Accra Innovations', 'CTO', 'The team at Ai Nest delivered beyond our expectations. The custom AI solutions they built for us increased our efficiency by 300%.', 5, true),
('Akosua Mensah', 'Creative Hub', 'Founder', 'Professional, innovative, and reliable. Ai Nest helped us launch our platform with cutting-edge AI features that our competitors still don''t have.', 5, false),
('David Osei', 'Digital Solutions Ltd', 'Marketing Director', 'Their expertise in both AI and web development is unmatched. The ROI we''ve seen from their solutions is incredible.', 5, false);

-- Insert case studies
INSERT INTO case_studies (title, description, client, category, technologies, is_featured) VALUES
('E-commerce AI Assistant', 'Built an intelligent shopping assistant that increased conversion rates by 45% through personalized product recommendations and real-time customer support.', 'ShopSmart Ghana', 'AI Integration', ARRAY['Next.js', 'OpenAI', 'Supabase', 'Stripe'], true),
('Healthcare Management System', 'Developed a comprehensive patient management system with AI-powered diagnosis assistance and appointment scheduling.', 'MedCare Clinic', 'Web Development', ARRAY['React', 'Node.js', 'PostgreSQL', 'TensorFlow'], true),
('Brand Identity & Website', 'Complete brand overhaul including logo design, brand guidelines, and a modern website that reflects the company''s innovative spirit.', 'InnovateTech', 'Branding', ARRAY['Figma', 'Next.js', 'Framer Motion', 'Tailwind CSS'], false),
('AI Content Generator', 'Custom AI tool for generating marketing content, reducing content creation time by 80% while maintaining brand consistency.', 'ContentPro Agency', 'Custom Software', ARRAY['Python', 'OpenAI', 'FastAPI', 'React'], false);

-- Insert team members
INSERT INTO team_members (name, role, bio, sort_order) VALUES
('Kwame Asante', 'Founder & CEO', 'AI enthusiast and full-stack developer with 8+ years of experience building innovative digital solutions.', 1),
('Ama Osei', 'Lead Designer', 'Creative director specializing in user experience design and brand identity with a passion for minimalist aesthetics.', 2),
('Kofi Mensah', 'AI Engineer', 'Machine learning expert focused on developing practical AI solutions for businesses across various industries.', 3),
('Akua Boateng', 'Project Manager', 'Experienced project manager ensuring smooth delivery of complex digital projects on time and within budget.', 4);

-- Insert blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, author, category, tags, is_published, published_at) VALUES
('The Future of AI in Web Development', 'future-of-ai-web-development', 'Exploring how artificial intelligence is revolutionizing the way we build and interact with websites.', 'Artificial Intelligence is transforming every aspect of web development. From automated code generation to intelligent user interfaces, AI is making websites smarter and more intuitive than ever before.

## The Current State of AI in Web Development

Today''s web developers are already leveraging AI tools for various tasks:
- Code completion and generation
- Automated testing and debugging
- Content optimization and personalization
- User experience enhancement

## What''s Coming Next

The future holds even more exciting possibilities:
- AI-powered design systems that adapt to user preferences
- Intelligent content management that updates based on user behavior
- Automated accessibility improvements
- Real-time performance optimization

## Preparing for the AI Revolution

To stay ahead in this rapidly evolving landscape, developers should:
1. Embrace AI tools and integrate them into their workflow
2. Focus on understanding AI capabilities and limitations
3. Develop skills in prompt engineering and AI model integration
4. Stay updated with the latest AI developments in web technology

The future of web development is not about replacing developers with AI, but about empowering developers with AI to create better, smarter, and more efficient web experiences.', 'Kwame Asante', 'AI', ARRAY['AI', 'Web Development', 'Future Tech'], true, NOW() - INTERVAL '7 days'),

('Building Responsive Designs in 2024', 'responsive-design-2024', 'Best practices and modern techniques for creating websites that work perfectly on all devices.', 'Responsive design has evolved significantly over the years. What started as a simple approach to make websites work on mobile devices has become a sophisticated discipline that considers everything from screen sizes to user contexts.

## Modern Responsive Design Principles

### 1. Mobile-First Approach
Starting with mobile designs ensures that your website works well on the most constrained devices first, then progressively enhances for larger screens.

### 2. Flexible Grid Systems
Modern CSS Grid and Flexbox provide powerful tools for creating layouts that adapt naturally to different screen sizes.

### 3. Fluid Typography
Using relative units like rem, em, and viewport units ensures that text scales appropriately across devices.

### 4. Adaptive Images
Implementing responsive images with srcset and sizes attributes ensures optimal loading performance across devices.

## Tools and Techniques for 2024

- **Container Queries**: The new CSS feature that allows components to respond to their container size rather than viewport size
- **CSS Subgrid**: Enhanced grid capabilities for more complex layouts
- **Intrinsic Web Design**: Designing with the web''s natural flexibility in mind
- **Progressive Enhancement**: Building core functionality first, then adding enhancements

## Testing and Optimization

Regular testing across real devices and using tools like Chrome DevTools'' device emulation ensures your responsive designs work as intended.

Remember: responsive design is not just about screen sizes—it''s about creating experiences that work well in any context.', 'Ama Osei', 'Design', ARRAY['Design', 'Responsive', 'CSS'], true, NOW() - INTERVAL '14 days'),

('Why Your Business Needs an AI Chatbot', 'business-ai-chatbot', 'Discover how AI chatbots can improve customer service and boost your business growth.', 'Customer service is the backbone of any successful business. In today''s fast-paced digital world, customers expect instant responses and 24/7 availability. This is where AI chatbots come in as game-changers for businesses of all sizes.

## The Business Case for AI Chatbots

### 24/7 Customer Support
Unlike human agents, AI chatbots never sleep. They can handle customer inquiries at any time of day, ensuring your business never misses an opportunity to help a customer.

### Cost Efficiency
A single AI chatbot can handle hundreds of conversations simultaneously, significantly reducing the need for large customer service teams while maintaining high-quality support.

### Instant Response Times
Customers no longer have to wait in queues or for email responses. AI chatbots provide immediate answers to common questions and can escalate complex issues to human agents when necessary.

## Key Benefits for Your Business

1. **Increased Customer Satisfaction**: Quick, accurate responses lead to happier customers
2. **Lead Generation**: Chatbots can qualify leads and collect contact information
3. **Sales Support**: Guide customers through the buying process with personalized recommendations
4. **Data Collection**: Gather valuable insights about customer preferences and pain points

## Implementation Best Practices

### Start Simple
Begin with handling frequently asked questions and gradually expand the chatbot''s capabilities based on user interactions and feedback.

### Maintain Human Touch
Always provide an option to connect with a human agent for complex issues or when customers prefer human interaction.

### Regular Updates
Continuously improve your chatbot based on conversation logs and customer feedback.

## Choosing the Right Solution

When selecting an AI chatbot solution, consider:
- Integration capabilities with your existing systems
- Customization options to match your brand
- Analytics and reporting features
- Scalability for future growth

## Getting Started

The best time to implement an AI chatbot was yesterday; the second-best time is now. Start by identifying your most common customer inquiries and build from there.

At Ai Nest, we specialize in creating custom AI chatbot solutions that integrate seamlessly with your business processes. Contact us to learn how we can help transform your customer service experience.', 'Kofi Mensah', 'AI', ARRAY['AI', 'Chatbots', 'Business'], true, NOW() - INTERVAL '21 days');
