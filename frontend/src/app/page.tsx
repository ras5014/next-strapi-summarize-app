import qs from "qs";
import { HeroSection } from "@/components/custom/HeroSection";

// HomePage Query
const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "layout.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            link: {
              populate: true
            }
          }
        }
      }
    }
  }
})

const getStrapiData = async (path: string) => {
  const baseUrl = `http://localhost:1337`

  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  try {
    const response = await fetch(url.href, { cache: "no-store" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");

  console.dir(strapiData, { depth: null });

  const { title, description, blocks } = strapiData.data;
  return (
    <main>
      <HeroSection data={blocks[0]} />
    </main>
  );
}
