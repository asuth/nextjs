import Link from "next/link";
import { Component } from "react";
import Image from "next/image";
import Head from "next/head";

import aboutHero from "/public/heros/about.webp";
import questionsHero from "/public/heros/questions.webp";
import investingHero from "/public/heros/investing.webp";
import writingHero from "/public/heros/writing.webp";
import contactHero from "/public/heros/contact.webp";

type NodeProps = {
  title: string;
};

type NodeState = {
  preloadHeroPath: string | null;
  offsets: {
    [key: string]: {
      offsetX: number;
      offsetY: number;
    };
  };
};

export default class Nav extends Component<NodeProps, NodeState> {
  constructor(props: NodeProps) {
    super(props);

    this.state = {
      preloadHeroPath: null,
      offsets: {
        about: {
          offsetX: 0,
          offsetY: 0,
        },
        writing: {
          offsetX: 0,
          offsetY: 0,
        },
        questions: {
          offsetX: 0,
          offsetY: 0,
        },
        contact: {
          offsetX: 0,
          offsetY: 0,
        },
        investing: {
          offsetX: 0,
          offsetY: 0,
        },
      },
    };
  }

  calculatePositions() {
    const positions: {
      [key: string]: {
        offsetX: number;
        offsetY: number;
      };
    } = {
      about: {
        offsetX: 500,
        offsetY: 1550,
      },
      questions: {
        offsetX: 1300,
        offsetY: 1100,
      },
      writing: {
        offsetX: 850,
        offsetY: 150,
      },
      contact: {
        offsetX: 2600,
        offsetY: 1700,
      },
      investing: {
        offsetX: 1900,
        offsetY: 320,
      },
    };

    const imgWidth = 4001;
    const imgHeight = 2250;

    const cWidth = window.innerWidth;

    // nav-bar-height
    const navHeight = 0; //cWidth > 500 ? 85 : 60;
    const imgRatio = imgWidth / imgHeight;

    const wHeight = window.innerHeight;

    const cHeight = wHeight - navHeight;

    const cRatio = cWidth / cHeight;

    let naturalWidth = -1;
    let naturalHeight = -1;

    // we are using the full width of the window, and cropping away some height
    if (cRatio > imgRatio) {
      naturalWidth = cWidth;
      naturalHeight = cWidth / imgRatio;
      // we are using the full height of the window, and cropping away some width
    } else {
      naturalWidth = cHeight * imgRatio;
      naturalHeight = cHeight;
    }

    const offsets: {
      [key: string]: {
        offsetX: number;
        offsetY: number;
      };
    } = {};
    for (const obj in positions) {
      const offsetXRatio = positions[obj].offsetX / imgWidth;
      const offsetYRatio = positions[obj].offsetY / imgHeight;

      let offsetX = naturalWidth * offsetXRatio;
      let offsetY = naturalHeight * offsetYRatio;

      // if buttons are gonna be off screen, reduce their offsets
      // in an incremental and stable way (independently for x and y)

      // fudge factors with v approximate width / height
      // of the buttons
      while (offsetX + 120 > cWidth) {
        offsetX *= 3 / 4;
      }

      while (offsetY + 170 > cHeight) {
        offsetY *= 3 / 4;
      }

      offsets[obj] = {
        offsetX: offsetX,
        offsetY: offsetY,
      };
    }

    console.log(offsets);

    this.setState({
      offsets: offsets,
    });
  }

  componentDidMount() {
    this.calculatePositions();
    window.addEventListener("resize", this.calculatePositions.bind(this));
  }

  preloadHero(pageName: string) {
    let paths: { [key: string]: string } = {
      about: aboutHero.src,
      writing: writingHero.src,
      questions: questionsHero.src,
      investing: investingHero.src,
      contact: contactHero.src,
    };
    this.setState({ preloadHeroPath: paths[pageName] });
  }

  clickMover() {
    // document.getElementsByClassName("Page")[0].style.left =
    //   event.screenX + "px";
    // document.getElementsByClassName("Page")[0].style.top = event.screenY + "px";
  }

  placements(navName: string): { left: string; bottom: string } {
    return {
      left: this.state.offsets[navName].offsetX + "px",
      bottom: this.state.offsets[navName].offsetY + "px",
    };
  }

  render() {
    return (
      <>
        <Head>
          <title>{this.props.title}</title>
          <link rel="icon" href="/eyezoom.png" />
          {this.state.preloadHeroPath === null ? null : (
            <link rel="preload" as="image" href={this.state.preloadHeroPath} />
          )}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <nav className="Nav">
          <style jsx>{`
            .carrot {
              font-size: 20px;
              transform: translateY(0px) rotate(-90deg);

              // color:  var(--dark-bg-color);
            }
          `}</style>
          <div className="NavHomeBtns" onClick={this.clickMover.bind(this)}>
            <Link href="/about">
              <a
                onMouseEnter={this.preloadHero.bind(this, "about")}
                href="#"
                className="NavBtn"
                style={this.placements("about")}
              >
                ABOUT
              </a>
            </Link>
            <Link href="/writing">
              <a
                onMouseEnter={this.preloadHero.bind(this, "writing")}
                className="NavBtn"
                style={this.placements("writing")}
              >
                WRITING
              </a>
            </Link>
            <Link href="/questions">
              <a
                onMouseEnter={this.preloadHero.bind(this, "questions")}
                className="NavBtn"
                style={this.placements("questions")}
              >
                QUESTIONS
              </a>
            </Link>
            <Link href="/investing">
              <a
                onMouseEnter={this.preloadHero.bind(this, "investing")}
                className="NavBtn"
                style={this.placements("investing")}
              >
                INVESTING
              </a>
            </Link>

            <Link href="/contact">
              <a className="NavBtn" style={this.placements("contact")}>
                CONTACT
              </a>
            </Link>
          </div>
          <div className="HomeNav">
            <div className="MaxWidth Grid">
              <Link href="/">
                <a className="NavBtn NavBtn--Home">HOME</a>
              </Link>
            </div>
          </div>
        </nav>
      </>
    );
  }
}
