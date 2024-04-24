import styles from "./AboutUsPage.module.scss";
import image1 from "../../assets/images/kobe-ps.jpg";
import image2 from "../../assets/images/hero-1.jpg";
import image3 from "../../assets/images/https___hypebeast.com_image_2015_05_kanye-west-rocks-the-new-adidas-ultra-boost-triple-white-during-bbma-performance-1.avif";

function AboutUsPage() {
  const sections: {
    title: string;
    text: string;
    image: string;
  }[] = [
    {
      title: "Our story",
      text: "Welcome to Pairun, where passion meets fashion in the world of sneaker resale. Our journey began with a shared love for sneakers that transcends beyond mere footwear – it's a lifestyle, a culture. As avid sneaker enthusiasts ourselves, we recognized the demand for a platform that not only connects sneakerheads but also empowers them to access exclusive releases. What started as a personal quest for rare kicks evolved into a mission to redefine the sneaker resale experience. At Pairrun, our story is grounded in authenticity, community, and the unwavering belief that every sneaker tells a unique story.",
      image: image3,
    },
    {
      title: "History",
      text: "Established in 2024, Pairun has quickly become a prominent player in the sneaker resale market. Our history is marked by a commitment to transparency and reliability. We've cultivated relationships with reputable sellers, ensuring the authenticity of every pair we offer. Over the years, we've fine-tuned our process, from meticulous authentication procedures to providing a seamless buying experience. Our history is a testament to our dedication to delivering not just sneakers but an unparalleled journey for enthusiasts, collectors, and fashion-forward individuals alike.",
      image: image2,
    },
    {
      title: "Our vision",
      text: "At Pairun, our vision extends beyond being a marketplace – we aspire to be the heartbeat of the global sneaker community. We envision a platform where sneaker enthusiasts can connect, share, and celebrate their passion for iconic footwear. Our commitment to sustainability is woven into our vision, promoting a circular economy in sneaker culture. We strive to be the go-to destination for authentic, rare, and coveted sneakers, fostering a community that transcends geographical boundaries. Join us on this exciting journey as we continue to shape the future of sneaker resale, one pair at a time.",
      image: image1,
    },
  ];

  return (
    <section className={styles.about}>
      <div className={styles.aboutHeadingContainer}>
        <h1 className={styles.aboutHeading}>About us</h1>
      </div>
      <div className={styles.aboutContent}>
        {sections.map((section, index) => (
          <div className={styles.aboutSection} key={index}>
            <h2 className={styles.sectionHeading}>{section.title}</h2>
            <div
              className={
                index === 1
                  ? `${styles.sectionContent} ${styles.second}`
                  : styles.sectionContent
              }
            >
              <p className={styles.sectionText}>{section.text}</p>
              <img
                src={section.image}
                alt="section"
                className={styles.sectionImage}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AboutUsPage;
