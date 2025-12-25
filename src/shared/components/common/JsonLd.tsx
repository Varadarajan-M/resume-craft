/**
 * Component to inject JSON-LD structured data into the head for better SEO.
 * This helps search engines understand the content and display rich snippets.
 */
const JsonLd = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "ResumeCraft",
        operatingSystem: "Windows, macOS, Linux, Android, iOS",
        applicationCategory: "Resume Builder Application",
        offers: {
          "@type": "Offer",
          price: "0.00",
          priceCurrency: "USD",
        },
        description:
          "Build professional, ATS-friendly resumes in minutes with ResumeCraft. Features include real-time preview, AI suggestions, and PDF export.",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "1250",
        },
      },
      {
        "@type": "WebSite",
        name: "ResumeCraft",
        url: "https://theresumecraft.vercel.app",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://theresumecraft.vercel.app/templates?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        name: "ResumeCraft",
        url: "https://theresumecraft.vercel.app",
        logo: "https://theresumecraft.vercel.app/favicon.ico",
        sameAs: ["https://github.com/Varadarajan-M/resume-craft"],
      },
      {
        "@type": "ItemList",
        name: "Professional Resume Templates",
        description:
          "A collection of ATS-friendly and professional resume templates.",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Clean Minimal Template",
            description:
              "A modern, focused design for clarity and professionalism.",
            url: "https://theresumecraft.vercel.app/builder?new=true&templateId=clean-minimal",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Standard Template",
            description:
              "The classic, reliable choice for any industry or career level.",
            url: "https://theresumecraft.vercel.app/builder?new=true&templateId=standard",
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default JsonLd;
