import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Media from '../components/Media';
import { Monogram } from '../components/Logo';
import { PageHeader } from '../components/ui';
import { brandStory, brandValues, site } from '../data/site';

export default function About() {
  useEffect(() => {
    document.title = `Our story | ${site.name}`;
  }, []);

  return (
    <>
      {/* PageHeader includes the scroll animation on its title. */}
      <PageHeader
        title="Our story"
        intro="Inspired by the Arabic word amanah, meaning trust and responsibility."
        crumbs={[{ label: 'About' }]}
      />

      {/* 1. Brand story */}
      <section className="section about-sec">
        <div className="container about-split">
          <div className="about-split__img">
            <Media id="aboutHero" eager />
          </div>
          <div className="about-split__copy">
            <h2 className="section-title">
              Jewellery, <em>held in trust</em>
            </h2>
            <p className="about-lead">{brandStory}</p>
          </div>
        </div>
      </section>

      {/* 2. Values */}
      <section className="section section--white about-sec">
        <div className="container">
          <h2 className="section-title about-center">
            What we <em>stand for</em>
          </h2>
          <ol className="about-values">
            {brandValues.map((v, i) => (
              <li key={v.title} className="about-value">
                <span className="about-value__num">0{i + 1}</span>
                <h3 className="about-value__title">{v.title}</h3>
                <p className="about-value__text">{v.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. Craftsmanship */}
      <section className="section about-sec">
        <div className="container about-split about-split--flip">
          <div className="about-split__img">
            <Media id="aboutCraft" />
          </div>
          <div className="about-split__copy">
            <h2 className="section-title">
              Made with <em>profound</em> care
            </h2>
            <p>
              Every Amanah design begins with an idea of what a piece should mean to the person who wears it. Elegant styles,
              genuine materials and outstanding attention to detail come together so that each piece feels as unique as the
              occasion it symbolises.
            </p>
            <p>Quality, openness and individualised service guide every conversation we have.</p>
          </div>
        </div>
      </section>

      {/* 4. Monogram + call to action */}
      <section className="about-sec about-cta-wrap">
        <div className="container">
          <div className="about-cta">
            <Monogram tone="gold" className="about-cta__mark" />
            <h2 className="about-cta__title">
              A mark of <em>trust</em>
            </h2>
            <p className="about-cta__text">
              Drawn as an architectural A framing a radiant star, the Amanah monogram is a quiet seal of the promise behind
              every piece.
            </p>
            <div className="about-cta__btns">
              <Link to="/shop" className="btn btn--gold">
                Shop the collection <ArrowRight size={15} strokeWidth={1.3} />
              </Link>
              <Link to="/contact" className="btn btn--ghost-light">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
