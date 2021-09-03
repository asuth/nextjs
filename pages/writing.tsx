import Link from "next/link";
import hero from "/public/heros/writing.png";

export default function Home() {
  return (
    <>
      <div className="PageHeader Grid">
        <div className="MaxWidth Grid">
          <h1 className="PageHeadline">
            <span className="PageHeadline-Small">My</span>
            Writing
          </h1>
        </div>
      </div>

      <div className="ContentBlock">
        <div className="Content">
          <div className="MaxWidth">
            <div className="Card FirstCard CenterCard">
              <h3>
                <Link href="/goodbye-quizlet">
                  <a>Goodbye Quizlet Hello New Thing</a>
                </Link>
              </h3>

              <p>
                <em>June 2021</em>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .FirstCard {
          margin-top: calc(-128px / 2 - 50px);
        }

        :global(:root) {
          --bg-color: var(--writingBlue);
          --dark-bg-color: var(--writingDarkBlue);
        }

        .PageHeader {
          height: 70vh;
          background-size: 600px 600px;
          background-image: url(${hero.src});
        }
      `}</style>
    </>
  );
}
