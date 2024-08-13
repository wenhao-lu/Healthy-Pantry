function About() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
        <p className="mt-2 text-lg text-gray-600">
          Learn more about our mission and values
        </p>
      </header>

      <section className="max-w-4xl rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Our Story</h2>
        <p className="leading-relaxed text-gray-700">
          Our journey began with a simple idea: to make healthy eating more
          accessible and enjoyable for everyone. We believe in the power of
          nutritious food and are committed to helping people make better
          choices in their diet.
        </p>

        <h2 className="mb-4 mt-6 text-2xl font-semibold text-gray-800">
          Our Mission
        </h2>
        <p className="leading-relaxed text-gray-700">
          We strive to provide the best resources and tools for healthy living.
          Our mission is to empower individuals to lead healthier lives by
          offering easy access to nutritional information, delicious recipes,
          and practical tips for maintaining a balanced diet.
        </p>

        <h2 className="mb-4 mt-6 text-2xl font-semibold text-gray-800">
          Our Values
        </h2>
        <ul className="list-inside list-disc text-gray-700">
          <li>
            Health and Wellness: Prioritizing the well-being of our users.
          </li>
          <li>Transparency: Providing clear and accurate information.</li>
          <li>
            Innovation: Continuously improving our platform to better serve our
            community.
          </li>
          <li>
            Sustainability: Encouraging eco-friendly practices in our
            operations.
          </li>
        </ul>
      </section>

      {/* 
      <footer className="mt-8 text-center text-gray-600">
        <p>&copy; 2024 Healthy Pantry. All rights reserved.</p>
      </footer>
      */}
    </div>
  );
}

export default About;
